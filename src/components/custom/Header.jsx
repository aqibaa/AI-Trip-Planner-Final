
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/context/AuthContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { FcGoogle } from "react-icons/fc";
import { IoReorderThreeOutline } from "react-icons/io5";


function Header() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const GetUserProfile = (tokeninfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokeninfo?.access_token}`,
        Accept: 'Application/json',
      }
    }).then((resp) => {
      login(resp.data);
    });
  };



  return (
    <>
      <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div class="flex-1 md:flex md:items-center md:gap-12">
              <Link to="/">
                <img src="/logo.svg" alt="Logo" />
              </Link>
            </div>

            <nav aria-label="Global" class="hidden md:block">
              {user ? (
                <div className='flex items-center gap-3'>
                  <Link to="/create-trip">
                    <Button variant='outline' className="rounded-full">+ More Trips</Button>
                  </Link>
                  <Link to="/my-trips">
                    <Button variant='outline' className="rounded-full">My Trips</Button>
                  </Link>
                  <Link to="/favorites">
                    <Button variant='outline' className="rounded-full">Favorites</Button>
                  </Link>
                  <Popover>
                    <PopoverTrigger asChild>
                      <img src={user.picture} className='h-[35px] w-[35px] rounded-full cursor-pointer' alt="User profile" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="w-full text-left justify-start"
                      >
                        Logout
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Sign In</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="flex justify-center">
                        <img src="/logo.svg" alt="LOGO" />
                      </DialogTitle>
                      <DialogDescription className="text-center">
                        <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                        <p className="mt-2">Sign in to the App with Google authentication securely.</p>
                        <Button
                          className="w-full mt-5 p-6 text-base flex gap-4 items-center"
                          onClick={() => googleLogin()}
                        >
                          <FcGoogle className='h-7 w-7' />
                          Sign In With Google
                        </Button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              )}
            </nav>
            <div className="flex items-center gap-4">
              <div className="block md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-sm">
                      <IoReorderThreeOutline className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>
                        <img src="/logo.svg" alt="Logo" />
                      </SheetTitle>
                    </SheetHeader>
                    <div className="">
                      {user ? (
                        // --- Mobile menu jab user logged in ho ---
                        <div className="flex flex-col">
                          <div className="flex flex-col justify-center items-center gap-3 border-b pb-4">
                            <img src={user.picture} className='h-15 w-15 rounded-full' alt="User profile" />
                            <div className='text-center'>
                              <p className="font-semibold">{user.given_name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        <SheetClose asChild className='px-5 mt-8 '>
                            <Link to="/create-trip">
                              <Button variant='ghost' className=" w-full block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-black">+ New Trip</Button>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild className='px-5 mt-3'>
                            <Link to="/my-trips">
                              <Button variant='ghost' className=" w-full block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-black">My Trips</Button>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild className='px-5 mt-3 border-b pb-9'>
                            <Link to="/favorites">
                              <Button variant='ghost' className="w-full block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-black">Favorites</Button>
                            </Link>
                          </SheetClose >
                          <Button onClick={handleLogout} variant="destructive" className="mt-8 sm:w-[315px] w-[220px] block rounded-lg bg-black mx-auto py-2 text-sm font-medium text-white">Logout</Button>
                        </div>
                      ) : (
                        // --- Mobile menu jab user logged out ho ---
                        <div className="text-center border-t">
                          <h2 className='font-bold text-lg mt-7 '>Sign In With Google</h2>
                          <p className="mt-2 text-gray-500">Sign in to unlock all features.</p>
                          <Button
                            className="w-[210px] sm:w-[250px] mt-5 p-6 gap-4 "
                            onClick={() => googleLogin()}
                          >
                            <FcGoogle className='h-7 w-7' />
                            Sign In With Google
                          </Button>
                        </div>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
