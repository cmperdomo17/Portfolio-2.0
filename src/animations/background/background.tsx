import Particles from "@/animations/particles/particles.jsx";

export default function AnimatedBackground() {
  return (
    <div className="absolute h-full w-full inset-0 -z-10">
      <Particles
        particleColors={["#02C3BD", "#02C3BD"]}
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
