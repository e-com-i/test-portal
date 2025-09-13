"use client";
import Header from "@/components/shared/header";
import Footer from "@/components/footer";
import CartBar from "@/components/shared/cart/CartBar";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex h-screen flex-col">
        <Header />
        <main className="flex-1 wrapper">{children}</main>
        <CartBar />
        <Footer />
      </div>
    );
  }