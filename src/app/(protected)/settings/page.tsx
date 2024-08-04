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
    <div className="p-4 bg-white/50 rounded-3xl h-full w-full overflow-auto">
      <div className="w-full bg-white/80 rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-semibold">Personal Info</h1>
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
      <div className="w-full mt-8 bg-white/80 rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-semibold">Appearance</h1>
        <p className="text-gray-500">
          Customize your <span className="font-bold">Jana AI</span> interface
        </p>
        <ThemeSwitcher userId={user?.id!} currentTheme={user?.publicMetadata?.theme} />
      </div>
    </div>
  );
};

export default SettingsPage;
