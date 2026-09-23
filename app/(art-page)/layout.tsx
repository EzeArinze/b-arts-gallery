import { SanityLive } from "@/sanity/lib/live";
import { Footer } from "./_components/footer";
import Navigation from "./_components/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"flex min-h-screen flex-col"}>
      <Navigation />
      {children}
      <Footer />
      <SanityLive />
    </div>
  );
}
