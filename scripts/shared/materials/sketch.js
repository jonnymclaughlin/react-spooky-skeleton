import { ShaderMaterial } from 'three'
import sketchFragment from 'shared/shaders/sketch.fs'
import sketchVertex from 'shared/shaders/sketch.vs'

export default function() {
    const material = new ShaderMaterial({
        uniforms: {
            renderDepth: { type: 'i', value: 0 },
        },
        vertexShader: sketchVertex,
        fragmentShader: sketchFragment,
        flatShading: true,
        transparent: true,
    })

    return material
}
