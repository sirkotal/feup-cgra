attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;

void main() {
    float waving = sin(aVertexPosition.y * 10.0 + timeFactor * 2.0) * 0.1;

    vec3 offset = vec3(0.0, 0.0, waving);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

    vTextureCoord = aTextureCoord;
}
