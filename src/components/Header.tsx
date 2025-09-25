import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-news-dark text-news-dark-foreground px-3 py-1 text-sm font-bold">
              Sport
            </div>
            <span className="text-lg font-semibold">News</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-sm font-medium hover:text-news-accent transition-colors">
            Home
          </a>
          <a href="/admin" className="text-sm font-medium hover:text-news-accent transition-colors">
            Admin
          </a>
          <a href="#" className="text-sm font-medium hover:text-news-accent transition-colors">
            Sports
          </a>
          <a href="#" className="text-sm font-medium hover:text-news-accent transition-colors">
            Latest
          </a>
          <a href="#" className="text-sm font-medium hover:text-news-accent transition-colors">
            Categories
          </a>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;