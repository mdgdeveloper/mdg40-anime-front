import AnimeRanking from "@/components/anime/AnimeRanking";
import AnimeSearch from "@/components/anime/AnimeSearch";
import HeadLine from "@/components/headers/HeadLine";
import HeadTitle from "@/components/headers/HeadTitle";

export default function Home() {
  return (
    <section className="w-10/12 py-10">
      <AnimeRanking />
      <AnimeSearch />
    </section>
  );
}
