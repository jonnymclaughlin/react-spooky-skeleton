import { Math as ThreeMath, Vector3 } from 'three'

const MOVE_SPEED = 300
const LOOK_SPEED = 100

export default class FirstPerson {
    constructor(camera) {
        // vars
        this.camera = camera
        this.target = new Vector3(0, 0, 0)
        this.enabled = true
        this.moveForward = false
        this.moveBackward = false
        this.moveLeft = false
        this.moveRight = false
        this.lon = 0
        this.theta = 0

        // events
        document.addEventListener('keydown', this.onKeyDown.bind(this), false)
        document.addEventListener('keyup', this.onKeyUp.bind(this), false)
    }

    update(delta) {
        if (!this.enabled) return

        const moveSpeed = MOVE_SPEED * delta
        const lookSpeed = LOOK_SPEED * delta
        const { x, z } = this.camera.position

        this.moveForward && this.camera.translateZ(-moveSpeed)
        this.moveBackward && this.camera.translateZ(moveSpeed)

        if (this.moveLeft) {
            this.lon -= lookSpeed
        }

        if (this.moveRight) {
            this.lon += lookSpeed
        }

        this.theta = ThreeMath.degToRad(this.lon)

        // move target object to new position
        this.target.x = x + 100 * Math.cos(this.theta)
        this.target.z = z + 100 * Math.sin(this.theta)

        this.camera.lookAt(this.target)
    }

    resize() {}

    onKeyDown({ keyCode }) {
        switch (keyCode) {
            case 38:
            case 87:
                this.moveForward = true
                break
            case 37:
            case 65:
                this.moveLeft = true
                break
            case 40:
            case 83:
                this.moveBackward = true
                break
            case 39:
            case 68:
                this.moveRight = true
                break
        }
    }

    onKeyUp({ keyCode }) {
        switch (keyCode) {
            case 38:
            case 87:
                this.moveForward = false
                break
            case 37:
            case 65:
                this.moveLeft = false
                break
            case 40:
            case 83:
                this.moveBackward = false
                break
            case 39:
            case 68:
                this.moveRight = false
                break
        }
    }
}
