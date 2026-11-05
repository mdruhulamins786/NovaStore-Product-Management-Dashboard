import { FiGrid, FiPackage, FiBarChart2, FiBox } from "react-icons/fi";

const menus = [
  { name: "Overview", icon: FiGrid },
  { name: "Products", icon: FiPackage },
  { name: "Analytics", icon: FiBarChart2 },
  { name: "Inventory", icon: FiBox },
];

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-white/10 bg-slate-950 p-6 lg:block">
      <div className="mb-12 flex items-center gap-3">
        <div className="rounded-xl bg-violet-600 p-3">
          <FiBox className="text-2xl text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">NovaStore</h1>
          <p className="text-xs text-slate-400">Management System</p>
        </div>
      </div>

      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Menu
      </p>

      <nav className="space-y-2">
        {menus.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setActivePage(name)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
              activePage === name
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon size={19} />
            {name}
          </button>
        ))}
      </nav>

      <div className="mt-16 rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-600/20 to-indigo-600/10 p-5">
        <h3 className="font-semibold text-white">NovaStore Pro</h3>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          Manage your products and inventory from one place.
        </p>
      </div>
    </aside>
  );
}
