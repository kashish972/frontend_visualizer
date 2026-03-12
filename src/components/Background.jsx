import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function Particles() {
  const ref = useRef();

  const count = 5000;
  const particles = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    particles[i] = (Math.random() - 0.5) * 25; // bigger spread
  }

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#38bdf8"
        size={0.08}   // bigger particles
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

const Background3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8] }} // camera further
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <Particles />
    </Canvas>
  );
};

export default Background3D;