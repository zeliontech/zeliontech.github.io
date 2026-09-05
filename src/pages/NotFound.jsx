import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

// 404 on the approved light system, inside the normal page shell so a visitor
// who mistypes a link keeps the navigation and the footer.

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main" className="pt-20">
        <section className="section">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-2xl py-10 text-center lg:py-24">
              <p className="eyebrow">404</p>
              <h1 className="display mt-5">
                This page has <span className="metal-gradient">moved on.</span>
              </h1>
              <p className="lede mx-auto mt-6 max-w-xl">
                There is nothing at <code className="rounded-md bg-muted px-1.5 py-0.5 text-[0.9em] text-foreground">{pathname}</code>.
                The links below lead back to solid ground.
              </p>
              <div className="zev-rise mt-9 flex flex-col justify-center gap-3 sm:flex-row" style={{ animationDelay: "0.1s" }}>
                <Button asChild size="lg">
                  <Link to="/">
                    Back to the homepage
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/zev">Explore ZEV</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
