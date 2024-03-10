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

            0.5, 0.5, 0.5, // 8
            -0.5, 0.5, 0.5, // 9
            0.5, -0.5, 0.5, // 10
            0.5, 0.5, -0.5, // 11
            0.5, -0.5, -0.5, // 12
            -0.5, 0.5, -0.5, // 13
            -0.5, -0.5, 0.5, // 14
            -0.5, -0.5, -0.5, // 15

            0.5, 0.5, 0.5, // 16
            -0.5, 0.5, 0.5, // 17
            0.5, -0.5, 0.5, // 18
            0.5, 0.5, -0.5, // 19
            0.5, -0.5, -0.5, // 20
            -0.5, 0.5, -0.5, // 21
            -0.5, -0.5, 0.5, // 22
            -0.5, -0.5, -0.5, // 23
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

            8, 10, 11,
			11, 10, 12,

            9, 13, 14,
            13, 15, 14,

            8, 9, 14,
            8, 14, 10,

            11, 15, 13,
            11, 12, 15,

            8, 11, 9,
            11, 13, 9,

            10, 14, 15,
            10, 15, 12,

            16, 18, 19,
			19, 18, 20,

            17, 21, 22,
            21, 23, 22,

            16, 17, 22,
            16, 22, 18,

            19, 23, 21,
            19, 20, 23,

            16, 19, 17,
            19, 21, 17,

            18, 22, 23,
            18, 23, 20,
		];

		this.normals = [
			1, 0, 0, // 0
			-1, 0, 0, // 1
			1, 0, 0, // 2
			1, 0, 0, // 3
			1, 0, 0, // 4
			-1, 0, 0, // 5
			-1, 0, 0, // 6
			-1, 0, 0, // 7

            0, 1, 0,
            0, 1, 0,
            0, -1, 0,
            0, 1, 0,
            0, -1, 0,
            0, 1, 0,
            0, -1, 0,
            0, -1, 0,

			0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, 1,
            0, 0, -1,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
