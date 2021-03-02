import React from "react";
import * as THREE from "three";
import styled from "styled-components";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
/* eslint import/no-webpack-loader-syntax: off */
import * as fragment from "!raw-loader!glslify-loader!./shader/fragment.glsl";
/* eslint import/no-webpack-loader-syntax: off */
import * as vertex from "!raw-loader!glslify-loader!./shader/vertex.glsl";


import water from "../../../../assets/img/water.jpeg";
const Threejs = () => {
  React.useEffect(() => {
    ThreejsStart();
  }, []);

   const ThreejsStart = () => {
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "blue" });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    const sizes = {
      width: 800,
      height: 600,
    };

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;
    scene.add(camera);

    const canvas = document.querySelector(".webgl");
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize( sizes.width,sizes.height);
    
    gsap.to(mesh.position,{
      x:2,
      duration:1,
      delay:1
    });


    // let time = Date.now();
    const clock = new THREE.Clock();
    const tick = () =>{
      // timer set framerate
      // const currentTime = Date.now();
      // const deltaTime = currentTime - time;
      // time = currentTime;

      const elapsedTime = clock.getElapsedTime();
    
      // update Object
      // mesh.rotation.x = elapsedTime * Math.PI * 2;
      // mesh.position.y = Math.sin(elapsedTime);
      // mesh.position.x = Math.cos(elapsedTime);

      camera.position.x = Math.sin(elapsedTime); // cos and sin tape sur google c'est comme le easing
      camera.position.y = Math.cos(elapsedTime);
      camera.lookAt(mesh.position);
      // render
     renderer.render(scene,camera);
     window.requestAnimationFrame(tick);
    }

    tick();
  };
  return (
    <Container>
      <canvas className="webgl"></canvas>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
export default Threejs;
