import {
    AmbientLight,
    Clock,
    Color,
    CylinderGeometry,
    DirectionalLight,
    FogExp2,
    JSONLoader,
    LinearFilter,
    Mesh,
    PerspectiveCamera,
    RGBFormat,
    Scene,
    ShaderMaterial,
    TextureLoader,
    Vector2,
    WebGLRenderer,
    WebGLRenderTarget,
} from 'three'
import { EffectComposer, RenderPass, ShaderPass } from 'postprocessing'
import vertexShader from 'shared/shaders/render.vs'
import fragmentShader from 'shared/shaders/render.fs'
import vertexDownsample from 'shared/shaders/downsample.vs'
import fragmentDownsample from 'shared/shaders/downsample.fs'
import sketchMaterial from 'shared/materials/sketch'
import Ground from './ground'

const BUFFER_PARAMS = { minFilter: LinearFilter, magFilter: LinearFilter, format: RGBFormat, stencilBuffer: false }

export default class App {
    constructor({ el }) {
        // vars
        this.el = el
        this.scene = null
        this.renderer = null
        this.camera = null
        this.composer = null
        this.composer2 = null
        this.pass = null
        this.clock = new Clock()
        this.items = []
        this.colorBuffer = new WebGLRenderTarget(1, 1, BUFFER_PARAMS)
        this.width = window.innerWidth
        this.height = window.innerHeight

        // setup
        this.createScene()
        this.createComposer()
        this.createLight()
        this.createShader()
        this.createScenery()

        // loop
        this.loop()

        // events
        window.addEventListener('resize', this.resize.bind(this), false)
    }

    createScene() {
        const scene = new Scene()
        const aspectRatio = this.width / this.height
        const fieldOfView = 45
        const nearPlane = 1
        const farPlane = 10000
        const camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
        const renderer = new WebGLRenderer({ antialias: true })

        // configure scene
        scene.add(camera)
        scene.background = new Color(0xcccccc)
        // scene.fog = new FogExp2(0xcccccc, 0.002)

        // configure renderer
        renderer.setPixelRatio(window.devicePixelRatio)

        camera.position.x = -2
        camera.position.y = 2
        camera.position.z = 10

        this.scene = scene
        this.renderer = renderer
        this.camera = camera
        this.el.appendChild(renderer.domElement)
        this.resize()
    }

    createComposer() {
        const composer = new EffectComposer(this.renderer)
        composer.addPass(new RenderPass(this.scene, this.camera))
        this.composer = composer
    }

    createLight() {
        let light = new DirectionalLight(0xcccccc)
        light.position.set(1, 1, 1)
        this.scene.add(light)

        light = new DirectionalLight(0x002288)
        light.position.set(-1, -1, -1)
        this.scene.add(light)

        light = new AmbientLight(0x222222)
        this.scene.add(light)
    }

    createShader() {
        const shader = new ShaderMaterial({
            uniforms: {
                tDiffuse: { type: 't', value: null },
                tColor: { type: 't', value: null },
                tBlur: { type: 't', value: null },
                tNoise: { type: 't', value: new TextureLoader().load('/static/img/noise.png') },
                tPaper: { type: 't', value: new TextureLoader().load('/static/img/paper.jpg') },
                resolution: { type: 'v2', value: new Vector2(1, 1) },
            },

            vertexShader,
            fragmentShader,
        })

        const blurShader = new ShaderMaterial({
            uniforms: {
                tDiffuse: { type: 't', value: null },
                delta: { type: 'v2', value: new Vector2(0.01, 0.01) },
            },
            vertexShader: vertexDownsample,
            fragmentShader: fragmentDownsample,
        })

        const composer = new EffectComposer(this.renderer)
        const pass = new ShaderPass(shader)
        const pass2 = new ShaderPass(blurShader)
        const pass3 = new ShaderPass(blurShader)

        pass.renderToScreen = true
        pass.material.uniforms.resolution.value.set(this.width, this.height)
        pass2.material.uniforms.delta.value.x = 0
        pass3.material.uniforms.delta.value.y = 0

        this.pass = pass
        this.composer.addPass(pass)

        this.composer2 = composer
        this.composer2.addPass(new RenderPass(this.scene, this.camera))
        this.composer2.addPass(pass2)
        this.composer2.addPass(pass3)
    }

    createScenery() {
        const material = sketchMaterial()
        const loader = new JSONLoader()
        loader.load('/static/models/north.json', geometry => {
            const mesh = new Mesh(geometry, material)
            this.scene.add(mesh)
            this.items.push(mesh)
        })

        // const geometry = new CylinderGeometry(0, 10, 30, 4, 1)
        // const material = sketchMaterial()

        // for (let i = 0; i < 500; i++) {
        //     const mesh = new Mesh(geometry, material)
        //     mesh.position.x = (Math.random() - 0.5) * 1000
        //     mesh.position.y = (Math.random() - 0.5) * 1000
        //     mesh.position.z = (Math.random() - 0.5) * 1000
        //     this.scene.add(mesh)
        //     this.items.push(mesh)
        // }
    }

    loop() {
        this.renderer.setClearColor(0xffffff)
        this.items.forEach(item => (item.material.uniforms.renderDepth.value = 0))
        this.renderer.render(this.scene, this.camera, this.colorBuffer)

        this.composer2.render()
        this.pass.material.uniforms.tColor.value = this.colorBuffer
        this.pass.material.uniforms.tBlur.value = this.composer2.readBuffer.texture
        this.items.forEach(item => (item.material.uniforms.renderDepth.value = 1))
        this.renderer.setClearColor(0x808000)
        this.composer.render()

        requestAnimationFrame(this.loop.bind(this))
    }

    resize() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.width, this.height)
        this.colorBuffer.setSize(this.width, this.height)
        this.pass && this.pass.material.uniforms.resolution.value.set(this.width, this.height)
    }
}
