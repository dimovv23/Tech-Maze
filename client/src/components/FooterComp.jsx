import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitterX } from "react-icons/bs";
import logoImg from "/logo.png";

const FooterComp = () => {
  return (
    <Footer
      container
      className="border-t-2 border-orange-300 rounded-t-lg dark:bg-stone-950 dark:border-orange-300"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link to="/" className="text-lg">
              <div className="flex items-center">
                <span className="mx-1">
                  <img src={logoImg} alt="logo" width={60} />
                </span>
                Tech Maze
              </div>
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
            by="Tech Maze"
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
