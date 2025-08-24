import { address,  companyInfo,  ProprietorInfo } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="wrapper mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold">{companyInfo.companyName}</h2>
          <p className="mt-2">GST : {companyInfo.gstNumber}</p>
          <div className="mt-4">
            <Link
              href={
                "https://www.tradeindia.com/truststamp-member/KB-MASALE-64554165/"
              }
            >
              <Image unoptimized={true}
                src="https://tiimg.tistatic.com/new_website1/general/trust_stamp/trusted-seller.svg"
                alt="Verified Seller icon"
                width={100}
                height={80}
              />
            </Link>
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-bold">Address</h3>
          <p className="mt-2">
            {address.firstLine}
            <br />
            {address.secondLine}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Additional Information */}
        <div>
          <h3 className="text-lg font-bold">Follow Us</h3>
          <div className="flex space-x-2 mt-2">
            <Link
              href="https://www.facebook.com/kbmasale/about/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image unoptimized={true}
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
            >
              <Image unoptimized={true}
                src="/images/icons/instagram.png"
                alt="Instagram"
                width={30}
                height={30}
              />
            </Link>
          </div>
          <h2 className="mt-2 text-lg font-bold">Contact Us</h2>
          <p className="">{ProprietorInfo.name}</p>
          <p className="">{ProprietorInfo.contact}</p>
            <p>24-aug</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

