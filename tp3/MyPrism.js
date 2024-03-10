import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
        this.slices = slices;
        this.stacks = stacks;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];

		let alpha = (2 * Math.PI) / this.slices;
		let index = 0;

        for (let i = 0 ; i < this.slices ; i++) {
            let x_1 = Math.cos(i * alpha);
			let x_2 = Math.cos((i + 1) * alpha);
            let y_1 = Math.sin(i * alpha);
            let y_2 = Math.sin((i + 1) * alpha);
            
            for (let j = 0 ; j < this.stacks ; j++) {
                let x = Math.cos((i + 0.5)* alpha);
                let y = Math.sin((i + 0.5)* alpha);
                let size = Math.sqrt((x * x) + (y * y));
				
				// (1 / this.stacks) increments the Z axis coordinate
                this.vertices.push(x_1, y_1, (1 / this.stacks) * j, x_2, y_2, (1 / this.stacks) * j, x_1, y_1, (1 / this.stacks) * (j + 1), x_2, y_2, (1 / this.stacks) * (j + 1));
                this.indices.push(index + 2, index, index + 1, index + 1, index + 3, index + 2);
                this.normals.push(x / size, y / size, 0, x / size, y / size, 0, x / size, y / size, 0, x / size, y / size, 0);
				
                index += 4;
            }
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

