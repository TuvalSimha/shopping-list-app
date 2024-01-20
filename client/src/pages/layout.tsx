import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-black flex flex-col justify-between h-screen">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
