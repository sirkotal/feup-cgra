import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MyRightTriangle } from '../objects/MyRightTriangle.js';
import { MyTriangle } from '../objects/MyTriangle.js';

/**
 * MyBlade
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBlade extends CGFobject {
	constructor(scene, randfactor) {
		super(scene);
        this.rf = randfactor;
        this.triangle = new MyRightTriangle(scene, randfactor);
        this.top = new MyTriangle(scene);

        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(0.07, 0.4, 0, 1.0);
        this.green.setDiffuse(0.07, 0.4, 0, 1.0); 
        this.green.setSpecular(0.07, 0.4, 0, 1.0); 
        this.green.setShininess(10.0);

        this.grass_tex = new CGFtexture(this.scene, "images/grass_blade.jpg");

        this.green.setTexture(this.grass_tex);
        this.green.setTextureWrap('REPEAT', 'REPEAT');
	}

    display() {
        this.scene.pushMatrix();

        for (let i = 0; i < 4; i++) {
            this.scene.pushMatrix();
            if (i == 0) {
                this.scene.translate(0.5, 0, 0);
                this.scene.rotate(Math.PI / 2, 0, 0, 1);
            }
            if (i == 1) {
                this.scene.translate(0.5, this.rf, 0);
                this.scene.rotate(-Math.PI / 2, 0, 0, 1);
            }
            if (i == 2) {
                this.scene.translate(i/4 + 0.5, 0, 0);
                this.scene.rotate(Math.PI / 2, 0, 0, 1);
            }
            if (i == 3) {
                this.scene.translate(i/4 + 0.25, 0, 0);
                this.scene.rotate(Math.PI, 1, 0, 0);
                this.scene.rotate(-Math.PI / 2, 0, 0, 1);
            }
            this.green.apply();
            this.triangle.display();
            
            this.scene.popMatrix();
        }

        this.scene.translate(0.75, this.rf, 0);
        this.scene.scale(0.5, 1, 1.2);
        this.green.apply();
        this.top.display();

        this.scene.popMatrix();
    }
}
