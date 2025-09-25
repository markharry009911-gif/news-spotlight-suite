import Header from "@/components/Header";
import HotTopicsSection from "@/components/HotTopicsSection";
import LatestNewsSection from "@/components/LatestNewsSection";

const NewsPortal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HotTopicsSection />
        <LatestNewsSection />
      </main>
    </div>
  );
};

export default NewsPortal;