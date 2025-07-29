import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Contact2Icon, HomeIcon, LucideContact } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Navbar(props) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    navigate(props.buttonLink);
  };

  return (
    <div className="flex justify-between items-center mx-auto mt-5 px-6 py-3 md:py-2 rounded-full shadow shadow-gray-300 bg-white">
      {typeof props.title === "string" ? (
        <img src={props.title} className="w-24 object-cover rounded-lg" alt="logo" />
      ) : (
        props.title
      )}

      <div className="flex gap-6 items-center">
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 font-semibold text-gray-800">
          <li>
            <Link to={props.navLink1} className="flex items-center gap-2 hover:text-blue-700 transition">
              <HomeIcon className="w-5 h-5 text-blue-700 bg-blue-100 p-1 rounded" />
              {props.navitem1}
            </Link>
          </li>
          <li>
            <Link to={props.navLink2} className="flex items-center gap-2 hover:text-blue-700 transition">
              <InfoCircledIcon className="w-5 h-5 text-blue-700 bg-blue-100 p-1 rounded" />
              {props.navitem2}
            </Link>
          </li>
          <li>
            <Link to={props.navLink4} className="flex items-center gap-2 hover:text-blue-700 transition">
              <LucideContact className="w-5 h-5 text-blue-700 bg-blue-100 p-1 rounded" />
              {props.navitem4}
            </Link>
          </li>
        </ul>

        {/* Hamburger Menu Button */}
        <div className="md:hidden">
          <box-icon
            name="menu"
            color="#1d4ed8"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ cursor: "pointer" }}
          ></box-icon>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute md:hidden top-24 left-0 w-full bg-white shadow-md rounded-b-lg z-10 transition-all duration-300 ease-in-out transform ${
            isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center py-4 gap-4 font-semibold text-gray-800">
            <Link to={props.navLink1} className="w-full text-center py-2 hover:bg-blue-50">{props.navitem1}</Link>
            <Link to={props.navLink2} className="w-full text-center py-2 hover:bg-blue-50">{props.navitem2}</Link>
            <Link to={props.navLink3} className="w-full text-center py-2 hover:bg-blue-50">{props.navitem3}</Link>
            <Link to={props.navLink4} className="w-full text-center py-2 hover:bg-blue-50">{props.navitem4}</Link>
            <Link to={props.navLink5} className="w-full text-center py-2 hover:bg-blue-50">{props.navitem5}</Link>
            <Link
              to={props.buttonLink}
              onClick={handleClick}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded transition"
            >
              {props.button}
            </Link>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleClick}
          className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 rounded-full font-semibold shadow transition"
        >
          {props.button}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
