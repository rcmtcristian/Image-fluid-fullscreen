uniform float time;
uniform float uProgress;
uniform vec2 uTextureSize;
uniform sampler2D uTexture;
varying vec2 vUv;

varying vec2 vSize;


// Overall, this function is used to adjust the UV coordinates of a texture so that it is properly mapped onto a quad with a given size. The textureSize parameter represents the size of the texture, while the quadSize parameter represents the size of the quad. The function calculates the aspect ratios of these two sizes and scales the UV coordinates accordingly to ensure that the texture is properly mapped onto the quad.
vec2 getUV(vec2 uv, vec2 textureSize, vec2 quadSize){
  vec2 tempUV = uv - vec2(0.5);
// Subtract 0.5 from the uv parameter and store the result in a variable called tempUV. uv is a vec2 representing the current UV coordinates of a texture.
  float quadAspect = quadSize.x / quadSize.y;
  // Calculate the aspect ratio of the quadSize parameter by dividing its width (quadSize.x) by its height (quadSize.y). Store the result in a variable called quadAspect.
  float textureAspect = textureSize.x / textureSize.y;
  // Calculate the aspect ratio of the textureSize parameter by dividing its width (textureSize.x) by its height (textureSize.y). Store the result in a variable called textureAspect.
  if(quadAspect < textureAspect){
    tempUV = tempUV*vec2(quadAspect/textureAspect,1.);
  } else {
    tempUV = tempUV*vec2(1.,textureAspect/quadAspect);
  }
// Check if the quadAspect is less than the textureAspect. If it is, scale the tempUV by a vec2 with its x component set to quadAspect/textureAspect and its y component set to 1.0. Otherwise, scale the tempUV by a vec2 with its x component set to 1.0 and its y component set to textureAspect/quadAspect.
// This scaling is being performed to ensure that the texture is scaled properly to the quad.
  tempUV += vec2(0.5);
  return tempUV;
  }
// Add 0.5 to the tempUV and store the result back in tempUV. This is being done to shift the texture coordinates so that they are centered in the quad.
void main() {
// Return the final tempUV value as the result of the function.
  vec2 correctUV = getUV(vUv, uTextureSize, vSize);
  vec4 image = texture(uTexture, correctUV);
  gl_FragColor = vec4(vUv,0., 1.);
  gl_FragColor = image;

  // gl_FragColor = mix(image, gl_FragColor, uProgress);

  // gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}