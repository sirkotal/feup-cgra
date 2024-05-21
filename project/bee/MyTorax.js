import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import {MySphere} from '../objects/MySphere.js';

/**
 * MyTorax
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTorax extends CGFobject {
	constructor(scene) {
		super(scene);

        this.sphere = new MySphere(scene, 40, 40);

        this.bee_torax = new CGFappearance(this.scene);
        this.bee_torax.setAmbient(0.4, 0.3, 0.1, 1);
        this.bee_torax.setDiffuse(0.5, 0.4, 0.1, 1);
        this.bee_torax.setSpecular(0.1, 0.1, 0.0, 1);
        this.bee_torax.setShininess(10.0);

        this.bee_leg = new CGFappearance(this.scene);
        this.bee_leg.setAmbient(0.0, 0.0, 0.0, 1);
        this.bee_leg.setDiffuse(0.05, 0.025, 0.0, 1);
        this.bee_leg.setSpecular(0.1, 0.05, 0.0, 1);
        this.bee_leg.setShininess(10.0);

        this.bee_wing = new CGFappearance(this.scene);
        this.bee_wing.setAmbient(1, 1, 1, 0);
        this.bee_wing.setDiffuse(1, 1, 1, 0.2);
        this.bee_wing.setSpecular(1, 1, 1, 0.1);
        this.bee_wing.setEmission(1, 1, 1, 0);
        this.bee_wing.loadTexture("images/bee_wings.png");

        this.bee_wing_angle = 0;
	}

    build_leg() {
        this.scene.translate(
            0.375 * Math.cos(Math.PI/6),
            -0.375 - 2 * 0.375 * Math.sin(Math.PI/6) - 0.15 * Math.sin(Math.PI/3),
            0
        );

        // Lower part
        this.scene.pushMatrix();
        this.scene.translate(0.15 * Math.cos(Math.PI/3), -0.375, 0);
        this.scene.rotate(Math.PI/3, 0, 0, 1);
        this.scene.scale(0.05, 0.15, 0.05);
        this.bee_leg.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Middle part
        this.scene.pushMatrix();
        this.scene.scale(0.075, 0.375, 0.075);
        this.bee_leg.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Upper part
        this.scene.pushMatrix();
        this.scene.translate(-(0.375 / 2 * Math.cos(Math.PI/6)), 0.375 + 0.375 * Math.sin(Math.PI/6), 0);
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.scale(0.075, 0.375, 0.075);
        this.bee_leg.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

    build_wing() {
        this.scene.pushMatrix();
        this.scene.scale(1.75, 0.05, 1);
        this.bee_wing.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

    update_wing_angle(angle) {
        this.bee_wing_angle = angle;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 1.25);
        this.bee_torax.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/6, 0, 1, 0);
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.translate(0.7, -0.7, 0);
        this.build_leg();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.translate(0.7, -0.7, 0);
        this.build_leg();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/6, 0, 1, 0);
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.translate(0.7, -0.7, 0);
        this.build_leg();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(-Math.PI/6, 0, 1, 0);
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.translate(0.7, -0.7, 0);
        this.build_leg();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.translate(0.7, -0.7, 0);
        this.build_leg();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(Math.PI/6, 0, 1, 0);
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.translate(0.7, -0.7, 0);
        this.build_leg();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(this.bee_wing_angle, 0, 0, 1);
        this.scene.translate(-2, 0.25, 0);
        this.scene.rotate(Math.PI/12, 0, 0, 1);
        this.build_wing();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-this.bee_wing_angle, 0, 0, 1);
        this.scene.translate(2, 0.25, 0);
        this.scene.rotate(-Math.PI/12, 0, 0, 1);
        this.build_wing();
        this.scene.popMatrix();
    }
}
