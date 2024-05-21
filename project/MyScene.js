import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./world/MyPanorama.js";
import { MyPlane } from "./world/MyPlane.js";
import { MySphere } from "./objects/MySphere.js";
import { MyGarden } from "./world/MyGarden.js";
import { MyRockSet } from "./world/MyRockSet.js";
import { MyBee } from "./bee/MyBee.js";
import { MyHive } from "./world/MyHive.js";
import { MyGrassBed } from "./world/MyGrassBed.js";
import { MyBlade } from "./grass/MyBlade.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);

        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.enable(this.gl.BLEND);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this,30);
        this.sphere = new MySphere(this, 40, 40, 1);
        this.garden = new MyGarden(this);
        this.rockset = new MyRockSet(this, 3);
        this.bee = new MyBee(this, 0, 15, 0);
        this.hive = new MyHive(this);
        this.grass = new MyGrassBed(this, this.rockset.getRockPositions());
        this.blade = new MyBlade(this);

        // Useful parameters
        this.bee_oscillation = 0;
        this.flower_idx = null; // for picking up pollen

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displaySphere = false;
        this.displayGarden = false;
        this.displayPanorama = true;
        this.displayRock = false;
        this.displayRockSet = false;
        this.displayBee = false;
        this.displayHive = false;
        this.displayGrass = false;
        this.fov = 1.0;
        this.scaleFactor = 1.0;
        this.speedFactor = 1.0;

        this.enableTextures(true);

        this.orange = new CGFappearance(this);
        this.orange.setAmbient(0.8, 0.64, 0, 1.0);
        this.orange.setDiffuse(0.8, 0.64, 0, 1.0); 
        this.orange.setSpecular(1, 1, 0, 1.0); 
        this.orange.setShininess(10.0);

        this.texture = new CGFtexture(this, "images/grass_plane.jpg");
        this.appearance = new CGFappearance(this);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.earth_tex = new CGFtexture(this, "images/earth.jpg");
        this.sphere_appearance = new CGFappearance(this);
        this.sphere_appearance.setTexture(this.earth_tex);
        this.sphere_appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.panorama_tex = new CGFtexture(this, "images/panorama.jpg");
        this.panorama = new MyPanorama(this, this.panorama_tex);

        this.rock_tex = new CGFtexture(this, "images/rock_tex.avif");
        this.rock_appearance = new CGFappearance(this);
        this.rock_appearance.setTexture(this.rock_tex);
        this.rock_appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.shaders = [
            new CGFshader(this.gl, "shaders/grass.vert", "shaders/grass.frag")
        ];

        this.shaders[0].setUniformsValues({ uSampler2: 1, timeFactor: 0 });
        this.setUpdatePeriod(50);
    }
    initLights() {
        this.lights[0].setPosition(15, 0, 5, 1);
        this.lights[0].setAmbient(1, 1, 1, 1); // ambient light for testing
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

        this.lights[1].setPosition(-15, 0, 5, 1);
        this.lights[1].setAmbient(1, 1, 1, 1); // ambient light for testing
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].enable();
        this.lights[1].update();
    }
    initCameras() {
        this.camera = new CGFcamera(
            1.0,
            0.1,
            1000,
            vec3.fromValues(50, 10, 15),
            vec3.fromValues(0, 0, 0)
        );
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    update(t) {
        this.checkKeys();

        if (this.displayBee) {
            this.bee.update_wing_angle(
                Math.sin(t/((1000 / (2*Math.PI)) / 4)) / 5
            );

            if (!this.bee.isGoingDown && !this.bee.isGoingUp && !this.bee.moving_to_hive
                && this.bee.y_before_down == null && this.bee.go_down_to == null) {
                this.bee_oscillation = Math.sin(t/(1000 / (2*Math.PI))) / 5;

                this.bee.update_bee_position(
                    this.bee.x + this.bee.velocity[1],
                    this.bee.y,
                    this.bee.z + this.bee.velocity[0]
                );
            } else if (this.bee.isGoingDown) {
                let norm = Math.sqrt(this.bee.velocity[0] * this.bee.velocity[0] + this.bee.velocity[1] * this.bee.velocity[1]);
                if (Math.abs(norm) < 0.0000000001) { // norm == 0
                    norm = 0.1;
                }

                if (this.bee.y <= this.bee.go_down_to) {
                    this.bee.isGoingDown = false;
                    this.bee.y = this.bee.go_down_to;
                    this.bee.go_down_to = null;

                    this.bee.pick_pollen(this.garden.flowers[this.flower_idx]);
                    return;
                }

                this.bee.update_bee_position(
                    this.bee.x,
                    this.bee.y - norm * this.speedFactor,
                    this.bee.z
                );
            } else if (this.bee.isGoingUp) {
                let norm = Math.sqrt(this.bee.velocity[0] * this.bee.velocity[0] + this.bee.velocity[1] * this.bee.velocity[1]);
                if (Math.abs(norm) < 0.0000000001) { // norm == 0
                    norm = 0.1;
                }

                if (this.bee.y >= this.bee.y_before_down) {
                    this.bee.y = this.bee.y_before_down;
                    this.bee.isGoingUp = false;
                    this.bee.y_before_down = null;

                    this.flower_idx = null;

                    if (this.bee.moving_to_hive) {
                        this.bee.moving_to_hive = false;
                        this.bee.velocity = [0, 0];
                    }

                    return;
                }

                this.bee.update_bee_position(
                    this.bee.x,
                    this.bee.y + norm * this.speedFactor,
                    this.bee.z
                );
            } else if (this.bee.moving_to_hive) {
                let dx = this.bee.hive_x - this.bee.x;
                let dz = this.bee.hive_z - this.bee.z;

                let norm = Math.sqrt(this.bee.velocity[0] * this.bee.velocity[0] + this.bee.velocity[1] * this.bee.velocity[1]);
                if (Math.abs(norm) < 0.0000000001) { // norm == 0
                    norm = 0.1;
                }

                if ((dx > -1 && dx < 1) && (dz > -1 && dz < 1)) {
                    if (this.bee.y <= this.bee.hive_y) {
                        this.bee.y = this.bee.hive_y;
                        this.bee.up();

                        this.hive.drop_pollen(this.bee.pollen, this.bee.pollen_appearance);

                        this.bee.pollen = null;
                        this.bee.pollen_angles = null;
                        this.bee.pollen_scale = null;
                        this.bee.pollen_appearance = null;
                        this.bee.hasPollen = false;
                    } else {
                        this.bee.y -= norm * this.speedFactor;
                    }
                    return;
                }

                this.bee.update_bee_position(
                    this.bee.x + this.bee.velocity[0] * this.speedFactor,
                    this.bee.y,
                    this.bee.z + this.bee.velocity[1] * this.speedFactor
                );
            }
        }
    }
    checkKeys() {
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            if (this.displayBee) {
                this.bee.accelerate(0.1 * this.speedFactor);
            }
        }

        if (this.gui.isKeyPressed("KeyS")) {
            if (this.displayBee) {
                this.bee.accelerate(-0.1 * this.speedFactor);
            }
        }

        if (this.gui.isKeyPressed("KeyA")) {
            if (this.displayBee) {
                this.bee.turn(Math.PI/32 * this.speedFactor);
            }
        }

        if (this.gui.isKeyPressed("KeyD")) {
            if (this.displayBee) {
                this.bee.turn(-Math.PI/32 * this.speedFactor);
            }
        }

        if (this.gui.isKeyPressed("KeyR")) {
            if (this.displayBee) {
                this.bee.reset();
            }
        }

        if (this.gui.isKeyPressed("KeyF")) {
            if (this.displayBee && this.displayGarden) {
                for (let i = 0; i < 25; i++) {
                    if (!this.garden.flowers[i].hasPollen) {
                        continue;
                    }

                    let [x_range, z_range, y] = this.garden.flowers_collision[i];

                    if (this.bee.x >= x_range[0] && this.bee.x <= x_range[1] && this.bee.z >= z_range[0] && this.bee.z <= z_range[1]) {
                        this.flower_idx = i;
                        this.bee.down(y);
                        break;
                    }
                }
            }
        }

        if (this.gui.isKeyPressed("KeyP")) {
            if (this.displayBee && this.displayGarden) {
                this.bee.up();
            }
        }

        if (this.gui.isKeyPressed("KeyO")) {
            if (this.displayBee && this.displayHive) {
                // TODO: make it less hardcoded
                this.bee.drop_pollen(-10, 8, 0);
            }
        }
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis) this.axis.display();
        this.camera.fov = this.fov;

        // ---- BEGIN Primitive drawing section

        this.pushMatrix();
        this.appearance.apply();
        this.translate(0,-100,0);
        this.scale(400,400,400);
        this.rotate(-Math.PI/2.0,1,0,0);
        this.plane.display();
        this.popMatrix();

        if (this.displaySphere) {
            this.pushMatrix();
            this.scale(50, 50, 50);
            this.sphere_appearance.apply();
            this.sphere.display();
            this.popMatrix();
        }

        if (this.displayPanorama)
        this.panorama.display();

        if (this.displayGarden) {
            this.garden.display();
        }

        if (this.displayRockSet) {
            this.pushMatrix();
           // this.scale(2, 2, 2);
            this.rock_appearance.apply();
            this.rockset.display();
            this.popMatrix();
        }

        if (this.displayHive) {
            this.hive.display();
        }

        if (this.displayGrass) {
            //this.setActiveShader(this.shaders[0]);
            this.grass.display();
        }

        if (this.displayBee) {
            this.pushMatrix();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.translate(0, this.bee_oscillation, 0);
            this.bee.display();
            this.popMatrix();
        }

        // ---- END Primitive drawing section
    }
}
