import { getAllProducts } from "@/sanity/lib/client";
import AllProducts from "@/components/product/AllProducts";

export const metadata = {
  title: "כל המציאות",
  description: "עיין בקולקציה המלאה שלנו מוצרים ורנדיים מאליאקספרס",
};

const AllProductsPage = async () => {
  const products = await getAllProducts();

  return <AllProducts products={products} />;
};

export default AllProductsPage;
