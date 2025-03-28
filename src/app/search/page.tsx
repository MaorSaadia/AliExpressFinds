import { Search } from "lucide-react";

import { searchProducts } from "@/sanity/lib/client";
import ProductGrid from "@/components/product/ProductGrid";

type SearchPageProps = { searchParams: Promise<{ query: string }> };

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { query } = await searchParams;
  const products = await searchProducts(query);

  return (
    <div className="min-h-screen bg-white dark:bg-stone-800">
      {/* Compact Header Section */}
      <div className="bg-gradient-to-l from-orange-50 to-red-50 dark:from-orange-800 dark:to-red-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-lg text-gray-600 dark:text-gray-200">
              &quot;תוצאות חיפוש עבור &quot;{query}
            </h1>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                <span className="text-sm font-medium text-orange-600">
                  {products.length}
                </span>
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-100">
                מוצרים שנמצאו
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-6">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="flex items-center justify-center py-8 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Search className="h-6 w-6 text-orange-500" />
              <p className="text-gray-500">
                לא נמצאו מוצרים. נסה מילות חיפוש אחרות.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchPage;
