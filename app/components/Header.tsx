'use client'
import React, { FC, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import NavItems from '../utils/NavItems';
import ThemeSwitcher from '../utils/ThemeSwitcher';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi';
import CustomModel from '../utils/CustomModel';
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { useSelector } from 'react-redux';
import Image from 'next/image';
import avt1 from '../../public/assets/avt1.jpeg';
import { useSession } from 'next-auth/react';
import { useSocialAuthMutation, useLogOutQuery } from '@/redux/features/auth/authApi';
import { toast } from 'react-hot-toast';
import {useLoadUserQuery} from "@/redux/features/api/apiSlice"
type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    route: string;
    setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const { user } = useSelector((state: any) => state.auth);
    const {data:userData , isLoading , refetch} = useLoadUserQuery(undefined , {})
    const { data } = useSession();
    const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
    const [logout, setLogout] = useState(false);
    const {} = useLogOutQuery(undefined, {
        skip: !logout ? true : false
    });

    useEffect(() => {
        if(!isLoading){
            if(!userData){
                if(data){
                    socialAuth({ email: data.user?.email, name: data.user?.name, avatar: data.user?.image });
                    refetch()
                }
            }

        
        
        if (data === null) {
            if(isSuccess){
                toast.success("Login successfully");

            }
        }
        if (data === null && !isLoading && !userData ) {
            setLogout(true);
        }
    }
    }, [data,userData , isLoading]);

    const handleScroll = useCallback(() => {
        setActive(window.scrollY > 85);
    }, []);

    useEffect(() => {
        const debouncedHandleScroll = debounce(handleScroll, 50);
        window.addEventListener("scroll", debouncedHandleScroll);
        return () => {
            window.removeEventListener("scroll", debouncedHandleScroll);
        };
    }, [handleScroll]);

    const debounce = (func: Function, wait: number) => {
        let timeout: NodeJS.Timeout;
        return (...args: any) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            setOpenSidebar(false);
        }
    };

    return (
        <div className="w-full dark:bg-slate-900">
            <div className={`
                ${active ? 
                    'dark:bg-opacity-50 dark:bg-gradient-to-black dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500' 
                    : 
                    'w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow'
                }
            `}>
                <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full dark:bg-slate-900 bg-white">
                    <div className="w-full h-[80px] flex items-center justify-between p-3">
                        <div>
                            <Link href="/" className="text-[25px] font-Poppins font-medium text-black dark:text-white">
                                Garuda Institute
                            </Link>
                        </div>
                        <div className='flex items-center'>
                            <NavItems activeItem={activeItem} isMobile={false} />
                            <ThemeSwitcher />
                            <div className='800px:hidden mr-2'>
                                <HiOutlineMenuAlt3 size={25} className='cursor-pointer dark:text-white text-black' onClick={() => setOpenSidebar(true)} />
                            </div>
                            {userData ? (
                                <Link href="/profile">
                                    <Image
                                        className="rounded-full w-[40px] h-[40px] border-[3px] border-[#37a39a] cursor-pointer"
                                        src={userData?.avatar || user.avatar?.url || avt1 }
                                        alt="user avatar"
                                        width={120}
                                        height={120}
                                        style={{ border: activeItem === 5 ? "2px solid #37a39a" : "border-[3px] border-[#37a39a]" }}
                                    />
                                </Link>
                            ) : (
                                <HiOutlineUserCircle size={25} className='cursor-pointer dark:text-white text-black' onClick={() => setOpen(true)} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {openSidebar && (
                <div className='fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]' onClick={handleClose} id="screen">
                    <div className="w-[70%] fixed z-[99999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                        <NavItems activeItem={activeItem} isMobile={true} />
                        {/* <HiOutlineUserCircle size={25} className='cursor-pointer mi-5 my-2 text-black dark:text-white' onClick={() => setOpen(true)} /> */}
                        <br />
                        <br />
                        <br />
                        <p className='text-[16px] px-2 pl-5 text-black dark:text-white  flex bottom-0 drak:text-white '>
                            copyright © 2024 Garuda Institute
                        </p>
                    </div>
                </div>
            )}
            {route === "Sign-Up" && open && (
                <CustomModel open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={SignUp} />
            )}
            {route === "Login" && open && (
                <CustomModel open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={Login} refetch={refetch} />
            )}
            {route === "Verification" && open && (
                <CustomModel open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={Verification} />
            )}
        </div>
    );
};

export default Header;
