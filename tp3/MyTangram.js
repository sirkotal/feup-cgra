import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from "../tp2/MyDiamond.js";
import { MyTriangle } from "../tp2/MyTriangle.js";
import { MyParallelogram } from "../tp2/MyParallelogram.js";
import { MyTriangleBig } from "../tp2/MyTriangleBig.js";
import { MyTriangleSmall } from "../tp2/MyTriangleSmall.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
    super(scene);

    this.diamond = new MyDiamond(scene);
    this.triangle = new MyTriangle(scene);
    this.parallelogram = new MyParallelogram(scene);
    this.triangleBig = new MyTriangleBig(scene);
    this.triangleSmall = new MyTriangleSmall(scene);

    this.pink = new CGFappearance(this.scene);
    this.pink.setAmbient(1, 0.61, 0.82, 1.0);
    this.pink.setDiffuse(1, 0.61, 0.82, 1.0); 
    this.pink.setSpecular(1, 0.61, 0.82, 1.0); 
    this.pink.setShininess(10.0);

    this.yellow = new CGFappearance(this.scene);
    this.yellow.setAmbient(1, 1, 0, 1.0);
    this.yellow.setDiffuse(1, 1, 0, 1.0); 
    this.yellow.setSpecular(1, 1, 0, 1.0); 
    this.yellow.setShininess(10.0);

    this.green = new CGFappearance(this.scene);
    this.green.setAmbient(0, 1, 0, 1.0);
    this.green.setDiffuse(0, 1, 0, 1.0); 
    this.green.setSpecular(0, 1, 0, 1.0); 
    this.green.setShininess(10.0);

    this.blue = new CGFappearance(this.scene);
    this.blue.setAmbient(0, 0.5, 1, 1.0);
    this.blue.setDiffuse(0, 0.5, 1, 1.0);
    this.blue.setSpecular(0, 0.5, 1, 1.0); 
    this.blue.setShininess(10.0);

    this.purple = new CGFappearance(this.scene);
    this.purple.setAmbient(0.66, 0.31, 0.76, 1.0);
    this.purple.setDiffuse(0.66, 0.31, 0.76, 1.0);
    this.purple.setSpecular(0.66, 0.31, 0.76, 1.0); 
    this.purple.setShininess(10.0);

    this.red = new CGFappearance(this.scene);
    this.red.setAmbient(1, 0, 0, 1.0);
    this.red.setDiffuse(1, 0, 0, 1.0);
    this.red.setSpecular(1, 0, 0, 1.0); 
    this.red.setShininess(10.0);

    this.orange = new CGFappearance(this.scene);
    this.orange.setAmbient(1, 0.5, 0, 1.0);
    this.orange.setDiffuse(1, 0.5, 0, 1.0);
    this.orange.setSpecular(1, 0.5, 0, 1.0); 
    this.orange.setShininess(10.0);
  }

  enableNormalViz() {
    this.diamond.enableNormalViz();
    this.triangle.enableNormalViz();
    this.parallelogram.enableNormalViz();
    this.triangleBig.enableNormalViz();
    this.triangleSmall.enableNormalViz();
  }

  disableNormalViz() {
    this.diamond.disableNormalViz();
    this.triangle.disableNormalViz();
    this.parallelogram.disableNormalViz();
    this.triangleBig.disableNormalViz();
    this.triangleSmall.disableNormalViz();
  }

  display() {
    // Center the tangram
    this.scene.translate(0, 0.5, 0);

    this.scene.pushMatrix();
    this.scene.translate(1, 1, 0);
    this.diamond.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -1, 0);
    this.scene.rotate(-(Math.PI / 2), 0, 0, 1);
    this.blue.apply();
    this.triangleBig.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.purple.apply();
    this.triangleSmall.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 0);
    this.scene.scale(-1, 1, -1);
    this.scene.rotate(Math.PI / 4, 0, 0, 1);
    this.yellow.apply();
    this.parallelogram.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1.5, -1.5, 0);
    this.scene.scale(-1.5, 1.5, -1.5);
    this.orange.apply();
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-(2 * Math.cos(Math.PI/4) + 1), 2 * Math.sin(Math.PI/4) + Math.sqrt(2) + 0.5, 0);
    this.scene.scale(-1, 1, -1);
    this.pink.apply();
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2.75, -0.25, 0);
    this.scene.scale(0.75, 0.75, 0.75);
    this.scene.rotate(-(Math.PI / 2), 0, 0, 1);
    this.red.apply();
    this.triangle.display();
    this.scene.popMatrix();
  }
}

