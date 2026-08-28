import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCart } from "@/components/FloatingCart";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tereza-cakes.vercel.app"),
  title: {
    default: "Tereza Cakes — Confeitaria artesanal em Vila Velha, ES",
    template: "%s | Tereza Cakes",
  },
  description:
    "Bolos de encomenda, bolos caseiros e docinhos artesanais em Vila Velha, ES. Personalize seu bolo e finalize o pedido pelo WhatsApp.",
  keywords: [
    "confeitaria",
    "bolos de encomenda",
    "bolo personalizado",
    "docinhos",
    "Vila Velha",
    "Espírito Santo",
    "Tereza Cakes",
  ],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Tereza Cakes — Confeitaria artesanal",
    description:
      "Bolos de encomenda, bolos caseiros e docinhos artesanais em Vila Velha, ES.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingCart />
        </CartProvider>
      </body>
    </html>
  );
}
