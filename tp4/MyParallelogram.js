import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	// 0
			2, 0, 0,	// 1
			1, 1, 0,	// 2
			3, 1, 0,	// 3

			0, 0, 0,	// 4
			2, 0, 0,	// 5
			1, 1, 0,	// 6
			3, 1, 0,	// 7
		];

		//Counter-clockwise reference of vertices
        this.indices = [
            // Front Side
            0, 1, 2,
            1, 3, 2,

            // Back Side
            4, 6, 5,
            5, 6, 7,
        ];

        this.normals = [
            // Front Side
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            // Back Side
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
        ];

        //The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

    updateTexCoords(coords) {
        this.texCoords = [...coords];
        this.updateTexCoordsGLBuffers();
    }
}

