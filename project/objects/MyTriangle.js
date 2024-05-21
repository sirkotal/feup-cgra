import {CGFobject} from '../../lib/CGF.js';

export class MyTriangle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.5, 0, 0,	// 0
            0.5, 0, 0,	// 1
            0, 1, 0,    // 2

            -0.5, 0, 0,	// 3
            0.5, 0, 0,	// 4
            0, 1, 0,    // 5
        ];

        this.indices = [
            0, 1, 2,
            4, 3, 5,
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
        ];

        this.texCoords = [
            0, 0.5,
            0, 1,
            0.5, 1,
            0, 0.5,
            0, 1,
            0.5, 1
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}
