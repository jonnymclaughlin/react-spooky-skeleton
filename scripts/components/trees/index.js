import { BoxGeometry, Mesh } from 'three'

const NUM_TREES = 100

export default class Trees {
    constructor(scene) {
        // vars
        this.scene = scene
        this.trees = []

        // setup
        this.createTrees()
    }

    createTrees() {
        for (let i = 0; i < NUM_TREES; i++) {
            const geometry = new BoxGeometry(200, 200, 200, 1, 1, 1)
            const box = new Mesh(geometry)
            // const scale = Math.random() * 1.5 + 2
            // box.scale.set(scale, scale, scale)
            box.position.set(Math.random() * 4000 - 2000, -200, Math.random() * 3000 - 3000)
            this.scene.add(box)
            this.trees.push(box)
        }
    }

    update(cameraZ) {
        this.trees.forEach(tree => {
            if (tree.position.z > cameraZ) {
                tree.position.z -= 3000
            }
        })
    }
}
