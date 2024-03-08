import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitterX } from "react-icons/bs";

const FooterComp = () => {
  return (
    <Footer container className="border-t-8 dark:border-cyan-900">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              Logo
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:gap-6">
            <div>
              <Footer.Title title="Information" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://georgi-dimovv.vercel.app/"
                  target="_blank"
                >
                  About us
                </Footer.Link>
                <Footer.Link href="https://github.com/dimovv23" target="_blank">
                  GitHub
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Tech World"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6  mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitterX} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComp;
