attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;
uniform float normScale;

varying vec4 vertex_pos;

void main() {
	gl_Position = uPMatrix * uMVMatrix * vec4((aVertexPosition.x + sin(timeFactor) + normScale), aVertexPosition.y, aVertexPosition.z, 1.0);

	vertex_pos = gl_Position;
}
