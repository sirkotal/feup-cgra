import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import {MyFlower} from '../flowers/MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene) {
        super(scene);

        this.leaf_roughness = new CGFtexture(this.scene, "images/leaf_roughness.png");
        this.recetacle_roughness = new CGFtexture(this.scene, "images/receptacle_roughness.jpg");
        this.pollen_texture = new CGFtexture(this.scene, "images/pollen_texture.jpg");

        this.flower_positions = [
            [-40, -40], [-40, -20], [-40, 0], [-40, 20], [-40, 40],
            [-20, -40], [-20, -20], [-20, 0], [-20, 20], [-20, 40],
            [0, -40], [0, -20], [0, 0], [0, 20], [0, 40],
            [20, -40], [20, -20], [20, 0], [20, 20], [20, 40],
            [40, -40], [40, -20], [40, 0], [40, 20], [40, 40],
        ];

        this.flowers_collision = [];

        this.flowers = [];
        this.flower_rotations = [];
        for (let i = 0; i < 25; i++) {
            let external_radius = Math.random() * 5 + 2;
            let receptacle_radius = external_radius / 5;
            let num_petals = Math.floor(Math.random() * 4) + 4;
            let stem_radius = external_radius / 20;
            let stem_height = Math.floor(Math.random() * external_radius) + 2;
            let [petal_color, receptacle_color, stem_color, leaf_color] = this.load_flower_colors();

            this.flowers.push(
                new MyFlower(
                    scene,
                    external_radius,
                    receptacle_radius,
                    num_petals,
                    stem_radius,
                    stem_height,
                    petal_color,
                    receptacle_color,
                    stem_color,
                    leaf_color,
                )
            );

            this.flowers[i].init_textures(
                this.leaf_roughness,
                this.leaf_roughness,
                this.recetacle_roughness,
                this.leaf_roughness,
                this.pollen_texture
            );

            this.flower_rotations.push(Math.random() * Math.PI * 2);
            this.flowers_collision.push([
                [this.flower_positions[i][0] - receptacle_radius, this.flower_positions[i][0] + receptacle_radius],
                [this.flower_positions[i][1] - receptacle_radius, this.flower_positions[i][1] + receptacle_radius],
                this.flowers[i].flower_height
            ]);
        }
    }

    load_flower_colors() {
        let petal_pink = new CGFappearance(this.scene)
        petal_pink.setAmbient(0.5, 0.30, 0.41, 1.0)
        petal_pink.setDiffuse(0.5, 0.30, 0.41, 1.0)
        petal_pink.setSpecular(1.0, 0.61, 0.82, 1.0)
        petal_pink.setShininess(10.0);

        let petal_yellow = new CGFappearance(this.scene);
        petal_yellow.setAmbient(1.0, 0.8, 0.3, 0.0);
        petal_yellow.setDiffuse(1.0, 0.8, 0.3, 1.0);
        petal_yellow.setSpecular(1.0, 1.0, 0.0, 1.0);
        petal_yellow.setShininess(10.0);

        let petal_green = new CGFappearance(this.scene);
        petal_green.setAmbient(0.1, 0.9, 0.2, 1.0);
        petal_green.setDiffuse(0.1, 0.9, 0.2, 1.0);
        petal_green.setSpecular(0.1, 1.0, 0.2, 1.0);
        petal_green.setShininess(10.0);

        let petal_blue = new CGFappearance(this.scene);
        petal_blue.setAmbient(0.1, 0.5, 0.9, 1.0);
        petal_blue.setDiffuse(0.1, 0.5, 0.9, 1.0);
        petal_blue.setSpecular(0.1, 0.5, 1.0, 1.0);
        petal_blue.setShininess(10.0);

        let petal_colors = [
            petal_pink,
            petal_yellow,
            petal_green,
            petal_blue,
        ];

        let receptacle_yellow = new CGFappearance(this.scene);
        receptacle_yellow.setAmbient(0.5, 0.5, 0, 1.0);
        receptacle_yellow.setDiffuse(0.5, 0.5, 0, 1.0);
        receptacle_yellow.setSpecular(1, 1, 0, 1.0);
        receptacle_yellow.setShininess(10.0);

        let stem_light_green = new CGFappearance(this.scene);
        stem_light_green.setAmbient(0.3, 0.9, 0.0, 1.0);
        stem_light_green.setDiffuse(0.3, 0.9, 0.0, 1.0);
        stem_light_green.setSpecular(0.3, 1.0, 0.0, 1.0);
        stem_light_green.setShininess(10.0);

        let stem_dark_green = new CGFappearance(this.scene);
        stem_dark_green.setAmbient(0.1, 0.6, 0.0, 1.0);
        stem_dark_green.setDiffuse(0.1, 0.6, 0.0, 1.0);
        stem_dark_green.setSpecular(0.3, 0.7, 0.0, 1.0);
        stem_dark_green.setShininess(10.0);

        let stem_colors = [
            stem_light_green,
            stem_dark_green,
        ];

        let leaf_green = new CGFappearance(this.scene);
        leaf_green.setAmbient(0.1, 0.9, 0.2, 1.0);
        leaf_green.setDiffuse(0.1, 0.9, 0.2, 1.0);
        leaf_green.setSpecular(0.1, 1.0, 0.2, 1.0);
        leaf_green.setShininess(10.0);

        let leaf_yellow_green = new CGFappearance(this.scene);
        leaf_yellow_green.setAmbient(0.4, 0.55, 0.3, 1.0);
        leaf_yellow_green.setDiffuse(0.4, 0.55, 0.3, 1.0);
        leaf_yellow_green.setSpecular(0.4, 0.6, 0.3, 1.0);
        leaf_yellow_green.setShininess(10.0);

        let leaf_colors = [
            leaf_green,
            leaf_yellow_green,
        ];

        let colors = [
            petal_colors[Math.floor(Math.random() * petal_colors.length)],
            receptacle_yellow,
            stem_colors[Math.floor(Math.random() * stem_colors.length)],
            leaf_colors[Math.floor(Math.random() * leaf_colors.length)],
        ];

        return colors;
    }

    display() {
        this.scene.pushMatrix();

        for (let i = 0; i < 25; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.flower_positions[i][0], 0, this.flower_positions[i][1]);
            this.scene.rotate(this.flower_rotations[i], 0, 1, 0);
            this.flowers[i].display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }
}
