import { Inter } from "next/font/google";
import "@/lib/db";
import SideNav from "./components/sidenav";
import './global.css';
import MainHeader from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Good Morning [User Name]",
  description: "",
};

export default function DashBoardLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}><SideNav /><MainHeader />{children}</body>
    </html>
  );
}
