import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import {MySphere} from '../objects/MySphere.js';

/**
 * MyHead
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHead extends CGFobject {
	constructor(scene) {
		super(scene);

        this.sphere = new MySphere(scene, 40, 40);

        this.bee_head = new CGFappearance(this.scene);
        this.bee_head.setAmbient(0.4, 0.3, 0.1, 1);
        this.bee_head.setDiffuse(0.5, 0.4, 0.1, 1);
        this.bee_head.setSpecular(0.1, 0.1, 0.0, 1);
        this.bee_head.setShininess(10.0);

        this.bee_eye = new CGFappearance(this.scene);
        this.bee_eye.loadTexture('images/bee_eye.jpg');

        this.bee_antenna = new CGFappearance(this.scene);
        this.bee_antenna.setAmbient(0.0, 0.0, 0.0, 1);
        this.bee_antenna.setDiffuse(0.05, 0.025, 0.0, 1);
        this.bee_antenna.setSpecular(0.1, 0.05, 0.0, 1);
        this.bee_antenna.setShininess(10.0);
	}

    build_antenna() {
        this.scene.pushMatrix();
        this.scene.scale(0.025, 0.25, 0.025);
        this.bee_antenna.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.25 + 0.5 * Math.sin(Math.PI/4), 0.5 * Math.cos(Math.PI/4));
        this.scene.rotate(Math.PI/4, 1, 0, 0);
        this.scene.scale(0.025, 0.5, 0.025);
        this.bee_antenna.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

    display() {
        this.scene.rotate(-Math.PI/16, 1, 0, 0);

        // Head
        this.scene.pushMatrix();
        this.scene.scale(1, 1.5, 0.8);
        this.bee_head.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Left Eye
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/6, 0, 1, 0);
        this.scene.translate(0.8, 0.4, 0);
        this.scene.rotate(Math.PI/16, 0, 0, 1);
        this.scene.scale(0.2, 0.8, 0.4);
        this.bee_eye.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Right Eye
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/6, 0, 1, 0);
        this.scene.translate(-0.8, 0.4, 0);
        this.scene.rotate(-Math.PI/16, 0, 0, 1);
        this.scene.scale(0.2, 0.8, 0.4);
        this.bee_eye.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Left Antenna
        this.scene.pushMatrix();
        this.scene.translate(0.4, 1.25, 0.25);
        this.scene.rotate(Math.PI/6, 0, 1, 0);
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.build_antenna();
        this.scene.popMatrix();

        // Right Antenna
        this.scene.pushMatrix();
        this.scene.translate(-0.4, 1.25, 0.25);
        this.scene.rotate(-Math.PI/6, 0, 1, 0);
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.build_antenna();
        this.scene.popMatrix();
    }
}
