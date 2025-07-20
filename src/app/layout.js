import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Blogify",
  description: "Modern Blogging App with Login & Vlog Features",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-4">{children}</main>
      </body>
    </html>
  );
}
