import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyRock } from '../rocks/MyRock.js';

/**
 * MyRockSet
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRockSet extends CGFobject {
	constructor(scene, rock_num=0) {
        super(scene);

        this.rock_positions = [];

        for (let i = 0; i < 30; i++) {
            let randomX = Math.random() * (45 - (-45)) + (-45);
            let randomZ = Math.random() * (45 - (-45)) + (-45);

            this.rock_positions.push([randomX, randomZ]);
        }
        
        /*this.rock_positions = [
            [-20, -20], [-20, -10], [-20, 0], [-20, 10], [-20, 20],
            [-10, -20], [-10, -10], [-10, 10], [-10, 20],
            [0, -20], [0, -10], [0, 0], [0, 10], [0, 20],
        ];*/

        this.rock_stack = [
            [-10, 0, 0], [-9, 0, 0], [-11, 0, 0], [-8, 0, 0], [-12, 0, 0], [-10, 0, -1], [-10, 0, 1], [-10, 0, -2], [-10, 0, 2], [-11, 0, -2], [-11, 0, 2],
            [-10, 0.7, 0], [-9, 0.7, 0], [-11, 0.7, 0],
            [-10, 2.1, 0], [-9, 1.4, 0], [-11, 1.4, 0],
        ];

        this.rock_scales = [];

        this.rocks = [];
        for (let i = 0; i < this.rock_positions.length + this.rock_stack.length; i++) {
            this.rocks.push(
                new MyRock(scene, 40, 40)
            );
            
            this.rock_scales.push([Math.random() * (1.4 - 0.6) + 0.6, Math.random() * 0.5 + 0.25, Math.random() * (1.4 - 0.6) + 0.6]);
        }
    }

    getRockPositions() {
        return this.rock_positions;
    }

    display() {
        this.scene.pushMatrix();
        // I like this boulder. This is a nice boulder.
        for (let i = 0; i < this.rock_positions.length; i++) {        
            this.scene.pushMatrix();
            this.scene.translate(this.rock_positions[i][0], 0, this.rock_positions[i][1]);
            this.scene.scale(this.rock_scales[i][0], this.rock_scales[i][1], this.rock_scales[i][2]);
            this.rocks[i].display();
            this.scene.popMatrix();
        }

        for (let i = this.rock_positions.length; i < (this.rock_positions.length + this.rock_stack.length); i++) {        
            this.scene.pushMatrix();
            this.scene.translate(this.rock_stack[i - this.rock_positions.length][0], this.rock_stack[i - this.rock_positions.length][1], this.rock_stack[i - this.rock_positions.length][2]);
            this.scene.scale(this.rock_scales[i][0], this.rock_scales[i][1], this.rock_scales[i][2]);
            this.rocks[i].display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }
}

