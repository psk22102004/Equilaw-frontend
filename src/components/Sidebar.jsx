import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Home, MessageSquare, FileText, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ hideSidebar }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isSmallSidebarCollapsed, setIsSmallSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  const smallSidebar = () => {
    setIsSmallSidebarCollapsed(!isSmallSidebarCollapsed);
  }

  return (
    <>

      <div
        className={` hidden md:flex absolute z-10 md:relative h-screen bg-blue-600/10 text-card-foreground p-4  flex-col transition-all duration-300 bg-blue-300 shadow-lg ${isSidebarCollapsed ? 'w-20' : 'w-52'}`}
      >
        <div className="flex  items-center mb-8 ">
          <Avatar className="h-12 w-12 bg-white">
            <AvatarImage src="/placeholder.svg?height=50&width=50" alt="User" />
            <AvatarFallback className="bg-black text-white">JD</AvatarFallback>
          </Avatar>
          {!isSidebarCollapsed && <span className="ml-3 font-medium">John Doe</span>}
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 items-center text-center ">
           <div className=''> {[
              { icon: <Home className="h-6 w-6 text-blue-600 bg-blue-600/20 p-1 rounded" />, label: 'Home', to: '/user' },
              { icon: <MessageSquare className="h-6 w-6 text-blue-600 bg-blue-600/20 p-1 rounded" />, label: 'AI Chat', to: '/user/AI' },
              { icon: <FileText className="h-6 w-6 text-blue-600 bg-blue-600/20 p-1 rounded" />, label: 'Case Search', to: '/user/vectorsearch' },
            ].map((item, index) => (
              <li key={index} className='items-center text-center '>
                <Link
                  to={item.to}
                  className={`flex items-center p-3 rounded-lg transition-colors duration-200  mb-2
                  ${isSidebarCollapsed ? 'justify-center ' : 'justify-start bg-white/50 border border-gray-100 shadow'} 
                  hover:bg-white hover:text-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
                >
                  {item.icon}
                  {!isSidebarCollapsed && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}</div>
          </ul>
        </nav>
        <Button
          variant="ghost"
          className="mt-auto flex items-center justify-center hover:border border-blue-500"
          onClick={() => console.log('Logout')}
        >
          <LogOut className="h-5 w-5" />
          {!isSidebarCollapsed && <span className="ml-3">Logout</span>}
        </Button>
        <Button variant="ghost" className="hidden md:block mt-4 hover:border border-blue-500" onClick={toggleSidebar}>
          {isSidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>


      </div>
    </>
  );
};

export default Sidebar;
