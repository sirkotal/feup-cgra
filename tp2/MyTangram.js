import { CGFobject } from '../lib/CGF.js';
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
  }

  display() {
    // Center the tangram
    this.scene.multMatrix([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0.5, 0, 1,
    ]);

    // Translate (1, 1, 0)
    let diamondTranslate = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 0, 1,
      1, 1, 0, 1,
    ];

    this.scene.pushMatrix();
    this.scene.multMatrix(diamondTranslate);

    this.diamond.display();

    this.scene.popMatrix();

    // Rotate -(PI/2) around z
    let triangleBigRotate = [
      Math.cos(-(Math.PI / 2)), Math.sin(-(Math.PI / 2)), 0, 0,
      -Math.sin(-(Math.PI / 2)), Math.cos(-(Math.PI / 2)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];

    // Translate (0, -2, 0)
    let triangleBigTranslate = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, -1, 0, 1,
    ];

    this.scene.pushMatrix();
    this.scene.multMatrix(triangleBigTranslate);
    this.scene.multMatrix(triangleBigRotate);

    this.triangleBig.display();

    this.scene.popMatrix();

    // Rotate (PI/2) around z
    let triangleSmallRotate = [
      Math.cos(Math.PI / 2), Math.sin(Math.PI / 2), 0, 0,
      -Math.sin(Math.PI / 2), Math.cos(Math.PI / 2), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];

    // Translate (2, 0, 0)
    let triangleSmallTranslate = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      2, 0, 0, 1,
    ];

    this.scene.pushMatrix();
    this.scene.multMatrix(triangleSmallTranslate);
    this.scene.multMatrix(triangleSmallRotate);

    this.triangleSmall.display();

    this.scene.popMatrix();

    // Rotate (PI/4) around z
    let parallelogramRotate = [
      Math.cos(Math.PI / 4), Math.sin(Math.PI / 4), 0, 0,
      -Math.sin(Math.PI / 4), Math.cos(Math.PI / 4), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];

    // Reflect in y
    let parallelogramScale = [
      -1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, -1, 0,
      0, 0, 0, 1,
    ];

    // Translate (0, -0.5, 0)
    let parallelogramTranslate = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, -0.5, 0, 1,
    ];

    this.scene.pushMatrix();
    this.scene.multMatrix(parallelogramTranslate);
    this.scene.multMatrix(parallelogramScale);
    this.scene.multMatrix(parallelogramRotate);

    this.parallelogram.display();

    this.scene.popMatrix();

    // Scale *1.5 and Reflect in y
    let triangleScale = [
      -1.5, 0, 0, 0,
      0, 1.5, 0, 0,
      0, 0, -1.5, 0,
      0, 0, 0, 1,
    ];

    // Translate (1.5, -1.5, 0)
    let triangleTranslate = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      1.5, -1.5, 0, 1,
    ];

    this.scene.pushMatrix();
    this.scene.multMatrix(triangleTranslate);
    this.scene.multMatrix(triangleScale);

    this.triangle.display();

    this.scene.popMatrix();

    // Reflect in y
    let triangleScale2 = [
      -1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, -1, 0,
      0, 0, 0, 1,
    ];

    // Translate (-(2 * cos(PI/4)  + 1), 2 * sin(PI/4) + sqrt(2) + 0.5, 0)
    let triangleTranslate2 = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      -(2 * Math.cos(Math.PI/4) + 1), (2 * Math.sin(Math.PI/4) + Math.sqrt(2) + 0.5), 0, 1,
    ];

    this.scene.pushMatrix();
    this.scene.multMatrix(triangleTranslate2);
    this.scene.multMatrix(triangleScale2);

    this.triangle.display();

    this.scene.popMatrix();

    // Rotate -PI/2 around z
    let triangleRotate3 = [
      Math.cos(-(Math.PI / 2)), Math.sin(-(Math.PI / 2)), 0, 0,
      -Math.sin(-(Math.PI / 2)), Math.cos(-(Math.PI / 2)), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];

    // Scale *0.75
    let triangleScale3 = [
      0.75, 0, 0, 0,
      0, 0.75, 0, 0,
      0, 0, 0.75, 0,
      0, 0, 0, 1,
    ];

    // Translate (3, 0, 0);
    let triangleTranslate3 = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      2.75, -0.25, 0, 1,
    ];

    this.scene.pushMatrix();
    this.scene.multMatrix(triangleTranslate3);
    this.scene.multMatrix(triangleScale3);
    this.scene.multMatrix(triangleRotate3);

    this.triangle.display();

    this.scene.popMatrix();
  }
}

