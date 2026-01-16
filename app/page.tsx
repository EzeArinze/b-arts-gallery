import GothifHero from "../components/hero";
import AboutArtist from "./_components/about-me";
import CollectionSection from "./_components/collections";
import NewDrops from "./_components/new-drops";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <GothifHero />
      <NewDrops />
      <CollectionSection />
      <AboutArtist />
    </div>
  );
}
