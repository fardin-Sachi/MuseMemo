import Navbar from "@/component/navbar";

export const metadata = {
  title: "MuseMemo - Homepage",
  description: "Memoirs of creativity, one muse at a time.",
  icons: {
    icon: "/logo.svg"
  },
};

export default function HomeLayout({ children }) {
  return (
      <div className="bg-[#4bba5b]/50 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
      </div>
  );
}
