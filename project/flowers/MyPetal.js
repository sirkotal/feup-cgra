import {CGFobject} from '../../lib/CGF.js';
import {MyTriangle} from '../objects/MyTriangle.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
	constructor(scene, rotation_angle=0) {
		super(scene);

        this.rotation_angle = rotation_angle;
        this.lowerTriangle = new MyTriangle(scene);
        this.upperTriangle = new MyTriangle(scene);
	}

    updateRotationAngle(angle) {
        this.rotation_angle = angle;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(1, -1, 1);
        this.lowerTriangle.display();
        this.scene.popMatrix();

        this.scene.rotate(this.rotation_angle, 1, 0, 0);
        this.upperTriangle.display();
    }
}

