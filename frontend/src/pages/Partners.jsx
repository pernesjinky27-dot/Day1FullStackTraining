import React from "react";

// Import your partner logos
import kisko from "../assets/partners/kisko.png";
import jollibeat from "../assets/partners/jollibeat.png";
import malasme from "../assets/partners/malasme.png";
import mangsinakal from "../assets/partners/mangsinakal.png";
import nyek from "../assets/partners/nyek.png";
import puregreen from "../assets/partners/puregreen.png";

const partners = [kisko, jollibeat, malasme, mangsinakal, nyek, puregreen];

const Partner = () => {
  return (
    <section className="bg-[#0F2454] py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-white text-3xl font-bold mb-10">Our Partner</h2>

        <div className="relative overflow-hidden">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#0F2454] to-transparent z-10"></div>

          {/* Right Fade */}
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#0F2454] to-transparent z-10"></div>

          <div className="flex w-max animate-scroll gap-8">
            {[...partners, ...partners].map((logo, index) => (
              <div
                key={index}
                className="w-52 h-28 bg-white rounded-lg shadow-md flex items-center justify-center flex-shrink-0"
              >
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="w-32 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Partner;
