import GuideShop from "../components/GuideShop";
import ProductList from "../components/ProductList";
import Partners from "../pages/Partners.jsx";
import Hero_image from "../assets/hero_image.png";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Team from "../assets/team/jinkee.jpg";

function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#F8FAFC]">
        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 lg:px-8">
          {/* Left Content */}
          <div className="relative z-10">
            <span className="mb-5 inline-flex rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
              HI!! MY NAME IS
            </span>

            <h1 className="max-w-xl text-5xl font-bold tracking-tight text-gray-950 md:text-6xl lg:text-7xl">
              JINKY PERNES
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
              DLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              nec enim consequat, consectetur nulla mollis, auctor mauris. Nunc
              tristique mauris enim, sed aliquam arcu tincidunt sit amet. Proin
              ornare sem metus, nec accumsan neque accumsan in. Interdum et
              malesuada fames ac ante ipsum primis in faucibus. Aenean arcu
              sapien, tristique eu malesuada a, auctor et turpis.
            </p>
            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
              Morbi sem ante, pellentesque in lectus a, accumsan aliquet nibh.
              Etiam vitae cursus velit, sit amet dapibus elit. Aenean sit amet
              eleifend ligula, sit amet semper mauris. Praesent at sapien a mi
              dignissim mollis eu non erat. Suspendisse potenti. Nunc semper
              vehicula arcu, vitae fermentum sem dignissim a. Fusce a sapien at
              urna viverra commodo in id neque. Pellentesque maximus dictum
              cursus. Morbi finibus a dolor sed eleifend. In suscipit sodales
              sollicitudin.
            </p>
          </div>

          {/* Right Image Area */}
          <div className="relative">
            <div className="absolute -left-6 top-10 h-32 w-32 rounded-full bg-orange-200 blur-3xl" />
            <div className="absolute bottom-10 right-0 h-40 w-40 rounded-full bg-blue-200 blur-3xl" />

            <div className="relative mx-auto max-w-md rounded-[2rem] bg-white p-4 shadow-2xl md:max-w-lg">
              <div className="overflow-hidden rounded-[1.5rem] bg-gray-100">
                <img
                  src={Team}
                  alt="Featured ecommerce product"
                  className="h-[480px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="pointer-events-none absolute right-0 top-0 -z-0 h-72 w-72 rounded-full bg-gray-200/60 blur-3xl" />
      </section>
    </>
  );
}

export default Hero;
