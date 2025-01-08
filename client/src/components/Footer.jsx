import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container footer_section ">
          <div className="footer_left">
            <p>
              LifeBahn — A community dedicated to preserving memories, legacies,
              and connections for a better tomorrow.
            </p>
            <div className="action_links">
              <div className="menu_actions">
                <Link to={"/"}>Home</Link>
                <Link to={"/about-us"}>About Us</Link>
                <Link to={"/user-guide"}>User Guide</Link>
                <Link to={"/profile/life-legacy"}>Life Legacy</Link>
              </div>
              <div className="social_links">
                <Link to={"/"}>Facebook</Link>
                <Link to={"/"}>Tweeter</Link>
                <Link to={"/"}>Instagram </Link>
                <Link to={"/"}>Linkedin</Link>
              </div>
            </div>
          </div>
          <div className="footer_right">
            <p>📧 Email: support@lifebahn.com</p>
            <p>📞 Phone: +123-456-7890</p>
            <p>📍 Address: USA</p>
            <Link to={"/"}> Privacy Policy</Link>
            <Link to={"/"}> Terms of Service</Link>
          </div>
        </div>
        <p className="footer_text">© 2025 Company, Inc</p>
      </footer>
    </>
  );
};

export default Footer;
