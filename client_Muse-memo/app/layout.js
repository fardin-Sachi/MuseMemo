import { Geist, Geist_Mono, PT_Serif_Caption, Poppins, Merriweather, Open_Sans, Cardo } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '800', '900']
});

const pT_Serif_Caption = PT_Serif_Caption({
  variable: "--font-PT_Serif_Caption",
  subsets: ["latin"],
  weight: '400',
});

const merriweather = Merriweather({
  variable: "--font-Merriweather",
  subsets: ["latin"],
  weight: ['300', '400', '700', '900']
});

const open_Sans = Open_Sans({
  variable: "--font-Open_Sans",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '800']
});

const cardo = Cardo({
  variable: "--font-Cardo",
  subsets: ["latin"],
  weight: ['400', '700']
});



export const metadata = {
  title: "MuseMemo",
  description: "Memoirs of creativity, one muse at a time.",
  icons: {
    icon: "/logo.svg"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
