import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewsCard from "./NewsCard";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  title: string;
  image_url: string;
  published_at: string;
  source: string;
}

const LatestNewsSection = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchLatestNews = async () => {
      setLoading(true);
      try {
        // Get total count
        const { count } = await supabase
          .from('news')
          .select('*', { count: 'exact', head: true })
          .eq('is_highlight', false);

        const total = count || 0;
        setTotalPages(Math.ceil(total / itemsPerPage));

        // Get paginated data
        const { data, error } = await supabase
          .from('news')
          .select('id, title, image_url, published_at, source')
          .eq('is_highlight', false)
          .order('published_at', { ascending: false })
          .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

        if (error) throw error;
        setLatestNews(data || []);
      } catch (error) {
        console.error('Error fetching latest news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, [currentPage]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="container px-4 py-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/3] bg-muted rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Latest News</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestNews.map((news) => (
          <div key={news.id} onClick={() => handleNewsClick(news.id)} className="cursor-pointer">
            <NewsCard
              title={news.title}
              image={news.image_url}
              time={formatTimeAgo(news.published_at)}
              source={news.source}
              size="medium"
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
};

export default LatestNewsSection;