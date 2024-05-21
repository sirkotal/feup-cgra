import { CGFobject } from '../../lib/CGF.js';
import { MyHead } from './MyHead.js';
import { MyTorax } from './MyTorax.js';
import { MyAbdomen } from './MyAbdomen.js';

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - x coordinate
 * @param y - y coordinate
 * @param z - z coordinate
 * @param orientation - orientation angle (around YY)
 * @param velocity - velocity vector [x, z]
 */
export class MyBee extends CGFobject {
    constructor(scene, x=0, y=0, z=0, orientation=0, velocity=[0, 0]) {
        super(scene);

        this.x = x;
        this.y = y;
        this.z = z;
        this.orientation = orientation;
        this.velocity = velocity;

        this.initial_position = [x, y, z];
        this.initial_orientation = orientation;
        this.initial_velocity = [velocity[0], velocity[1]];

        this.pollen = null;
        this.pollen_angles = null;
        this.pollen_scale = null;
        this.pollen_appearance = null;
        this.hasPollen = false;

        // useful variables for animation
        this.isGoingDown = false;
        this.isGoingUp = false;
        this.y_before_down = null;
        this.go_down_to = null;

        this.moving_to_hive = false;
        this.hive_x = null;
        this.hive_y = null;
        this.hive_z = null;

        this.head = new MyHead(scene);
        this.torax = new MyTorax(scene);
        this.abdomen = new MyAbdomen(scene);
    }

    update_wing_angle(angle) {
        this.torax.update_wing_angle(angle);
    }

    turn(v) {
        let velocity_norm = Math.sqrt(this.velocity[0] * this.velocity[0] + this.velocity[1] * this.velocity[1]);

        // change sign of velocity_norm if the velocity is in the opposite direction of the orientation
        if ((this.velocity[0] < 0 && Math.cos(this.orientation) > 0)
            || (this.velocity[0] > 0 && Math.cos(this.orientation) < 0)) {
            velocity_norm = -velocity_norm;
        }

        this.orientation += v;

        this.velocity[0] = Math.cos(this.orientation) * velocity_norm;
        this.velocity[1] = Math.sin(this.orientation) * velocity_norm;
    }

    accelerate(v) {
        let current_norm = Math.sqrt(this.velocity[0] * this.velocity[0] + this.velocity[1] * this.velocity[1]);

        // change sign of current_norm if the velocity is in the opposite direction of the orientation
        if ((this.velocity[0] < 0 && Math.cos(this.orientation) > 0)
            || (this.velocity[0] > 0 && Math.cos(this.orientation) < 0)) {
            current_norm = -current_norm;
        }

        let direction_multiplyer = current_norm + v;

        if (Math.abs(current_norm) < 0.0000000001) { // current_norm == 0
            this.velocity[0] = Math.cos(this.orientation) * direction_multiplyer;
            this.velocity[1] = Math.sin(this.orientation) * direction_multiplyer;
            return;
        }

        let direction = [this.velocity[0] / current_norm, this.velocity[1] / current_norm];

        this.velocity[0] = direction[0] * direction_multiplyer;
        this.velocity[1] = direction[1] * direction_multiplyer;
    }

    update_bee_position(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    reset() {
        this.update_bee_position(...this.initial_position);
        this.orientation = this.initial_orientation;
        this.velocity = this.initial_velocity;
    }

    down(y) {
        if (!this.isGoingDown) {
            this.isGoingDown = true;
            this.y_before_down = this.y;

            this.go_down_to = y;
        }
    }

    up() {
        if (!this.hasPollen) {
            return;
        }

        if (!this.isGoingUp) {
            this.isGoingUp = true;
        }
    }

    pick_pollen(flower) {
        this.pollen = flower.pollen;
        flower.hasPollen = false;

        this.pollen_angles = flower.pollen_angles;
        this.pollen_scale = flower.pollen_scale;
        this.pollen_appearance = flower.pollen_color;
        this.hasPollen = true;
    }

    drop_pollen(hive_x, hive_y, hive_z) {
        if (!this.hasPollen) {
            return;
        }

        this.moving_to_hive = true;
        this.hive_x = hive_x;
        this.hive_y = hive_y;
        this.hive_z = hive_z;

        this.y_before_down = this.y;

        let dx = this.hive_x - this.x;
        let dz = this.hive_z - this.z;

        if (dz == 0) {
            if (dx > 0) {
                this.orientation = Math.PI / 2;
            } else {
                this.orientation = -Math.PI / 2;
            }
        } else if (dx == 0) {
            if (dz > 0) {
                this.orientation = Math.PI;
            } else {
                this.orientation = 0;
            }
        } else {
            this.orientation = Math.abs(Math.atan(dx / dz));
            if (dx < 0 && dz < 0) {
                this.orientation += Math.PI;
            } else if (dx < 0 && dz > 0) {
                this.orientation = -this.orientation;
            } else if (dx > 0 && dz < 0) {
                this.orientation = Math.PI - this.orientation;
            }
        }

        let norm = Math.sqrt(this.velocity[0] * this.velocity[0] + this.velocity[1] * this.velocity[1]);
        if (Math.abs(norm) < 0.0000000001) { // norm == 0
            norm = 0.1;
        }

        let hipo = Math.sqrt(dx * dx + dz * dz);
        this.velocity[0] = dx / hipo * norm;
        this.velocity[1] = dz / hipo * norm;
    }

    display() {
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.orientation, 0, 1, 0);

        this.scene.pushMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.25, 2);
        this.head.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -1.25, -2.25);
        this.abdomen.display();
        this.scene.popMatrix();

        if (this.hasPollen) {
            this.scene.pushMatrix();
            this.scene.translate(0, 1, 0);
            this.scene.rotate(this.pollen_angles[0], 1, 0, 0);
            this.scene.rotate(this.pollen_angles[1], 0, 1, 0);
            this.scene.rotate(this.pollen_angles[2], 0, 0, 1);
            this.scene.scale(this.pollen_scale[0], this.pollen_scale[1], this.pollen_scale[2]);
            this.pollen_appearance.apply();
            this.pollen.display();
            this.scene.popMatrix();
        }

        this.torax.display();
        this.scene.popMatrix();
    }
}

