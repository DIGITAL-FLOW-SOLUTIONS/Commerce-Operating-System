import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useListShowcaseStores } from "@workspace/api-client-react";

export default function Templates() {
  const { data: stores } = useListShowcaseStores();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO title="Store Templates & Showcase | Sokoa" description="Browse beautiful store templates and see what other merchants are building on Sokoa." />
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-6">Store Showcase</h1>
          <p className="text-xl text-muted-foreground">
            Get inspired by real businesses running on Sokoa. Our templates are designed to convert visitors into buyers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores?.map((store, i) => (
            <div key={store.id} className="group cursor-pointer">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-muted relative border">
                {/* Fallback to generated images for the first 3, then colored blocks for rest to avoid broken images */}
                {i < 3 ? (
                  <img src={`/images/store-${i + 1}.png`} alt={store.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center text-4xl">{store.coverEmoji}</div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-foreground">{store.name}</h3>
                <p className="text-muted-foreground">{store.category} • {store.city}</p>
                <p className="text-sm text-muted-foreground mt-2 italic">"{store.tagline}"</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
