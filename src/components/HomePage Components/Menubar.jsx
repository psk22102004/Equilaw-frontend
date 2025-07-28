import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Home, MessageSquare, FileText, LogOut } from 'lucide-react';

const MenuBar = () => {

    return (
        <div className="md:hidden absolute z-20 w-full bg-blue-300 text-card-foreground shadow-lg overflow-hidden">
            <div className="flex  justify-between items-center p-4">
                {/* Left section: Avatar and User Name */}
                <div className="flex items-center">
                    <Avatar className="h-7 w-7 bg-white">
                        <AvatarImage src="/placeholder.svg?height=50&width=50" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>

                </div>

                {/* Middle section: Menu Links */}
                <nav className="flex space-x-2">
                    {[
                        { icon: <Home className="h-5 w-5" />, to: '/user' },
                        { icon: <MessageSquare className="h-5 w-5" />, to: '/user/AI' },
                        { icon: <FileText className="h-5 w-5" />, to: '/user/vectorsearch' },
                    ].map((item, index) => (
                        <Link
                            key={index}
                            to={item.to}
                            className="flex items-center p-2 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
                        >
                            {item.icon}
                            <span className="ml-2">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Right section: Logout */}
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        className="hover:border border-blue-500"
                        onClick={() => console.log('Logout')}
                    >
                        <LogOut className="h-5 w-5" />

                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MenuBar;
