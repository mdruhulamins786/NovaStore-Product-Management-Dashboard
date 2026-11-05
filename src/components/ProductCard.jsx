import { FiEdit, FiTrash2, FiPackage, FiAlertCircle } from "react-icons/fi";

export default function ProductCard({ product, onEdit, onDelete }) {
  const lowStock = product.stock < 10;

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition hover:-translate-y-1 hover:border-violet-500/40">
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-violet-500/20 via-indigo-500/10 to-cyan-500/10">
        <FiPackage className="text-6xl text-violet-300/70 transition group-hover:scale-110" />
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
            {product.category}
          </span>

          <span
            className={`flex items-center gap-1 text-xs ${
              lowStock ? "text-rose-400" : "text-emerald-400"
            }`}
          >
            {lowStock && <FiAlertCircle />}
            {lowStock ? "Low Stock" : "In Stock"}
          </span>
        </div>

        <h3 className="truncate font-semibold text-white">{product.title}</h3>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-white">
              ${Number(product.price).toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Stock: {product.stock}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(product)}
              title="Edit product"
              className="rounded-lg bg-blue-500/10 p-2.5 text-blue-400 transition hover:bg-blue-500 hover:text-white"
            >
              <FiEdit size={17} />
            </button>

            <button
              onClick={() => onDelete(product)}
              title="Delete product"
              className="rounded-lg bg-rose-500/10 p-2.5 text-rose-400 transition hover:bg-rose-500 hover:text-white"
            >
              <FiTrash2 size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
