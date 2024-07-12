import Navbar from "@/components/Navbar";
import SessionControl from "@/components/SessionControl";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionControl>
      <header>
        <Navbar />
      </header>
      <main className="md:container">{children}</main>
    </SessionControl>
  );
}
