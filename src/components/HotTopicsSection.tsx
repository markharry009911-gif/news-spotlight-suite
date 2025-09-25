import NewsCard from "./NewsCard";
import heroSwimming from "@/assets/hero-swimming.jpg";
import trackRunning from "@/assets/track-running.jpg";

const HotTopicsSection = () => {
  const featuredNews = {
    title: "Massa tortor nibh nulla condimentum imperdiet scelerisque...",
    image: heroSwimming,
    time: "2 Hours Ago",
    source: "CNN Indonesia"
  };

  const sideNews = [
    {
      title: "Massa tortor nibh nulla condimentum imperdiet scelerisque...",
      image: trackRunning,
      time: "2 Hours Ago",
      source: "CNN Indonesia"
    }
  ];

  return (
    <section className="container px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Hot Topics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured News */}
        <div className="lg:col-span-2">
          <NewsCard
            title={featuredNews.title}
            image={featuredNews.image}
            time={featuredNews.time}
            source={featuredNews.source}
            isHighlight={true}
            size="large"
          />
        </div>

        {/* Side News */}
        <div className="space-y-6">
          {sideNews.map((news, index) => (
            <NewsCard
              key={index}
              title={news.title}
              image={news.image}
              time={news.time}
              source={news.source}
              isHighlight={true}
              size="medium"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotTopicsSection;