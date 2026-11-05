import { FiFilter, FiPackage } from "react-icons/fi";
import ProductCard from "./ProductCard";

export default function ProductList({
  products,
  category,
  setCategory,
  sort,
  setSort,
  onEdit,
  onDelete,
}) {
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <section>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-bold text-white">All Products</h3>
          <p className="mt-1 text-sm text-slate-400">
            Manage your store inventory
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-3">
            <FiFilter className="text-slate-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent py-3 text-sm text-white outline-none"
            >
              {categories.map((item) => (
                <option key={item} value={item} className="bg-slate-900">
                  {item}
                </option>
              ))}
            </select>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
          >
            <option value="default">Default Sorting</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="stock">Stock: High to Low</option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-slate-900 py-20 text-center">
          <FiPackage className="mx-auto text-5xl text-slate-600" />
          <h3 className="mt-4 font-semibold text-white">No products found</h3>
          <p className="mt-2 text-sm text-slate-400">
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
