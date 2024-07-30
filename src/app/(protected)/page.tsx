"use client";
import ThemeSwitcher from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/nextjs";

const HomePage = () => {
  const clerk = useUser();
  return (
    <>
      <ThemeSwitcher />
      <h1>Home Page</h1>
      {clerk.user?.firstName} {clerk.user?.lastName?.slice(0, 1)}.
      <Button className="bg-primary-1">Hello</Button>
    </>
  );
};

export default HomePage;
