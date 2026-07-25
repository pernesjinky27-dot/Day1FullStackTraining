import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#13295B] text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Left */}
          <div>
            {/* Logo */}
            <div className="border-2 border-white inline-block px-3 py-1 text-2xl font-bold tracking-widest">
              LIFT
            </div>

            {/* Social */}
            <div className="flex gap-6 text-sm mt-8 text-gray-300">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">Pinterest</a>
            </div>

            {/* Newsletter */}
            <div className="mt-14">
              <h3 className="text-2xl font-semibold mb-8">
                Wir halten dich auf dem laufenden
              </h3>

              <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                <input
                  type="email"
                  placeholder="Deine E-Mail Adresse"
                  className="bg-transparent outline-none w-full placeholder:text-gray-300"
                />

                <button>
                  <FaArrowUp className="rotate-45 text-xl" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-5">Quick links</h4>

            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#">So gehts</a>
              </li>
              <li>
                <a href="#">Erfahrung</a>
              </li>
              <li>
                <a href="#">Aligner</a>
              </li>
              <li>
                <a href="#">Preise</a>
              </li>
              <li>
                <a href="#">Standorte</a>
              </li>
            </ul>
          </div>

          {/* News */}
          <div>
            <h4 className="font-semibold mb-5">Newz</h4>

            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Lift Media</a>
              </li>
              <li>
                <a href="#">Offene Stellen</a>
              </li>
              <li>
                <a href="#">Presse kit</a>
              </li>
            </ul>
          </div>

          {/* Treatment */}
          <div>
            <h4 className="font-semibold mb-5">Behandlung</h4>

            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#">Gratis Termin</a>
              </li>
              <li>
                <a href="#">Freunde einladen</a>
              </li>
              <li>
                <a href="#">Patienteninformationen</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
          <p>© 2020 Lift Media. All rights reserved</p>

          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#">Datenschutz</a>
            <a href="#">Impressum</a>
            <a href="#">Cookie Policy</a>
            <a href="#">AGBs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
