import { CGFobject, CGFappearance } from '../../lib/CGF.js';
/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 * @param radius - Radius of the sphere
 */
export class MyPollen extends CGFobject {
	constructor(scene, slices=20, stacks=20, radius=1) {
		super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        const elongation_factor = 1.5;  // scaling

        const alpha = (Math.PI / 2) / this.slices; // angular increments -> longitude
        const beta = (Math.PI / 2) / this.stacks; // angular increments -> latitude

        for (let slice = 0; slice <= (this.slices * 4); slice++) { // longitudinal angle for each slice-stack combo
            const theta = slice * alpha;
            const cos_t = Math.cos(theta);
            const sin_t = Math.sin(theta);

            for (let stack = 0; stack <= (this.stacks * 2); stack++) {
                const gamma = (-Math.PI / 2) - stack * beta; // latitudinal angle for each slice-stack combo
                const cos_g = Math.cos(gamma);
                const sin_g = Math.sin(gamma);

                let y = this.radius * sin_g;
                if (y > 0) {          // if it's on the top hemisphere, apply "elongation"
                    y *= elongation_factor;
                }

                this.vertices.push(this.radius * cos_t * cos_g, y, this.radius * sin_t * cos_g);
                this.normals.push(this.radius * cos_t * cos_g, y, this.radius * sin_t * cos_g);
                this.texCoords.push(1 - slice / (this.slices * 4), 1 - stack / (this.stacks * 2));

                if (slice > 0 && stack > 0) { // triangle indices for each slice-stack combo
                    this.indices.push(
                        slice * (this.stacks * 2 + 1) + stack,
                        (slice - 1) * (this.stacks * 2 + 1) + stack - 1,
                        (slice - 1) * (this.stacks * 2 + 1) + stack,
                        slice * (this.stacks * 2 + 1) + stack,
                        slice * (this.stacks * 2 + 1) + stack - 1,
                        (slice - 1) * (this.stacks * 2 + 1) + stack - 1
                    );
                }   
            }
        }
		
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

