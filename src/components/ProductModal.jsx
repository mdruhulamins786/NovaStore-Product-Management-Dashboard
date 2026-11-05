import { useState } from "react";
import { FiX, FiSave } from "react-icons/fi";

const initialForm = {
  title: "",
  category: "Electronics",
  price: "",
  stock: "",
};

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  editingProduct,
}) {
  const [form, setForm] = useState(() =>
    editingProduct
      ? {
          title: editingProduct.title,
          category: editingProduct.category,
          price: editingProduct.price,
          stock: editingProduct.stock,
        }
      : initialForm,
  );

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      Number(form.price) <= 0 ||
      Number(form.stock) < 0
    ) {
      return;
    }

    onSubmit({
      ...form,
      title: form.title.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Enter your product information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-800 p-2 text-slate-300 hover:bg-slate-700"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Product Name
            </label>
            <input
              required
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-violet-500"
            >
              {["Electronics", "Fashion", "Accessories", "Home"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Price ($)
              </label>
              <input
                required
                type="number"
                min="0.01"
                step="0.01"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="99"
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Stock</label>
              <input
                required
                type="number"
                min="0"
                step="1"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="20"
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/10 py-3 font-medium text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700"
            >
              <FiSave />
              {editingProduct ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
