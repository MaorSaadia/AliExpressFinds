import { Metadata } from "next";
import { LayoutGrid } from "lucide-react";

import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  getProductsByCategorySlug,
} from "@/sanity/lib/client";
import ProductGrid from "@/components/product/ProductGrid";
import { Breadcrumbs } from "@/components/ui/breadcrumb";

type PageProps = {
  params: Promise<{
    slug: string;
    subcategorySlug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, subcategorySlug } = await params;

  const [category, subcategory] = await Promise.all([
    getCategoryBySlug(slug),
    getSubcategoryBySlug(slug, subcategorySlug),
  ]);

  const categoryName = category?.title || slug.replace(/-/g, " ");
  const subcategoryName =
    subcategory?.title || subcategorySlug.replace(/-/g, " ");

  const formattedCategoryName =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  const formattedSubcategoryName =
    subcategoryName.charAt(0).toUpperCase() + subcategoryName.slice(1);

  const title = `${formattedSubcategoryName}`;
  const description = `קנה ${formattedSubcategoryName} ${formattedCategoryName} מובילים ממוכרי AliExpress המובילים.`;

  return {
    title,
    description,
    openGraph: {
      title: `${formattedSubcategoryName} ${formattedCategoryName} - מבצעי AliExpress`,
      description,
      type: "website",
    },
  };
}

const SubcategoryPage = async ({ params }: PageProps) => {
  const { slug, subcategorySlug } = await params;

  const [category, subcategory, products] = await Promise.all([
    getCategoryBySlug(slug),
    getSubcategoryBySlug(slug, subcategorySlug),
    getProductsByCategorySlug(slug, subcategorySlug),
  ]);

  if (!category || !subcategory) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">קטגוריה או תת-קטגוריה לא נמצאו.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-stone-800">
      <div className="container mx-auto px-3 p-3">
        <Breadcrumbs
          items={[
            { label: category.title || "", href: `/category/${slug}` },
            { label: subcategory.title || "", href: "#", current: true },
          ]}
        />
      </div>
      <div className="bg-gradient-to-l from-orange-50 to-red-50 dark:from-orange-800 dark:to-red-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center gap-2 text-3xl text-gray-500 dark:text-gray-300">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 capitalize">
                {subcategory.title}
              </h1>
            </div>
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

      {/* אזור מוצרים */}
      <section className="container mx-auto px-4 py-6">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="flex items-center justify-center py-8 text-center">
            <div className="flex flex-col items-center space-y-2">
              <LayoutGrid className="h-6 w-6 text-orange-500" />
              <p className="text-gray-500">
                אין מוצרים זמינים בתת-קטגוריה זו עדיין.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default SubcategoryPage;
