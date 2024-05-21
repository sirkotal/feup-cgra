import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import {MySphere} from '../objects/MySphere.js';
/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - Texture to be applied to the panorama
 */
export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);

        this.panorama_appearance = new CGFappearance(scene);
        this.panorama_appearance.setTexture(texture);

        this.sphere = new MySphere(scene, 40, 40, true);
	}

    display() {
        this.scene.pushMatrix();

        // center the panorama in the camera position
        this.scene.translate(
            this.scene.camera.position[0],
            this.scene.camera.position[1],
            this.scene.camera.position[2]
        );

        this.scene.scale(200, 200, 200); // 200 units of radius
        this.panorama_appearance.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}

