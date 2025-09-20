import { address, companyInfo, ProprietorInfo } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800">
      {/* Main multi-column link section */}
      {/* <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-6 border-b border-gray-200"> */}
        {/* Useful Links Column */}
        {/* <div>
          <h3 className="font-bold mb-4 text-black">Useful Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Blog</li>
            <li>Privacy</li>
            <li>Terms</li>
            <li>FAQs</li>
            <li>Security</li>
            <li>Contact</li>
            <li>Partner</li>
            <li>Franchise</li>
            <li>Seller</li>
            <li>Warehouse</li>
            <li>Deliver</li>
            <li>Resources</li>
            <li>Recipes</li>
            <li>Bistro</li>
            <li>District</li>
          </ul>
        </div> */}

        {/* Categories - Column 1 */}
        {/* <div>
          <h3 className="font-bold mb-4 text-black flex items-center gap-2">
            Categories
            <a href="#" className="text-green-600 text-sm hover:underline">see all</a>
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Vegetables & Fruits</li>
            <li>Cold Drinks & Juices</li>
            <li>Bakery & Biscuits</li>
            <li>Dry Fruits, Masala & Oil</li>
            <li>Paan Corner</li>
            <li>Pharma & Wellness</li>
            <li>Personal Care</li>
            <li>Beauty & Cosmetics</li>
            <li>Kitchen & Dining</li>
            <li>Books</li>
            <li>E-Gift Cards</li>
          </ul>
        </div> */}

        {/* Categories - Column 2 */}
        {/* <div>
          <ul className="space-y-2 text-sm text-gray-600 mt-10 md:mt-0">
            <li>Dairy & Breakfast</li>
            <li>Instant & Frozen Food</li>
            <li>Sweet Tooth</li>
            <li>Sauces & Spreads</li>
            <li>Organic & Premium</li>
            <li>Cleaning Essentials</li>
            <li>Ice Creams & Frozen Desserts</li>
            <li>Fashion & Accessories</li>
            <li>Electronics & Electricals</li>
            <li>Toys & Games</li>
            <li>Rakhi Gifts</li>
          </ul>
        </div> */}

        {/* Categories - Column 3 */}
        {/* <div>
          <ul className="space-y-2 text-sm text-gray-600 mt-10 md:mt-0">
            <li>Munchies</li>
            <li>Tea, Coffee & Health Drinks</li>
            <li>Atta, Rice & Dal</li>
            <li>Chicken, Meat & Fish</li>
            <li>Baby Care</li>
            <li>Home & Office</li>
            <li>Pet Care</li>
            <li>Magazines</li>
            <li>Stationery Needs</li>
            <li>Print Store</li>
          </ul>
        </div> */}
      {/* </div> */}

      {/* Bottom footer with copyright, app download, social icons */}
      <div className="bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left copyright */}
          <div className="text-xs text-gray-500 whitespace-nowrap">
            <h3 className="text-lg font-bold mb-2 text-black">Contact Us</h3>
          <p className="text-gray-600 font-semibold">{ProprietorInfo.name} {ProprietorInfo.contact}</p>

          </div>

          {/* Center download app */}
          <div className="flex items-center gap-4">
            <Link
              href="https://www.facebook.com/kbmasale/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:brightness-90 transition"
            >
              <Image
                unoptimized={true}
                src="/images/icons/facebook.png"
                alt="Facebook"
                width={30}
                height={30}
              />
            </Link>
            <Link
              href="https://www.instagram.com/kbmasale/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:brightness-90 transition"
            >
              <Image
                unoptimized={true}
                src="/images/icons/instagram.png"
                alt="Instagram"
                width={30}
                height={30}
              />
            </Link>
            {/* <span className="font-semibold text-gray-700">Download App</span>
            <a href="#" aria-label="Download on the Apple App Store">
              <Image
                unoptimized={true}
                src="/images/appstore.svg"
                alt="App Store"
                width={110}
                height={38}
                className="object-contain"
              />
            </a>
            <a href="#" aria-label="Get it on Google Play">
              <Image
                unoptimized={true}
                src="/images/googleplay.svg"
                alt="Google Play"
                width={130}
                height={38}
                className="object-contain"
              />
            </a> */}
          </div>

          {/* Right social icons */}
          <div className="flex space-x-4 mb-6">
             <Link
              href={"https://www.tradeindia.com/truststamp-member/KB-MASALE-64554165/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                unoptimized={true}
                src="https://tiimg.tistatic.com/new_website1/general/trust_stamp/trusted-seller.svg"
                alt="Verified Seller icon"
                width={100}
                height={80}
                className="rounded"
              />
            </Link>
            
          </div>
        </div>
      </div>

      {/* Disclaimer below */}
      <div className="max-w-7xl mx-auto px-6 py-2 text-xs text-gray-500 leading-relaxed">
        <h3 className="text-lg font-bold text-black">Address</h3>
     {address.firstLine} {address.secondLine}
      </div>
    </footer>
  );
};

export default Footer;
