import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, top, bottom, right, left, front, back) {
		super(scene);
		this.quad = new MyQuad(this.scene);
        this.top = this.generateMaterial(top);
        this.bottom = this.generateMaterial(bottom);
        this.right = this.generateMaterial(right);
        this.left = this.generateMaterial(left);
        this.front = this.generateMaterial(front);
        this.back = this.generateMaterial(back);
	}

    generateMaterial(faceTexture) {
        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(0.1, 0.1, 0.1, 1);
        this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture(faceTexture);

        return this.texture;
    }

    displayQuad(angle, axis) {
        this.scene.pushMatrix();
        if (axis == "x")
            this.scene.rotate(angle, 1, 0, 0);
        if (axis == "y")
            this.scene.rotate(angle, 0, 1, 0);
        if (axis == "z")
            this.scene.rotate(angle, 0, 0, 1);
        
        if (axis == "x" && angle == Math.PI) {
            this.quad.updateTexCoords([
                0, 0,
                1, 0,
                0, 1, 
                1, 1  
            ]);
        }
        else {
            this.quad.updateTexCoords([
                0, 1,
                1, 1,
                0, 0,
                1, 0
            ]);
        }

        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();
    }

    display() {
        this.front.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.displayQuad(0, "x");
        this.bottom.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.displayQuad((Math.PI / 2), "x");
        this.top.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.displayQuad(-(Math.PI / 2), "x");
        this.back.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.displayQuad(Math.PI, "x");
        this.left.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.displayQuad((Math.PI / 2), "y");
        this.right.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.displayQuad(-(Math.PI / 2), "y");
    }
	
}
