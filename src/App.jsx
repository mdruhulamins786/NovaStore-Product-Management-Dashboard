import { useMemo, useState } from "react";
import { FiPlus, FiPackage } from "react-icons/fi";
import { toast } from "react-toastify";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Analytics from "./components/Analytics";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import ConfirmModal from "./components/ConfirmModal";
import Toast from "./components/Toast";

import useLocalStorage from "./hooks/useLocalStorage";
import initialProducts from "./data/products";

export default function App() {
  const [products, setProducts] = useLocalStorage(
    "novastore-products",
    initialProducts,
  );

  const [activePage, setActivePage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  // Search, Filter and Sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    result = result.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    );

    // Category filter
    if (category !== "All") {
      result = result.filter((product) => product.category === category);
    }

    // Inventory filter
    if (activePage === "Inventory") {
      result = result.filter((product) => product.stock < 10);
    }

    // Sorting
    switch (sort) {
      case "low-high":
        result.sort((a, b) => a.price - b.price);
        break;

      case "high-low":
        result.sort((a, b) => b.price - a.price);
        break;

      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "stock":
        result.sort((a, b) => b.stock - a.stock);
        break;

      default:
        break;
    }

    return result;
  }, [products, search, category, sort, activePage]);

  // Open Add Modal
  const handleAddClick = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Add / Update Product
  const handleSubmit = (formData) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...formData }
            : product,
        ),
      );

      toast.success("Product updated successfully!");
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
      };

      setProducts((prev) => [newProduct, ...prev]);

      toast.success("Product added successfully!");
    }

    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // Delete Product
  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));

    setDeleteProduct(null);
    toast.success("Product deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-[#080d1b] text-white">
      <Toast />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-[1600px]">
            {/* Header */}
            <Header
              search={search}
              setSearch={setSearch}
              activePage={activePage}
            />

            {/* Mobile Navigation */}
            <div className="mb-6 flex gap-2 overflow-x-auto lg:hidden">
              {["Overview", "Products", "Analytics", "Inventory"].map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setActivePage(page)}
                    className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm ${
                      activePage === page
                        ? "bg-violet-600 text-white"
                        : "bg-slate-900 text-slate-400"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            {/* Overview */}
            {activePage === "Overview" && (
              <div className="space-y-8">
                <Analytics products={products} />

                <ProductList
                  products={filteredProducts.slice(0, 6)}
                  category={category}
                  setCategory={setCategory}
                  sort={sort}
                  setSort={setSort}
                  onEdit={handleEdit}
                  onDelete={setDeleteProduct}
                />

                <button
                  onClick={() => setActivePage("Products")}
                  className="text-sm font-semibold text-violet-400 hover:text-violet-300"
                >
                  View all products →
                </button>
              </div>
            )}

            {/* Analytics */}
            {activePage === "Analytics" && <Analytics products={products} />}

            {/* Products */}
            {activePage === "Products" && (
              <ProductList
                products={filteredProducts}
                category={category}
                setCategory={setCategory}
                sort={sort}
                setSort={setSort}
                onEdit={handleEdit}
                onDelete={setDeleteProduct}
              />
            )}

            {/* Inventory */}
            {activePage === "Inventory" && (
              <div>
                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
                  <FiPackage className="text-2xl text-rose-400" />
                  <div>
                    <h3 className="font-semibold text-white">
                      Low Stock Inventory
                    </h3>
                    <p className="text-sm text-slate-400">
                      Products with fewer than 10 units remaining
                    </p>
                  </div>
                </div>

                <ProductList
                  products={filteredProducts}
                  category={category}
                  setCategory={setCategory}
                  sort={sort}
                  setSort={setSort}
                  onEdit={handleEdit}
                  onDelete={setDeleteProduct}
                />
              </div>
            )}

            {/* Floating Add Button */}
            <button
              onClick={handleAddClick}
              className="fixed bottom-7 right-7 z-30 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-4 font-semibold text-white shadow-xl shadow-violet-600/30 transition hover:-translate-y-1 hover:shadow-violet-600/50"
            >
              <FiPlus size={21} />
              <span>Add Product</span>
            </button>
          </div>
        </main>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <ProductModal
          key={editingProduct?.id ?? "new"}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          editingProduct={editingProduct}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        product={deleteProduct}
        onClose={() => setDeleteProduct(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
