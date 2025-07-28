import React, { useState } from "react";
import { useNavigate , Link } from 'react-router-dom';
function Navbar(props) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleClick = () => {
        navigate(props.buttonLink);
    }
    return (
        <div className="flex max-w-4xl mx-auto justify-between items-center align-middle py-3  md:py-2 px-9 mt-5  rounded-full shadow shadow-gray-400">
          {
            typeof(props.title)== "string" ? <img src={props.title} className="w-14 object-cover rounded-lg" alt="logo" /> : props.title 
          }
            
            <div className="flex gap-8 ">
                <ul className="hidden md:flex">
                    <li className="flex gap-8 py-2 font-semibold text-black">
                        <Link to={props.navLink1} className="hover:text-elebtn ">{props.navitem1}</Link>
                        <Link to={props.navLink2} className="hover:text-elebtn ">{props.navitem2}</Link>
                        <Link to={props.navLink3} className="hover:text-elebtn ">{props.navitem3}</Link>
                        <Link to={props.navLink4} className="hover:text-elebtn ">{props.navitem4}</Link>
                        <Link to={props.navLink5} className="hover:text-elebtn ">{props.navitem5}</Link>
                    </li>
                </ul>


                <div className="md:hidden " ><box-icon name='menu' color='#000aff' onClick={() => setIsMenuOpen(!isMenuOpen)} ></box-icon></div>
                <div className={`absolute md:hidden top-32 left-0 w-full bg-white flex flex-col p-3 shadow items-center gap-6 font-semibold transform transition-all duration-500 ease-in-out ${isMenuOpen ? "opacity-100" : "opacity-0"}`} >
                    <Link to={props.navLink1} className=" rounded p-2 hover:bg-blue-200 hover:text-black w-full">{props.navitem1}</Link>
                    <Link to={props.navLink2} className=" rounded p-2 hover:bg-blue-200  hover:text-black w-full">{props.navitem2}</Link>
                    <Link to={props.navLink3} className=" rounded p-2 hover:bg-blue-200  hover:text-black w-full">{props.navitem3}</Link>
                    <Link to={props.navLink4} className=" rounded p-2 hover:bg-blue-200  hover:text-black w-full">{props.navitem4}</Link>
                    <Link to={props.navLink5} className=" rounded p-2 hover:bg-blue-200  hover:text-black w-full">{props.navitem5}</Link>
                  
                    <Link to={props.buttonLink} onClick={handleClick} className="rounded p-2 bg-blue-400 hover:bg-blue-700 hover:text-white w-full ">{props.button}</Link>

                </div>
            </div>

            <button onClick={handleClick} className="bg-elebtn active:bg-blue-600 text-white hidden md:block py-2.5 px-5 font-semibold rounded-full shadow ">{props.button}</button>


        </div>
    );
}
export default Navbar;