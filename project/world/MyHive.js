import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MySphere } from '../objects/MySphere.js';

/**
 * MyHive
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHive extends CGFobject {
	constructor(scene, stacks=7) {
        super(scene);
        this.stacks = stacks;

        this.sphere = new MySphere(scene, 20, 20)

        this.hive_color = new CGFappearance(this.scene);
        this.hive_color.setAmbient(0.44, 0.33, 0.1, 1.0);
        this.hive_color.setDiffuse(0.44, 0.33, 0.1, 1.0); 
        this.hive_color.setSpecular(0.55, 0.44, 0, 1.0); 
        this.hive_color.setShininess(10.0);

        this.hive_hex = new CGFtexture(this.scene, "images/hex.jpg");

        this.hive_color.setTexture(this.hive_hex);
        this.hive_color.setTextureWrap('REPEAT', 'REPEAT');

        this.hive_stack = [];
        this.hive_scaling = [];
        let shift = 0;
        for (let i = 0; i < this.stacks; i++) {
            if (i < this.stacks / 2) {
                shift += 0.25;
            } else {
                shift -= 0.25;
            }

            this.hive_stack.push([-10, 3.2 + (0.5 * i), 0]);
            this.hive_scaling.push([2 + shift, 1, 2 + shift]);
        }

        this.pollen = [];
        this.pollen_appearance = null;
    }

    drop_pollen(pollen, pollen_appearance) {
        if (this.pollen_appearance == null) {
            this.pollen_appearance = pollen_appearance;
        }

        this.pollen.push(pollen);
    }

    display() {
        this.scene.pushMatrix();
        for (let i = 0; i < this.hive_stack.length; i++) {        
            this.scene.pushMatrix();
            this.scene.translate(this.hive_stack[i][0], this.hive_stack[i][1], this.hive_stack[i][2]);
            this.scene.scale(this.hive_scaling[i][0], this.hive_scaling[i][1], this.hive_scaling[i][2]);
            this.hive_color.apply();
            this.sphere.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}
