uniform float time;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uQuadSize;
uniform vec4 uCorners;
varying vec2 vSize;


varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 defaultState = modelMatrix*vec4(position,1.0);
  vec4 fullScreenState = vec4(position,1.0);
  fullScreenState.x *= uResolution.x/uQuadSize.x;
  fullScreenState.y *= uResolution.y/uQuadSize.y;
  float cornersProgress = mix(
  mix(uCorners.x, uCorners.y,uv.x),
  mix(uCorners.z, uCorners.w,uv.x),
  uv.y);

  //  float cornersProgress = mix(
  // mix(uCorners.x, uCorners.y,uv.x),
  // mix(uCorners.z, uCorners.w,uv.x),
  // uv.y+0.90*time/100.0);

  vec4 finalState = mix(defaultState, fullScreenState, cornersProgress);
  
  vSize = mix(uQuadSize, uResolution, uProgress);
  gl_Position = projectionMatrix * viewMatrix * finalState;
}