import { Inter } from "next/font/google";
import "@/lib/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Good Morning [User Name]",
  description: "",
};

export default function DashBoardLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
