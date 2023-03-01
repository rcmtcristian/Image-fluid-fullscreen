import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import fragment from "../shaders/fragment.glsl";
import vertex from "../shaders/vertex.glsl";
import testTexture from "../testTextureThree.jpg";
import * as dat from "dat.gui";
import gsap from "gsap";

// init
export default class sketch {
  constructor(options) {
    /* Setting the domElement to the container. */
    this.container = options.domElement;
    /* Setting the width of the container to the width of the container. */
    this.width = this.container.offsetWidth;
    /* Setting the height of the container to the height of the container. */
    this.height = this.container.offsetHeight;

    /* Creating a new camera with a field of view of 30 degrees, an aspect ratio of the width of the
container divided by the height of the container, a near clipping plane of 10 and a far clipping
plane of 1000. */
    this.camera = new THREE.PerspectiveCamera(
      30,
      this.width / this.height,
      10,
      1000
    );
    /* Setting the z position of the camera to 600. */
    this.camera.position.z = 600;

    /* Calculating the field of view of the camera. */
    this.camera.fov = (2 * Math.atan(this.height / 2 / 600) * 180) / Math.PI;
    /* Creating a new scene. */
    this.scene = new THREE.Scene();

    /* Creating a new renderer with antialiasing and alpha enabled. */
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    /* Setting the pixel ratio of the renderer to 2. */
    this.renderer.setPixelRatio(2);
    /* Appending the renderer to the container. */
    this.container.appendChild(this.renderer.domElement);
    /* Creating a new instance of the OrbitControls class. */
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;
    this.setupSettings();
    this.resize();
    this.addObjects();
    this.render();
    this.setUpResize();
  }

  /**
   * It creates a settings object, creates a dat.GUI object, and adds a slider to the dat.GUI object
   */
  setupSettings() {
    this.settings = {
      progress: 0,
    };
    this.gui = new dat.GUI();
    this.gui.add(this.settings, "progress", 0, 1, 0.001);
  }

  /**
   * It resizes the renderer and camera to match the size of the container
   */
  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  /**
   * It adds an event listener to the window object that calls the resize function when the window is
   * resized
   */
  setUpResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  /**
   * We create a plane, add a shader material to it, and then add it to the scene
   */
  addObjects() {
    // this.geometry = new THREE.SphereBufferGeometry(0.5, 130, 130);
    /* Creating a plane with a width of 300, a height of 300, 100 segments in the width direction, and 100
segments in the height direction. */
    this.geometry = new THREE.PlaneBufferGeometry(300, 300, 100, 100);

    /* Creating a new shader material with the uniforms, vertex shader, and fragment shader */
    this.material = new THREE.ShaderMaterial({
      // wireframe: true,
      uniforms: {
        time: { value: 1.0 },
        uProgress: { value: 0 },
        uTexture: { value: new THREE.TextureLoader().load(testTexture) },
        uTextureSize: { value: new THREE.Vector2(100, 100) },
        uCorners: { value: new THREE.Vector4(0, 0, 0, 0) },
        uResolution: { value: new THREE.Vector2(this.width, this.height) },
        uQuadSize: { value: new THREE.Vector2(300, 300) },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    /* Creating a timeline using gsap that is animating the uCorners uniform of the shader material. */
    this.tl = gsap
      .timeline()
      .to(this.material.uniforms.uCorners.value, {
        x: 1,
        duration: 1,
      })
      .to(
        this.material.uniforms.uCorners.value,
        {
          y: 1,
          duration: 1,
        },
        0.2
      )
      .to(
        this.material.uniforms.uCorners.value,
        {
          z: 1,
          duration: 1,
        },
        0.4
      )
      .to(
        this.material.uniforms.uCorners.value,
        {
          w: 1,
          duration: 1,
        },
        0.6
      );
    /* Creating a new mesh with the geometry and material that we created. */

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
    this.mesh.position.x = 300;
    this.mesh.rotation.z = 0.5;
    // this.mesh.scale.set(2.5, 1, 1);
  }

  /**
   * We're updating the time variable, which is used in the shader, and we're also updating the progress
   * of the timeline
   */
  render() {
    this.time += 0.04;
    this.material.uniforms.time.value = this.time;
    // this.material.uniforms.uProgress.value = this.settings.progress;
    this.tl.progress(this.settings.progress);
    this.mesh.rotation.x = this.time / 2000;
    this.mesh.rotation.y = this.time / 1000;

    this.renderer.render(this.scene, this.camera);
    // console.log(this.time);
    requestAnimationFrame(this.render.bind(this));
  }
}

/* Creating a new instance of the sketch class and passing in the domElement as an argument. */
new sketch({
  domElement: document.getElementById("container"),
});

/**
 * We're using a lagging pointer to keep track of the first index of the longest sequence of numbers
 * @param numArray - an array of numbers
 * @returns The first index of the longest sequence of numbers in the array.
 */
function findingFirstIndexOfLongestSequenceOfNumbers(numArray) {
  let maxNumCounter = 0;
  let laggingPointer = 0;
  let firstIndexToBeFound = -1;
  for (let i = 1; i <= numArray.length; i++) {
    if (numArray[i] === numArray[laggingPointer]) {
      continue;
    } else {
      const distance = i - laggingPointer;
      if (distance > maxNumCounter) {
        maxNumCounter = distance;
        firstIndexToBeFound = laggingPointer;
      }
      laggingPointer = i;
    }
  }
  return firstIndexToBeFound;
}
/* It's logging the first index of the longest sequence of numbers in the array. */

console.log(
  findingFirstIndexOfLongestSequenceOfNumbers([1, 1, 1, 3, 3, 3, 3, 4, 4])
);
