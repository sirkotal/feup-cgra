import {CGFobject} from '../../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the cylinder
 */
export class MyCylinder extends CGFobject {
	constructor(scene, radius=1) {
		super(scene);
        this.radius = radius;
        this.slices = 8;
        this.stacks = 20;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
        this.texCoords = [];

		let alpha = (2 * Math.PI) / this.slices;
        let scale = this.radius;

        for (let i = 0 ; i < this.slices ; i++) {
            let x = scale * Math.cos(alpha * i);
            let z = scale * Math.sin(alpha * i);
            let size = Math.sqrt(x * x + z * z);

            this.vertices.push(x, 0, z);
            this.normals.push(x / size, 0, z / size);
            
            for (let j = 0 ; j < this.stacks ; j++) {
                let y = (j + 1) / this.stacks;
                this.vertices.push(x, y, z);
                this.normals.push(x / size, 0, z / size);
                this.texCoords.push(i / this.slices, 1 - (j / this.stacks));

                if (i < this.slices - 1) {
                    this.indices.push(i * (this.stacks + 1) + j + 1, i * (this.stacks + 1) + j, (i + 1) * (this.stacks + 1) + j);
                    this.indices.push((i + 1) * (this.stacks + 1) + j + 1, i * (this.stacks + 1) + j + 1, (i + 1) * (this.stacks + 1) + j);
                    this.indices.push(i * (this.stacks + 1) + j + 1, (i + 1) * (this.stacks + 1) + j, i * (this.stacks + 1) + j);
                    this.indices.push((i + 1) * (this.stacks + 1) + j + 1, (i + 1) * (this.stacks + 1) + j, i * (this.stacks + 1) + j + 1);
                } else {
                    this.indices.push(i * (this.stacks + 1) + j + 1, i * (this.stacks + 1) + j, j);
                    this.indices.push(j + 1, i * (this.stacks + 1) + j + 1, j);
                    this.indices.push(i * (this.stacks + 1) + j + 1, j, i * (this.stacks + 1) + j);
                    this.indices.push(j + 1, j, i * (this.stacks + 1) + j + 1);
                }
            }
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
