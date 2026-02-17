/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        tubePixel: {
          "0%,100%": { transform: "translate(0px,0px)" },
          "25%": { transform: "translate(1px,0px)" },
          "50%": { transform: "translate(0px,1px)" },
          "75%": { transform: "translate(-1px,0px)" }
        },
        tubeSpin3d: {
          "0%": { transform: "rotateX(-14deg) rotateY(0deg) rotateZ(0deg)" },
          "25%": { transform: "rotateX(-14deg) rotateY(90deg) rotateZ(1deg)" },
          "50%": { transform: "rotateX(-14deg) rotateY(180deg) rotateZ(0deg)" },
          "75%": { transform: "rotateX(-14deg) rotateY(270deg) rotateZ(-1deg)" },
          "100%": { transform: "rotateX(-14deg) rotateY(360deg) rotateZ(0deg)" }
        },
        sticksPixel: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-2px)" }
        },
        tubeSoft: {
          "0%,100%": { transform: "rotate(-2deg) translateY(0)" },
          "50%": { transform: "rotate(2deg) translateY(1px)" }
        },
        sticksSoft: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" }
        },
        popUp: {
          "0%": { transform: "translate(-50%, 0px)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translate(-50%, -30px)", opacity: "1" }
        }
      },
      animation: {
        tubePixel: "tubePixel 0.18s steps(2) infinite",
        tubeSpin3d: "tubeSpin3d 1.35s linear infinite",
        sticksPixel: "sticksPixel 0.22s steps(2) infinite",
        tubeSoft: "tubeSoft 0.75s ease-in-out infinite",
        sticksSoft: "sticksSoft 0.35s ease-in-out infinite",
        popUp: "popUp 0.45s ease-out forwards"
      }
    }
  },
  plugins: []
};
