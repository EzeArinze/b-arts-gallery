import { getHomePageQuery } from "@/data/get-arts";
import GothifHero from "../components/hero";
import AboutArtist from "./_components/about-me";
import CollectionSection from "./_components/collections";
import { Footer } from "./_components/footer";
import NewDrops from "./_components/new-drops";

export default async function Home() {
  const data = await getHomePageQuery();

  return (
    <div className="h-screen w-full">
      <GothifHero />
      <NewDrops />
      <CollectionSection />
      <AboutArtist />
      <Footer />
    </div>
  );
}
