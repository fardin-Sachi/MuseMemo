export const metadata = {
  title: "MuseMemo - Blog",
  description: "Memoirs of creativity, one muse at a time.",
  icons: {
    icon: "/logo.svg"
  },
};

export default function BlogpageLayout({ children }) {
  return (
      <div className="">
        {children}
      </div>
  );
}
