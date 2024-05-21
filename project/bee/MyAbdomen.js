import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import {MySphere} from '../objects/MySphere.js';

/**
 * MyAbdomen
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAbdomen extends CGFobject {
	constructor(scene) {
		super(scene);

        this.sphere = new MySphere(scene, 40, 40);

        this.bee_abdomen = new CGFappearance(this.scene);
        this.bee_abdomen.setAmbient(0.4, 0.3, 0.1, 1);
        this.bee_abdomen.setDiffuse(0.5, 0.4, 0.1, 1);
        this.bee_abdomen.setSpecular(0.1, 0.1, 0.0, 1);
        this.bee_abdomen.setShininess(10.0);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/3, 1, 0, 0);
        this.scene.scale(1, 1, 2);
        this.bee_abdomen.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}
