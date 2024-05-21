import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyBlade } from '../grass/MyBlade.js';

/**
 * MyGrassBed
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrassBed extends CGFobject {
	constructor(scene, rock_pos) {
        super(scene);

        this.pos_grid = [];
        this.rock_stack = [
            [-10, 0, 0], [-9, 0, 0], [-11, 0, 0], [-8, 0, 0], [-12, 0, 0], [-10, 0, -1], [-10, 0, 1], [-10, 0, -2], [-10, 0, 2], [-11, 0, -2], [-11, 0, 2],
            [-10, 0.7, 0], [-9, 0.7, 0], [-11, 0.7, 0],
            [-10, 2.1, 0], [-9, 1.4, 0], [-11, 1.4, 0],
        ];


        for (let x = -50; x < 50; x += 4) {
            for (let z = -50; z < 50; z += 4) {
                if (this.rock_stack.some(rock => rock[0] === x && rock[1] === 0 && rock[2] === z) || rock_pos.some(rock => rock[0] === x && rock[1] === z)) {
                    continue;
                }
                this.pos_grid.push([x, 0, z]);
            }
        }

        this.blades = [];
        for (let i = 0; i < this.pos_grid.length; i++) {
            this.blades.push(
                new MyBlade(scene, Math.random() * (2 - 0.9) + 0.9)
            );
        }
    }

    display() {
        this.scene.pushMatrix();

        for (let i = 0; i < this.blades.length; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.pos_grid[i][0], this.pos_grid[i][1], this.pos_grid[i][2]);
            this.blades[i].display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }
}

