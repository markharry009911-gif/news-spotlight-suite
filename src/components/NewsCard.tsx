import { Clock } from "lucide-react";

interface NewsCardProps {
  title: string;
  image: string;
  time: string;
  source: string;
  isHighlight?: boolean;
  size?: "small" | "medium" | "large";
}

const NewsCard = ({ title, image, time, source, isHighlight = false, size = "medium" }: NewsCardProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "aspect-[4/3]";
      case "large":
        return "aspect-[16/9] md:aspect-[21/9]";
      default:
        return "aspect-[4/3]";
    }
  };

  return (
    <article className={`group cursor-pointer ${size === "large" ? "col-span-full" : ""}`}>
      <div className="relative overflow-hidden rounded-lg bg-card shadow-sm hover:shadow-md transition-all duration-300">
        {/* Image Container */}
        <div className={`relative ${getSizeClasses()} overflow-hidden`}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {isHighlight && (
            <div className="absolute top-2 left-2 bg-news-highlight text-news-dark px-2 py-1 rounded text-xs font-semibold">
              HOT TOPIC
            </div>
          )}
          
          {size === "large" && (
            <div className="absolute inset-0 bg-gradient-to-t from-news-overlay to-transparent" />
          )}
        </div>

        {/* Content */}
        <div className={`p-4 ${size === "large" ? "md:absolute md:bottom-0 md:left-0 md:right-0 md:bg-transparent md:text-white" : ""}`}>
          <h3 className={`font-semibold leading-tight group-hover:text-news-accent transition-colors ${
            size === "large" ? "text-xl md:text-2xl mb-3" : "text-base mb-2"
          }`}>
            {title}
          </h3>
          
          <div className="flex items-center justify-between text-xs text-news-meta">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{time}</span>
            </div>
            <span className="font-medium">{source}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;