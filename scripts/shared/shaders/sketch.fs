varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vLight;

uniform int renderDepth;

void main() {

    vec3 ambient = vec3( .1 );
    vec3 n = normalize( vNormal );
    vec3 s = normalize( vLight - vPosition );

    vec3 color = vec3( .75 );
    vec3 diffuse = color * max( 0.0, dot( n, s ) ) * vec3( 1. );

    vec3 r = - reflect( vLight, n );
    r = normalize( r );
    vec3 v = - vPosition.xyz;
    v = normalize( v );
    float shininess = 10.;

    float rm = 1. - max( 0., dot( n, v ) );
    vec3 rim = vec3( pow( rm, 2. ) );

    vec3 specular;
    if( shininess != 0.0 ) {
        specular = vec3( 1. ) * vec3( 1. ) * pow( max( 0.0, dot( r, v ) ), shininess );
    } else {
        specular = vec3( 0. );
    }
    specular = vec3( 0.);
    rim = vec3( 0. );

    if( renderDepth == 0 ) {
        gl_FragColor = vec4( rim + ambient + diffuse + specular, 1. );
    } else {
        float z = clamp( 0., 1., gl_FragCoord.w * 10. );
        gl_FragColor = vec4( .5 * ( 1. + n.x ), .5 * ( 1. + n.y ), z, 1. );
    }

}
