import Particles from "@/animations/particles/particles.jsx";

export default function AnimatedBackground() {
  return (
    <div className="absolute h-full w-full inset-0 z-[-1]">
      <Particles
        particleColors={["#fff"]}
        className=""
        particleCount={200}
        particleSpread={12}
        speed={0.05}
        particleBaseSize={120}
        moveParticlesOnHover={false}
        alphaParticles={true}
        disableRotation={false}
      />
    </div>
  );
}
