varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vLight;
vec4 lightPosition = vec4( 0., 0., -10., 1. );

void main() {

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
    vNormal = normalMatrix * normal;
    vPosition = mvPosition.xyz;
    vLight = ( viewMatrix * lightPosition ).xyz;

}
