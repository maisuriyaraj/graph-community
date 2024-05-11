"use client";
import Image from "next/image";
import Header from "./components/header";
import img from '../../public/home-back.jpg'
export default function Home() {
  return (
    <main className="min-h-screen">
        <Header />
        <div className={"w-full"} id="hero_section" >
            <Image src={img} alt="back" />
        </div>
    </main>
  );
}
