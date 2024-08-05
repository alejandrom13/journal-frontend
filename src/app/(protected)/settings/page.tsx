"use client";
import ThemeSwitcher from "@/components/theme-switcher";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const SettingsPage = () => {
  const { user } = useUser();
  return (
    <div className="  h-full w-full overflow-auto">
      <div className="flex flex-col gap-2 ">
        <h1 className=" text-3xl font-medium">Settings</h1>
        <p className="text-black/80 ">
          Manage your account settings and preferences
        </p>
      </div>
      <div className="w-full bg-white/50 rounded-2xl p-6 mt-8">
        <h1 className="text-2xl font-medium">Personal Info</h1>
        <p className="text-gray-500">Update your profile here</p>

        <div className="mt-6">
          <Image
            src={user?.imageUrl!}
            width={60}
            height={60}
            className="rounded-full"
            alt={""}
          />
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-row gap-4">
            <div className="w-full">
              <Label>First Name</Label>
              <Input placeholder="Name" value={user?.firstName!} disabled />
            </div>
            <div className="w-full">
              <Label>Last Name</Label>
              <Input placeholder="Name" value={user?.lastName!} disabled />
            </div>
          </div>

          <div className="w-full">
            <Label>Primary Email</Label>
            <Input
              placeholder="Email"
              value={user?.emailAddresses[0].emailAddress}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-8 bg-white/50 rounded-2xl p-6 ">
        <h1 className="text-2xl font-medium">Appearance</h1>
        <p className="text-gray-500">
          Customize your <span className="font-bold">Jana AI</span> interface
        </p>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default SettingsPage;
