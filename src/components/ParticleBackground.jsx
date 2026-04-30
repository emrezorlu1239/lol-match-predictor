import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: "#C89B3C",
            },
            move: {
              direction: "top",
              enable: true,
              outModes: {
                default: "out",
              },
              random: false,
              speed: 0.4,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60, // 60 on desktop as requested
            },
            opacity: {
              value: 0.12,
            },
            shape: {
              type: "polygon",
              options: {
                polygon: {
                  sides: 6 // hexagonal
                }
              }
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default ParticleBackground;
