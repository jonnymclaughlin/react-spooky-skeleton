import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'

export default class Ground {
    constructor(scene) {
        // vars
        this.scene = scene
        this.ground1 = null
        this.ground2 = null

        // setup
        this.createGround()
    }

    createGround() {
        const plane = new PlaneGeometry(8000, 20000, 9, 24)
        const ground1 = new Mesh(plane, new MeshBasicMaterial({ color: 0xffffff }))
        const ground2 = new Mesh(plane, new MeshBasicMaterial({ color: 0xffffff }))

        ground1.rotation.set(-Math.PI / 2, 0, 0)
        ground1.position.y = -300
        ground1.position.z = -10000

        ground2.rotation.set(-Math.PI / 2, 0, 0)
        ground2.position.y = -300
        ground2.position.z = -10000

        this.ground1 = ground1
        this.scene.add(this.ground1)

        this.ground2 = ground2
        this.scene.add(this.ground2)
    }

    update(cameraZ) {
        if (this.ground1.position.z - 10000 > cameraZ) {
            this.ground1.position.z -= 4000
        }
        if (this.ground2.position.z - 10000 > cameraZ) {
            this.ground2.position.z -= 4000
        }
    }
}
