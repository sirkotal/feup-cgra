import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;

        // disable the processKeyboard function
        this.processKeyboard=function(){};
        
        // create a named array to store which keys are being pressed
        this.activeKeys={};

    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    }

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    }

    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        // Checkbox to control the visibility of the sphere
        this.gui.add(this.scene, 'displaySphere').name('Display Sphere');
        
        // Checkbox to control the visibility of the garden
        this.gui.add(this.scene, 'displayGarden').name('Display Garden');

        // Checkbox to control the visibility of the rock set
        this.gui.add(this.scene, 'displayRockSet').name('Display Rock Set');~

        // Checkbox to control the visibility of the bee
        this.gui.add(this.scene, 'displayBee').name('Display Bee');

        // Checkbox to control the visibility of the hive
        this.gui.add(this.scene, 'displayHive').name('Display Hive');

        // Checkbox to control the visibility of the grass
        this.gui.add(this.scene, 'displayGrass').name('Display Grass');

        // Checkbox to control the visibility of the panorama
        this.gui.add(this.scene, 'displayPanorama').name('Display Panorama');

        //Slider element in GUI for FoV
        this.gui.add(this.scene, 'fov', 0.5, 2).name('Field of View');

        //Slider element in GUI for scale
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');

        //Slider element in GUI for speed
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');

        this.initKeys();

        return true;
    }
}
