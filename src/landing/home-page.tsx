"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const HomePageLanding = () => {
  const router = useRouter();
  const { user } = useUser();

  return (
    <div className="h-dvh">
      <div className="">
        <header className="absolute inset-x-0 top-0 z-10 w-full ">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex-shrink-0">
                <a href="#" title="" className="flex">
                  <img className="w-auto h-8" src="/logo/logo.svg" alt="" />
                </a>
              </div>

              <div className="lg:flex lg:items-center lg:justify-end lg:space-x-6 sm:ml-auto">
                {user ? (
                  <Button
                    title=""
                    className="inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-semibold transition-all duration-200  rounded-lg"
                    role="button"
                    onClick={() => {
                      window.location.href = "/home";
                    }}
                  >
                    Go to Dashboard
                    <ArrowRight className="h-4 ml-2"></ArrowRight>
                  </Button>
                ) : (
                  <Button
                    title=""
                    className="inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-semibold transition-all duration-200  rounded-lg"
                    role="button"
                    onClick={() => {
                      router.push("/auth/login");
                    }}
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        <section className="relative lg:min-h-[1000px] pt-24 pb-10 sm:pt-32 sm:pb-16 lg:pb-24 ">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-20">
            <div className="max-w-xl mx-auto text-center">
              <h1 className="text-4xl font-bold sm:text-6xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#468BF4]">
                  Transform Your Day into <span>Insightful</span> Stories
                </span>
              </h1>
              <p className="mt-5 text-base text-black/80 sm:text-xl">
                Effortlessly capture your daily activities and unlock meaningful
                insights with <span className="font-semibold">Janna</span>.
              </p>

              {!user && (
                <div className="mt-8">
                  <Button
                    title=""
                    className="inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-semibold transition-all duration-200  rounded-lg"
                    role="button"
                    onClick={() => {
                      router.push("/auth/register");
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default HomePageLanding;
