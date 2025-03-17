import { Metadata } from "next";
import ProductGrid from "@/components/product/ProductGrid";
import {
  getCategoryBySlug,
  getProductsByCategorySlug,
} from "@/sanity/lib/client";
import { LayoutGrid } from "lucide-react";

import { Breadcrumbs } from "@/components/ui/breadcrumb";

type CategoryPageProps = { params: Promise<{ slug: string }> };

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const categoryName = category?.title || slug.replace(/-/g, " ");
  const formattedCategoryName =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return {
    title: `${formattedCategoryName}`,
    description: `גלה מוצרים פופולריים בקטגוריה ${formattedCategoryName} מעלי אקספרס במחירים הטובים ביותר.`,
    openGraph: {
      title: `${formattedCategoryName} - מוצרים פופולריים מעלי אקספרס`,
      description: `קנה את המוצרים הטובים ביותר בקטגוריה ${formattedCategoryName} מעלי אקספרס.`,
      type: "website",
    },
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  // Use Promise.all with the cached data fetching
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategorySlug(slug),
  ]);

  return (
    <div className="min-h-screen dark:bg-stone-800" dir="rtl">
      {/* Add Breadcrumbs */}
      <div className="container mx-auto px-3 p-3">
        <div className="flex justify-end">
          <Breadcrumbs
            items={[
              {
                label: category?.title || slug.replace(/-/g, " "),
                href: "#",
                current: true,
              },
            ]}
            className="mr-0 ml-auto"
          />
        </div>
      </div>
      {/* Category Header */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-800 dark:to-red-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-lg text-gray-600 dark:text-gray-200 capitalize">
              {category?.title || slug.replace(/-/g, " ")}
            </h1>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                <span className="text-sm font-medium text-orange-600">
                  {products.length}
                </span>
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-100">
                מוצרים נמצאו
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
              <LayoutGrid className="h-6 w-6 text-orange-500" />
              <p className="text-gray-500">אין עדיין מוצרים בקטגוריה זו.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;
