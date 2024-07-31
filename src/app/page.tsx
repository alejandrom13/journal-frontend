import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "react-day-picker";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      hola bienvenido al inicio, click en iniciar sesion
      <SignedOut>
        <SignInButton fallbackRedirectUrl={"/home"}>
        Iniciar Sesión
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton></UserButton>
      </SignedIn>
    </main>
  );
}
