import { Link } from "react-router-dom";
import Logo from "../assets/images/logo/logo-washtop.png";

function Footer() {
  return (
    <footer className="px-4 divide-y divide-slate-500 bg-slate-700 text-gray-300">
      <div className="container flex flex-col justify-between items-center py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <Link
            rel="noopener noreferrer"
            to="/#"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white">
                <img className="h-8 w-auto" src={Logo} alt="" />
              </div>
              <span className="text-2xl font-semibold text-white">
                Washtop Laundry Express
              </span>
              <p className="text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                Dapatkan kualitas laundry terbaik hanya dari Kami. Kami hadir
                memberikan layanan yang Nyaman, Berkualitas, dan Cepat.
              </p>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-3">
          <div className="space-y-3">
            <h3 className="tracki uppercase font-bold text-gray-50 mb-3">
              Lokasi
            </h3>
            <a
              className="text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm hover:text-blue-500 transition-all ease-in-out"
              href="https://maps.app.goo.gl/hZ3m6FEWfknbRrBi6"
              target="_blank"
            >
              Jl. Nusa Indah No.21, Kaliuntu, Kecamatan Buleleng, Kabupaten
              Buleleng, Bali 81116
            </a>
          </div>
          <div className="space-y-3">
            <div className="uppercase font-bold text-gray-50">Kontak Kami</div>
            <div className="flex flex-col gap-1">
              <a
                rel="noopener noreferrer"
                href="https://wa.me/6282145555566/"
                target="_blank"
                title="WhatsApp"
                className="flex items-center p-1 hover:text-blue-500 transition-all ease-in-out"
              >
                <svg
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-5 h-5 fill-current"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path>
                </svg>
                <p className="pl-2 text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                  082145555566
                </p>
              </a>
              <a
                rel="noopener noreferrer"
                href="https://instagram.com/washtoplaundryexpress/"
                target="_blank"
                title="Instagram"
                className="flex items-center p-1 hover:text-blue-500 transition-all ease-in-out"
              >
                <svg
                  viewBox="0 0 25 25"
                  fill="currentColor"
                  className="w-5 h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  />
                  <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" />
                  <path
                    fillRule="evenodd"
                    d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                  />
                </svg>
                <p className="pl-2 text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                  washtoplaundryexpress
                </p>
              </a>
              <a
                rel="noopener noreferrer"
                href="mailto:washtoplaundryexpress@gmail.com"
                target="_blank"
                title="Email"
                className="flex items-center p-1 hover:text-blue-500 transition-all ease-in-out"
              >
                <svg
                  viewBox="0 0 600 600"
                  fill="currentColor"
                  className="ml-0.5 w-5 h-5 fill-current"
                  version="1.1"
                  id="_x32_"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M510.678,112.275c-2.308-11.626-7.463-22.265-14.662-31.054c-1.518-1.915-3.104-3.63-4.823-5.345
		c-12.755-12.818-30.657-20.814-50.214-20.814H71.021c-19.557,0-37.395,7.996-50.21,20.814c-1.715,1.715-3.301,3.43-4.823,5.345
		C8.785,90.009,3.63,100.649,1.386,112.275C0.464,116.762,0,121.399,0,126.087V385.92c0,9.968,2.114,19.55,5.884,28.203
		c3.497,8.26,8.653,15.734,14.926,22.001c1.59,1.586,3.169,3.044,4.892,4.494c12.286,10.175,28.145,16.32,45.319,16.32h369.958
		c17.18,0,33.108-6.145,45.323-16.384c1.718-1.386,3.305-2.844,4.891-4.43c6.27-6.267,11.425-13.741,14.994-22.001v-0.064
		c3.769-8.653,5.812-18.171,5.812-28.138V126.087C512,121.399,511.543,116.762,510.678,112.275z M46.509,101.571
		c6.345-6.338,14.866-10.175,24.512-10.175h369.958c9.646,0,18.242,3.837,24.512,10.175c1.122,1.129,2.179,2.387,3.112,3.637
		L274.696,274.203c-5.348,4.687-11.954,7.002-18.696,7.002c-6.674,0-13.276-2.315-18.695-7.002L43.472,105.136
		C44.33,103.886,45.387,102.7,46.509,101.571z M36.334,385.92V142.735L176.658,265.15L36.405,387.435
		C36.334,386.971,36.334,386.449,36.334,385.92z M440.979,420.597H71.021c-6.281,0-12.158-1.651-17.174-4.552l147.978-128.959
		l13.815,12.018c11.561,10.046,26.028,15.134,40.36,15.134c14.406,0,28.872-5.088,40.432-15.134l13.808-12.018l147.92,128.959
		C453.137,418.946,447.26,420.597,440.979,420.597z M475.666,385.92c0,0.529,0,1.051-0.068,1.515L335.346,265.221L475.666,142.8
		V385.92z"
                    />
                  </g>
                </svg>
                <p className="pl-2 text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                  washtoplaundryexpress@gmail.com
                </p>
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="tracki uppercase font-bold text-gray-50">HALAMAN</h3>
            <ul className="space-y-1 text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm">
              <li>
                <a
                  rel="noopener noreferrer"
                  href="/#"
                  className="hover:text-blue-500 transition-all ease-in-out"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="/#produk"
                  className="hover:text-blue-500 transition-all ease-in-out"
                >
                  Produk
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="/#keunggulan"
                  className="hover:text-blue-500 transition-all ease-in-out"
                >
                  Keunggulan
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="/#informasi"
                  className="hover:text-blue-500 transition-all ease-in-out"
                >
                  Informasi
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="/#testimoni"
                  className="hover:text-blue-500 transition-all ease-in-out"
                >
                  Testimoni
                </a>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-6 text-[11px] text-center text-gray-400">
        <p rel="noopener noreferrer">
          <a
            href="/"
            target="_blank"
            className="hover:text-blue-500 transition-all ease-in-out"
          >
            ©️ 2023 Washtop Laundry Express
          </a>{" "}
          |
          <a
            href="https://linktr.ee/washtoplaundryexpress"
            target="_blank"
            className="hover:text-blue-500 transition-all ease-in-out"
          >
            {" "}
            Linktree
          </a>{" "}
          | All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
