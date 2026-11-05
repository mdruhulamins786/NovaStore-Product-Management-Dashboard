import { FiSearch, FiBell } from "react-icons/fi";

export default function Header({ search, setSearch, activePage }) {
  return (
    <header className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
      <div>
        <p className="text-sm text-slate-400">Welcome back</p>
        <h2 className="mt-1 text-2xl font-bold text-white">{activePage}</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-4 py-3">
          <FiSearch className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500 md:w-52"
          />
        </div>

        <button className="rounded-xl border border-white/10 bg-slate-900 p-3 text-slate-300 hover:bg-slate-800">
          <FiBell size={19} />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 font-bold text-white">
          RA
        </div>
      </div>
    </header>
  );
}
