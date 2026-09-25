"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import anime from "animejs";

const BLADE_COUNT = 7;
const CLOSED_ANGLE = -0.95;
const OPEN_ANGLE = -2.35;

function buildBladeGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.32);
  shape.lineTo(1.55, -0.1);
  shape.lineTo(1.55, 0.1);
  shape.lineTo(0, 0.32);
  shape.lineTo(0, -0.32);
  return new THREE.ExtrudeGeometry(shape, { depth: 0.05, bevelEnabled: false });
}

export default function Hero() {
  const mountRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      48,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, prefersReducedMotion ? 6.5 : 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const rigGroup = new THREE.Group();
    rigGroup.position.x = 1.1;
    scene.add(rigGroup);

    // Aperture blades, each swinging open from a pivot on the outer ring.
    const bladeGeometry = buildBladeGeometry();
    const bladeMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f4a4d,
      metalness: 0.4,
      roughness: 0.35,
      side: THREE.DoubleSide,
    });
    const bladeRotors = [];
    const radiusPivot = 1.05;

    for (let i = 0; i < BLADE_COUNT; i += 1) {
      const pivot = new THREE.Group();
      pivot.rotation.z = (i / BLADE_COUNT) * Math.PI * 2;
      rigGroup.add(pivot);

      const bladeRotor = new THREE.Group();
      bladeRotor.position.set(radiusPivot, 0, 0);
      bladeRotor.rotation.z = CLOSED_ANGLE;
      pivot.add(bladeRotor);

      const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
      blade.position.set(-radiusPivot * 0.58, 0, 0);
      bladeRotor.add(blade);

      bladeRotors.push(bladeRotor);
    }

    // Lens core, sitting behind the blades.
    const lensGeometry = new THREE.IcosahedronGeometry(0.85, 1);
    const lensMaterial = new THREE.MeshBasicMaterial({
      color: 0xe8c468,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    rigGroup.add(lens);

    // Out-of-focus bokeh field for depth, echoing the print flyer's lens shot.
    const bokehCount = 140;
    const bokehPositions = new Float32Array(bokehCount * 3);
    for (let i = 0; i < bokehCount; i += 1) {
      bokehPositions[i * 3] = (Math.random() - 0.5) * 14;
      bokehPositions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      bokehPositions[i * 3 + 2] = -4 - Math.random() * 6;
    }
    const bokehGeometry = new THREE.BufferGeometry();
    bokehGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(bokehPositions, 3)
    );
    const bokehMaterial = new THREE.PointsMaterial({
      color: 0x7fa5a3,
      size: 0.12,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    const bokeh = new THREE.Points(bokehGeometry, bokehMaterial);
    scene.add(bokeh);

    // Lighting: a cool ambient fill plus a red and a gold accent light.
    scene.add(new THREE.AmbientLight(0x1c5457, 0.7));
    const redLight = new THREE.PointLight(0xb3182a, 6, 12);
    redLight.position.set(2.5, 1.2, 3);
    scene.add(redLight);
    const goldLight = new THREE.PointLight(0xe8c468, 3, 12);
    goldLight.position.set(-2, -1, 2.5);
    scene.add(goldLight);

    let frameId;
    let scrollTilt = 0;
    const clock = new THREE.Clock();

    function animateFrame() {
      const delta = clock.getDelta();
      const progress = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--scroll-progress"
        ) || "0"
      );
      scrollTilt += (progress - scrollTilt) * 0.05;

      rigGroup.rotation.z += delta * 0.08;
      rigGroup.rotation.x = scrollTilt * 0.6;
      lens.rotation.y += delta * 0.25;
      lens.rotation.x += delta * 0.1;
      bokeh.rotation.y += delta * 0.01;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animateFrame);
    }
    frameId = requestAnimationFrame(animateFrame);

    function handleResize() {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    }
    window.addEventListener("resize", handleResize);

    // One orchestrated load-in: the iris opens, the lens fades in, the
    // camera dollies forward, and the headline letters settle into place.
    if (prefersReducedMotion) {
      bladeRotors.forEach((rotor) => {
        rotor.rotation.z = OPEN_ANGLE;
      });
      lensMaterial.opacity = 0.45;
    } else {
      const timeline = anime.timeline({ easing: "easeOutExpo" });
      bladeRotors.forEach((rotor, i) => {
        timeline.add(
          {
            targets: rotor.rotation,
            z: OPEN_ANGLE,
            duration: 1500,
          },
          i * 70
        );
      });
      timeline.add(
        { targets: lensMaterial, opacity: 0.45, duration: 1200 },
        200
      );
      timeline.add(
        { targets: camera.position, z: 6.5, duration: 1800 },
        0
      );
      if (headlineRef.current) {
        timeline.add(
          {
            targets: headlineRef.current.querySelectorAll(".hero-letter"),
            translateY: [46, 0],
            opacity: [0, 1],
            delay: anime.stagger(22),
            duration: 900,
          },
          300
        );
      }
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      bladeGeometry.dispose();
      bladeMaterial.dispose();
      lensGeometry.dispose();
      lensMaterial.dispose();
      bokehGeometry.dispose();
      bokehMaterial.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const lines = ["TomNow", "Studios"];

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-ink"
    >
      <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 px-6 pb-20 pt-40 md:px-12 md:pb-28">
        <p className="mb-4 font-display text-base italic text-signal md:text-lg">
          the future is now
        </p>
        <h1
          ref={headlineRef}
          className="font-display text-[15vw] font-medium leading-[0.92] text-paper md:text-[8.5vw]"
        >
          {lines.map((line) => (
            <span key={line} className="block overflow-hidden">
              {line.split("").map((char, i) => (
                <span
                  key={`${line}-${i}`}
                  className="hero-letter inline-block"
                  style={{ opacity: 0 }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="mt-8 max-w-md font-body text-base text-paper/75 md:text-lg">
          A Kenyan media house covering photography, live streaming and
          videography — for the day you only get to live once.
        </p>
      </div>
    </section>
  );
}
