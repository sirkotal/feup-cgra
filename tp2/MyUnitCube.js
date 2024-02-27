import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0.5, 0.5, 0.5, // 0
            -0.5, 0.5, 0.5, // 1
            0.5, -0.5, 0.5, // 2
            0.5, 0.5, -0.5, // 3
            0.5, -0.5, -0.5, // 4
            -0.5, 0.5, -0.5, // 5
            -0.5, -0.5, 0.5, // 6
            -0.5, -0.5, -0.5, // 7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 3,
			3, 2, 4,

            1, 5, 6,
            5, 7, 6,

            0, 1, 6,
            0, 6, 2,

            3, 7, 5,
            3, 4, 7,

            0, 3, 1,
            3, 5, 1,

            2, 6, 7,
            2, 7, 4,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
