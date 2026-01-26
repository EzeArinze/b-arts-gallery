import { SanityLive } from "@/sanity/lib/live";
import { Footer } from "./_components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"flex min-h-screen flex-col"}>
      {children}
      <Footer />
      <SanityLive />
    </div>
  );
}
