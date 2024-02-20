import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        // Checkbox to control the visibility of the diamond
        this.gui.add(this.scene, 'displayDiamond').name('Display Diamond');

        // Checkbox to control the visibility of the triangle
        this.gui.add(this.scene, 'displayTriangle').name('Display Triangle');

        // Checkbox to control the visibility of the parallelogram
        this.gui.add(this.scene, 'displayParallelogram').name('Display Parallelogram');

        // Checkbox to control the visibility of the small triangle
        this.gui.add(this.scene, 'displaySmallTriangle').name('Display Small Triangle');

        // Checkbox to control the visibility of the big triangle
        this.gui.add(this.scene, 'displayBigTriangle').name('Display Big Triangle');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}
