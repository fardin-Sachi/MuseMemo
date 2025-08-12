import Navbar from "@/component/navbar";

export const metadata = {
  title: "MuseMemo - User Page",
  description: "Memoirs of creativity, one muse at a time.",
  icons: {
    icon: "/logo.svg"
  },
};

export default function HomepageLayout({ children }) {
  return (
      <div className="bg-[#4bba5b]/50 h-screen">
        <Navbar />
        {children}
      </div>
  );
}
