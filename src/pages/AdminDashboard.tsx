import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image_url: "",
    source: "Admin",
    is_highlight: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('news')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "News article published successfully!",
      });

      // Reset form
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        image_url: "",
        source: "Admin",
        is_highlight: false
      });

    } catch (error) {
      console.error('Error publishing news:', error);
      toast({
        title: "Error",
        description: "Failed to publish news article",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b px-4 py-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to News Portal</span>
            </Button>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        <Tabs defaultValue="post-news" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="post-news">Post News</TabsTrigger>
            <TabsTrigger value="manage-news">Manage News</TabsTrigger>
          </TabsList>
          
          <TabsContent value="post-news" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Publish New Article</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter news title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="source">Source</Label>
                      <Input
                        id="source"
                        placeholder="News source"
                        value={formData.source}
                        onChange={(e) => handleInputChange('source', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief summary of the article"
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image_url}
                      onChange={(e) => handleInputChange('image_url', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      placeholder="Write the full article content here..."
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      rows={10}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="highlight"
                      checked={formData.is_highlight}
                      onCheckedChange={(checked) => handleInputChange('is_highlight', checked)}
                    />
                    <Label htmlFor="highlight" className="font-medium">
                      Mark as Highlight News
                    </Label>
                  </div>

                  <Button type="submit" disabled={isSubmitting} size="lg">
                    {isSubmitting ? "Publishing..." : "Publish Article"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="manage-news">
            <Card>
              <CardHeader>
                <CardTitle>Manage Published Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">News management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;