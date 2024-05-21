import { CGFobject } from '../../lib/CGF.js';

export class MyRightTriangle extends CGFobject {
    constructor(scene, randfactor) {
        super(scene);

        this.rf = randfactor;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 0, 0,   
            this.rf, 0, 0,   
            0, 0.5, 0, 

            0, 0, 0,  
            this.rf, 0, 0,  
            0, 0.5, 0   
        ];

        this.indices = [
            0, 1, 2,   
            4, 3, 5    
        ];

        this.normals = [
            0, 0, 1,  
            0, 0, 1,   
            0, 0, 1,   

            0, 0, -1,  
            0, 0, -1,  
            0, 0, -1   
        ];

        this.texCoords = [
            0, 0,     
            1, 0,    
            0, 1, 
            0, 0,  
            1, 0, 
            0, 1   
        ];

        // The defined indices (and corresponding vertices)
        // will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}