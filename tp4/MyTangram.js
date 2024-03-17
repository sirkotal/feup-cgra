import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

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

    this.tangramMaterial = new CGFappearance(scene);
    this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.tangramMaterial.setShininess(10.0);
    this.tangramMaterial.loadTexture('images/tangram.png');
    this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');
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
    this.tangramMaterial.apply();
    this.diamond.updateTexCoords([
        0, 0.5,
        0.25, 0.75,
        0.25, 0.25,
        0.5, 0.5,

        0, 0.5,
        0.25, 0.75,
        0.25, 0.25,
        0.5, 0.5,
    ]);
    this.diamond.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -1, 0);
    this.scene.rotate(-(Math.PI / 2), 0, 0, 1);
    this.tangramMaterial.apply();
    this.triangleBig.updateTexCoords([
        0.5, 0.5,
        1, 0,
        0, 0,

        0.5, 0.5,
        1, 0,
        0, 0,
    ]);
    this.triangleBig.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.tangramMaterial.apply();
    this.triangleSmall.updateTexCoords([
        0.25, 0.25,
        0, 0,
        0, 0.5,

        0.25, 0.25,
        0, 0,
        0, 0.5,
    ]);
    this.triangleSmall.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 0);
    this.scene.scale(-1, 1, -1);
    this.scene.rotate(Math.PI / 4, 0, 0, 1);
    this.tangramMaterial.apply();
    this.parallelogram.updateTexCoords([
        1, 1,
        0.5, 1,
        0.75, 0.75,
        0.25, 0.75,

        1, 1,
        0.5, 1,
        0.75, 0.75,
        0.25, 0.75,
    ]);
    this.parallelogram.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1.5, -1.5, 0);
    this.scene.scale(-1.5, 1.5, -1.5);
    this.tangramMaterial.apply();
    this.triangle.updateTexCoords([
        0.5, 0.5,
        1, 0.5,
        1, 0,

        0.5, 0.5,
        1, 0.5,
        1, 0,
    ]);
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-(2 * Math.cos(Math.PI/4) + 1), 2 * Math.sin(Math.PI/4) + Math.sqrt(2) + 0.5, 0);
    this.scene.scale(-1, 1, -1);
    this.tangramMaterial.apply();
    this.triangle.updateTexCoords([
        0, 0.5,
        0, 1,
        0.5, 1,

        0, 0.5,
        0, 1,
        0.5, 1,
    ]);
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2.75, -0.25, 0);
    this.scene.scale(0.75, 0.75, 0.75);
    this.scene.rotate(-(Math.PI / 2), 0, 0, 1);
    this.tangramMaterial.apply();
    this.triangle.updateTexCoords([
        0.5, 0.5,
        0.5, 0.75,
        0.75, 0.75,

        0.5, 0.5,
        0.5, 0.75,
        0.75, 0.75,
    ]);
    this.triangle.display();
    this.scene.popMatrix();
  }
}

