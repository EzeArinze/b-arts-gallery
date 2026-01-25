import { getHomePageQuery } from "@/data/get-arts";
import GothifHero from "../components/hero";
import AboutArtist from "./_components/about-me";
import CollectionSection from "./_components/collections";
import { Footer } from "./_components/footer";
import NewDrops from "./_components/new-drops";
import { HOME_QUERYResult } from "@/sanity.types";

export default async function Home() {
  const data: HOME_QUERYResult = await getHomePageQuery();

  const { HomePageCollections, newPostImages } = data;

  return (
    <div className="h-screen w-full">
      <GothifHero />
      <NewDrops newPostImage={newPostImages} />
      <CollectionSection homePageCollection={HomePageCollections} />
      <AboutArtist />
      <Footer />
    </div>
  );
}
