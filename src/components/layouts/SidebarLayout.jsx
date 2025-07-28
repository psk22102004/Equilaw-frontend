import React , {useEffect ,useContext} from 'react';
import Sidebar from '../Sidebar';
import MenuBar from '../HomePage Components/Menubar';
import { authContext } from '@/contexts/AuthContext';
import { Outlet } from 'react-router-dom';

const SidebarLayout = () => {
    const {verifyUser} = useContext(authContext);
    useEffect(
        ()=>{
            verifyUser();
            console.log("SidebarLayout mounted");
        } , []
    )
    return (
        <div className='flex w-full h-screen'>
            <div className='hidden md:flex'>
                <Sidebar />
            </div>
            <div className="md:hidden">
                <MenuBar />
            </div>
            <div className='flex-1 w-full overflow-auto'>
                <Outlet />
            </div>
        </div>
    );
};

export default SidebarLayout;
