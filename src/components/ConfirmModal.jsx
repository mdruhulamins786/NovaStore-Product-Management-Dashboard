import { FiAlertTriangle, FiX } from "react-icons/fi";

export default function ConfirmModal({ product, onClose, onConfirm }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-slate-900 p-7 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400">
          <FiAlertTriangle size={30} />
        </div>

        <h3 className="mt-5 text-xl font-bold text-white">Delete Product?</h3>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-white">{product.title}</span>?
          This action cannot be undone.
        </p>

        <div className="mt-7 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/10 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(product.id)}
            className="flex-1 rounded-xl bg-rose-600 py-3 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Delete
          </button>
        </div>

        <button onClick={onClose} className="absolute" aria-label="Close">
          <FiX className="hidden" />
        </button>
      </div>
    </div>
  );
}
