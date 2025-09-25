import NewsCard from "./NewsCard";
import tennisMatch from "@/assets/tennis-match.jpg";
import cyclingRace from "@/assets/cycling-race.jpg";
import trackRunning from "@/assets/track-running.jpg";

const LatestNewsSection = () => {
  const latestNews = [
    {
      title: "News Title Lorem Ipsum Dolor Sit Amet",
      image: tennisMatch,
      time: "1 Hour Ago",
      source: "CNN Indonesia"
    },
    {
      title: "News Title Lorem Ipsum Dolor Sit Amet",
      image: cyclingRace,
      time: "3 Hours Ago",
      source: "CNN Indonesia"
    },
    {
      title: "News Title Lorem Ipsum Dolor Sit Amet",
      image: trackRunning,
      time: "1 Hour Ago",
      source: "CNN Indonesia"
    },
    {
      title: "News Title Lorem Ipsum Dolor Sit Amet",
      image: tennisMatch,
      time: "1 Hour Ago",
      source: "CNN Indonesia"
    },
    {
      title: "News Title Lorem Ipsum Dolor Sit Amet",
      image: cyclingRace,
      time: "3 Hours Ago",
      source: "CNN Indonesia"
    },
    {
      title: "News Title Lorem Ipsum Dolor Sit Amet",
      image: trackRunning,
      time: "1 Hour Ago",
      source: "CNN Indonesia"
    }
  ];

  return (
    <section className="container px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Latest News</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestNews.map((news, index) => (
          <NewsCard
            key={index}
            title={news.title}
            image={news.image}
            time={news.time}
            source={news.source}
            size="medium"
          />
        ))}
      </div>
    </section>
  );
};

export default LatestNewsSection;