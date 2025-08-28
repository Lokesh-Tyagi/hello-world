import SearchHero from '@/components/search/SearchHero';
import UpcomingEvents from '@/components/upcomingEvents/UpcomingEvents';
import PopularCities from "@/components/popularCities/PopularCities";
import Journals from "@/components/journals/Journals";
import VideoCard from "@/components/videoCard/VideoCard";
import Categories from "@/components/categories/Categories";
import TopRatedVenues from "@/components/topRatedVenues/TopRatedVenues";
import Testimonials from "@/components/testimonials/Testimonials";
import JurnalPanel from "@/components/jurnalPanel/JurnalPanel";

export default function Home() {
  return (
    <main>
      <SearchHero />
      <UpcomingEvents />
      <PopularCities />
      <Journals />
      <VideoCard />
      <Categories />
      <TopRatedVenues />
      <Testimonials />
      <JurnalPanel />
      {/* <PromotionsEvents /> */}
    </main>
  );
} 