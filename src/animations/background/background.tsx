import Particles from "@/animations/particles/particles.jsx";

export default function AnimatedBackground() {
  return (
    <div className="absolute h-full w-full inset-0 -z-10">
      <Particles
        particleColors={["#6c757d", "#6c757d"]}
        className=""
        particleCount={200}
        particleSpread={12}
        speed={0.07}
        particleBaseSize={150}
        moveParticlesOnHover={false}
        alphaParticles={true}
        disableRotation={false}
      />
    </div>
  );
}
