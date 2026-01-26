import GothifHero from "@/components/hero";
import { getHomePageQuery } from "@/data/get-arts";
import { HOME_QUERYResult } from "@/sanity.types";
import NewDrops from "./_components/new-drops";
import CollectionSection from "./_components/collections";
import AboutArtist from "./_components/about-me";

export default async function Home() {
  const data: HOME_QUERYResult = await getHomePageQuery();

  const { HomePageCollections, newPostImages } = data;

  return (
    <div className="w-full">
      <GothifHero />
      <NewDrops newPostImage={newPostImages} />
      <CollectionSection homePageCollection={HomePageCollections} />
      <AboutArtist />
      {/*<Footer />*/}
    </div>
  );
}
