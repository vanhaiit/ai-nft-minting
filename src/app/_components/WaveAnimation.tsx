"use client";
import { useWindowSize } from "@/hooks";
import React, { ComponentPropsWithRef, useEffect, useRef } from "react";
import { twJoin } from "tailwind-merge";
import {
  BufferAttribute,
  Clock,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";

interface MyThreeJsComponentProps extends ComponentPropsWithRef<"canvas"> {
  width: number;
  height: number;
}

const WaveAnimation: React.FC<MyThreeJsComponentProps> = ({
  width,
  height,
}) => {
  const { windowHeight } = useWindowSize();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scene = useRef<Scene>(new Scene());
  const camera = useRef<PerspectiveCamera>();
  const renderer = useRef<WebGLRenderer>();
  const clock = useRef<Clock>(new Clock());

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const sizes = { width, height };

      camera.current = new PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        100
      );
      camera.current.position.z = 10;
      camera.current.position.y = 1.1;
      camera.current.position.x = 0;
      scene.current.add(camera.current);

      const planeGeometry = new PlaneGeometry(20, 20, 150, 150);
      const planeMaterial = new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uElevation: { value: 0.482 },
        },
        vertexShader: `
                    uniform float uTime;
                    uniform float uElevation;

                    attribute float aSize;

                    varying float vPositionY;
                    varying float vPositionZ;

                    void main() {
                        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                        modelPosition.y = sin(modelPosition.x - uTime) * sin(modelPosition.z * 0.6 + uTime) * uElevation;

                        vec4 viewPosition = viewMatrix * modelPosition;
                        gl_Position = projectionMatrix * viewPosition;

                        gl_PointSize = 2.0 * aSize;
                        gl_PointSize *= ( 1.0 / - viewPosition.z );

                        vPositionY = modelPosition.y;
                        vPositionZ = modelPosition.z;
                    }
                `,
        fragmentShader: `
                    varying float vPositionY;
                    varying float vPositionZ;

                    void main() {
                        float strength = (vPositionY + 0.25) * 0.3;
                        gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
                    }
                `,
        transparent: true,
      });
      const planeSizesArray = new Float32Array(
        planeGeometry.attributes.position.count
      );
      for (let i = 0; i < planeSizesArray.length; i++) {
        planeSizesArray[i] = Math.random() * 4.0;
      }
      planeGeometry.setAttribute(
        "aSize",
        new BufferAttribute(planeSizesArray, 1)
      );

      const plane = new Points(planeGeometry, planeMaterial);
      plane.rotation.x = -Math.PI * 0.4;
      scene.current.add(plane);

      renderer.current = new WebGLRenderer({
        canvas: canvas,
      });
      renderer.current.setSize(sizes.width, sizes.height);
      renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const animate = () => {
        const elapsedTime = clock.current.getElapsedTime();

        if (planeMaterial.uniforms) {
          planeMaterial.uniforms.uTime.value = elapsedTime;
        }

        if (renderer.current && camera.current) {
          renderer.current.render(scene.current, camera.current);
        }

        // Call animate again on the next frame
        window.requestAnimationFrame(animate);
      };

      animate();
    }
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={twJoin(
        "webgl -z-50",
        windowHeight >= 1080 ? "-mt-64" : "-mt-40"
      )}
    />
  );
};

export default WaveAnimation;
