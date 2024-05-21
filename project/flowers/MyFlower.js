import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyCylinder } from '../objects/MyCylinder.js';
import { MySphere } from '../objects/MySphere.js';
import { MyPetal } from './MyPetal.js';
import { MyPollen } from './MyPollen.js';

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 * @param external_radius - External radius of the flower
 * @param receptacle_radius - Radius of the receptacle
 * @param num_petals - Number of petals
 * @param stem_radius - Radius of the stem
 * @param stem_height - Height of the stem
 * @param petal_color - Color of the petals (CGFappearance)
 * @param receptacle_color - Color of the receptacle (CGFappearance)
 * @param stem_color - Color of the stem (CGFappearance)
 * @param leave_color - Color of the leaves (CGFappearance)
 * @param petal_min_angle - Minimum angle of the petals
 * @param petal_max_angle - Maximum angle of the petals
 * @param petal_join_min_angle - Minimum angle of the petals joining the receptacle
 * @param petal_join_max_angle - Maximum angle of the petals joining the receptacle
 */
export class MyFlower extends CGFobject {
    constructor(scene, external_radius, receptacle_radius, num_petals, stem_radius, stem_height, petal_color, receptacle_color, stem_color, leaf_color, petal_min_angle, petal_max_angle, petal_join_min_angle, petal_join_max_angle) {
        super(scene);

        let pink = new CGFappearance(this.scene)
        pink.setAmbient(0.5, 0.30, 0.41, 1.0)
        pink.setDiffuse(0.5, 0.30, 0.41, 1.0)
        pink.setSpecular(1, 0.61, 0.82, 1.0)
        pink.setShininess(10.0);

        let yellow = new CGFappearance(this.scene);
        yellow.setAmbient(0.5, 0.5, 0, 1.0);
        yellow.setDiffuse(0.5, 0.5, 0, 1.0); 
        yellow.setSpecular(1, 1, 0, 1.0); 
        yellow.setShininess(10.0);

        let green = new CGFappearance(this.scene);
        green.setAmbient(0, 0.5, 0, 1.0);
        green.setDiffuse(0, 0.5, 0, 1.0); 
        green.setSpecular(0, 1, 0, 1.0); 
        green.setShininess(10.0);

        this.pollen_color = new CGFappearance(this.scene);
        this.pollen_color.setAmbient(0.8, 0.64, 0, 1.0);
        this.pollen_color.setDiffuse(0.8, 0.64, 0, 1.0); 
        this.pollen_color.setSpecular(1, 1, 0, 1.0); 
        this.pollen_color.setShininess(10.0);

        this.external_radius    = external_radius     ?? 3;
        this.receptacle_radius  = receptacle_radius   ?? 0.5;
        this.num_petals         = num_petals          ?? 5;
        this.stem_radius        = stem_radius         ?? 0.2;
        this.stem_height        = stem_height         ?? 4;
        this.petal_color        = petal_color         ?? pink;
        this.receptacle_color   = receptacle_color    ?? yellow;
        this.stem_color         = stem_color          ?? green;
        this.leaf_color         = leaf_color         ?? green;

        this.petal_min_angle        = petal_min_angle       ?? 0;
        this.petal_max_angle        = petal_max_angle       ?? Math.PI/4;
        this.petal_join_min_angle   = petal_join_min_angle  ?? -Math.PI/12;
        this.petal_join_max_angle   = petal_join_max_angle  ?? Math.PI/12;

        // Calculate petal height and angle increment
        this.angle_increment = (5 * Math.PI/4 - (-Math.PI/4)) / (this.num_petals - 1);
        this.petal_height = this.external_radius - this.receptacle_radius;

        this.receptacle = new MySphere(scene, 40, 40, 0, this.receptacle_radius);
        this.petal = new MyPetal(scene);
        this.stem = new MyCylinder(scene, this.stem_radius);
        this.pollen = new MyPollen(scene);

        this.pollen_scale = [0.15, 0.2, 0.15];
        this.hasPollen = true;

        this.init_textures();
        this.init_random_angles();
    }

