import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewsCard from "./NewsCard";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  title: string;
  image_url: string;
  published_at: string;
  source: string;
}

const HotTopicsSection = () => {
  const [hotTopics, setHotTopics] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotTopics = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('id, title, image_url, published_at, source')
          .eq('is_highlight', true)
          .order('published_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setHotTopics(data || []);
      } catch (error) {
        console.error('Error fetching hot topics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotTopics();
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const handleNewsClick = (id: string) => {
    navigate(`/news/${id}`);
  };

  if (loading) {
    return (
      <section className="container px-4 py-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Hot Topics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="animate-pulse">
              <div className="aspect-[16/9] bg-muted rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-muted rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Hot Topics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured News */}
        {hotTopics.length > 0 && (
          <div className="lg:col-span-2">
            <div onClick={() => handleNewsClick(hotTopics[0].id)} className="cursor-pointer">
              <NewsCard
                title={hotTopics[0].title}
                image={hotTopics[0].image_url}
                time={formatTimeAgo(hotTopics[0].published_at)}
                source={hotTopics[0].source}
                isHighlight={true}
                size="large"
              />
            </div>
          </div>
        )}

        {/* Side News */}
        <div className="space-y-6">
          {hotTopics.slice(1).map((news) => (
            <div key={news.id} onClick={() => handleNewsClick(news.id)} className="cursor-pointer">
              <NewsCard
                title={news.title}
                image={news.image_url}
                time={formatTimeAgo(news.published_at)}
                source={news.source}
                isHighlight={true}
                size="medium"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotTopicsSection;