export const metadata = {
  title: "MuseMemo - User Page",
  description: "Memoirs of creativity, one muse at a time.",
  icons: {
    icon: "/logo.svg"
  },
};

export default function UserLayout({ children }) {
  return (
      <div className="">
        {children}
      </div>
  );
}