    init_textures(flower_leaf, flower_petal, flower_heart, flower_stem, pollen_tex) {
        this.petal_color.setTexture(flower_petal);
        this.petal_color.setTextureWrap('REPEAT', 'REPEAT');
        this.leaf_color.setTexture(flower_leaf);
        this.leaf_color.setTextureWrap('REPEAT', 'REPEAT');
        this.receptacle_color.setTexture(flower_heart);
        this.receptacle_color.setTextureWrap('REPEAT', 'REPEAT');
        this.stem_color.setTexture(flower_stem);
        this.stem_color.setTextureWrap('REPEAT', 'REPEAT');
        this.pollen_color.setTexture(pollen_tex);
        this.pollen_color.setTextureWrap('REPEAT', 'REPEAT');

    }

    init_random_angles() {
        this.petal_angles = [];
        this.petal_join_angles = [];
        for (let i = 0; i < this.num_petals; i++) {
            this.petal_angles.push(this.petal_min_angle + Math.random() * (this.petal_max_angle - this.petal_min_angle));
            this.petal_join_angles.push(this.petal_join_min_angle + Math.random() * (this.petal_join_max_angle - this.petal_join_min_angle));
        }

        this.stem_angles = [];
        this.leaf_rotation_angles = [];
        this.leaf_angles = [];
        for (let i = 1; i < this.stem_height; i++) {
            this.stem_angles.push(-Math.PI/16 + Math.random() * Math.PI/8);
            this.leaf_rotation_angles.push(Math.random() * Math.PI/6);
            this.leaf_angles.push(Math.random() * 2*Math.PI);
        }

        let angle_to_plane = Math.PI/2 - this.stem_angles[0];
        this.translate_flower_z = Math.cos(angle_to_plane);
        this.translate_flower_y = 1 + Math.sin(angle_to_plane);
        for (let i = 2; i < this.stem_height; i++) {
            this.translate_flower_z += Math.cos(angle_to_plane - this.stem_angles[i-1]);
            this.translate_flower_y += Math.sin(angle_to_plane - this.stem_angles[i-1]);
            angle_to_plane -= this.stem_angles[i-1];
        }

        this.pollen_angles = [];
        for (let i = 0; i < 3; i++) {
            this.pollen_angles[i] = Math.random() * 2 * Math.PI;
        }

        // to be used in pollen collection
        this.flower_height = this.translate_flower_y + this.receptacle_radius * 2
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, this.translate_flower_y + this.receptacle_radius, this.translate_flower_z);

        // Receptacle
        this.scene.pushMatrix();
        this.receptacle_color.apply();
        this.receptacle.display();
        this.scene.popMatrix();

        // Pollen
        if (this.hasPollen) {
            this.scene.pushMatrix();
            this.scene.rotate(this.pollen_angles[0], 1, 0, 0);
            this.scene.rotate(this.pollen_angles[1], 0, 1, 0);
            this.scene.rotate(this.pollen_angles[2], 0, 0, 1);
            this.scene.scale(this.pollen_scale[0], this.pollen_scale[1], this.pollen_scale[2]);
            this.pollen_color.apply();
            this.pollen.display();
            this.scene.popMatrix();
        }

        // Petals
        for (let i = 0; i < this.num_petals; i++) {
            let angle = (-Math.PI/4) + i * this.angle_increment;

            this.scene.pushMatrix();
            this.scene.rotate(-Math.PI/2 + angle, 0, 0, 1);
            this.scene.rotate(this.petal_join_angles[i], 1, 0, 0);
            this.scene.translate(0, this.petal_height/2 + this.receptacle_radius, 0); // Divide by 2 to center the petal
            this.scene.scale(this.petal_height/2, this.petal_height/2, this.petal_height/2); // Default petal height: 2

            this.petal.updateRotationAngle(this.petal_angles[i]);
            this.petal_color.apply();
            //this.petal_appearance.apply();
            this.petal.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();

        // Stem
        this.scene.pushMatrix();
        this.stem_color.apply();
        this.stem.display();

        for (let i = 1; i < this.stem_height; i++) {
            this.scene.translate(0, 1, 0);
            this.scene.rotate(this.stem_angles[i-1], 1, 0, 0);
            this.stem_color.apply();
            this.stem.display();

            this.scene.pushMatrix()
            this.scene.rotate(this.leaf_angles[i-1], 0, 1, 0);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.leaf_color.apply();
            this.petal.updateRotationAngle(this.leaf_rotation_angles[i-1]);
            // this.leaf_appearance.apply();
            this.petal.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}
