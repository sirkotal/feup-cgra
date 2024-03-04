import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.quad = new MyQuad(this.scene);
	}

    displayQuad(angle, axis) {
        this.scene.pushMatrix();
        if (axis == "x")
            this.scene.rotate(angle, 1, 0, 0);
        if (axis == "y")
            this.scene.rotate(angle, 0, 1, 0);
        if (axis == "z")
            this.scene.rotate(angle, 0, 0, 1);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();
    }

    display() {
        this.displayQuad(0, "x");
        this.displayQuad((Math.PI / 2), "x");
        this.displayQuad(-(Math.PI / 2), "x");
        this.displayQuad(Math.PI, "x");
        this.displayQuad((Math.PI / 2), "y");
        this.displayQuad(-(Math.PI / 2), "y");
    }
	
}
