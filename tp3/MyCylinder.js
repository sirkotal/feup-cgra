import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
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

        for (let i = 0 ; i < this.slices ; i++) {
            let x = Math.cos(alpha * i);
            let y = Math.sin(alpha * i);
            let size = Math.sqrt(x * x + y * y);

            this.vertices.push(x, y, 0);
            this.normals.push(x / size, y / size, 0);
            
            for (let j = 0 ; j < this.stacks ; j++) {
                let z = (j + 1) / this.stacks;
                this.vertices.push(x, y, z);
                this.normals.push(x / size, y / size, 0);

                if (i < this.slices - 1) {
                    this.indices.push(i * (this.stacks + 1) + j + 1, i * (this.stacks + 1) + j, (i + 1) * (this.stacks + 1) + j);
                    this.indices.push((i + 1) * (this.stacks + 1) + j + 1, i * (this.stacks + 1) + j + 1, (i + 1) * (this.stacks + 1) + j);
                } else {
                    this.indices.push(i * (this.stacks + 1) + j + 1, i * (this.stacks + 1) + j, j);
                    this.indices.push(j + 1, i * (this.stacks + 1) + j + 1, j);
                }
            }
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

