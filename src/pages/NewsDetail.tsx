import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Header from "@/components/Header";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  source: string;
  is_highlight: boolean;
  published_at: string;
}

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
        toast({
          title: "Error",
          description: "Failed to load news article",
          variant: "destructive"
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-muted rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const timeAgo = (dateString: string) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to News</span>
        </Button>

        <article className="space-y-6">
          {/* Header */}
          <header className="space-y-4">
            {news.is_highlight && (
              <Badge className="bg-news-highlight text-news-dark">
                HOT TOPIC
              </Badge>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {news.title}
            </h1>
            
            {news.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {news.excerpt}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b pb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(news.published_at)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{timeAgo(news.published_at)}</span>
              </div>
              
              <span className="font-medium text-foreground">{news.source}</span>
            </div>
          </header>

          {/* Featured Image */}
          {news.image_url && (
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-base leading-relaxed">
              {news.content}
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t pt-6 mt-8">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Published by <span className="font-medium">{news.source}</span>
              </p>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                Read More Articles
              </Button>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default NewsDetail;