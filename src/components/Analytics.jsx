import {
  FiPackage,
  FiDollarSign,
  FiTrendingUp,
  FiAlertTriangle,
} from "react-icons/fi";
import StatCard from "./StatCard";

export default function Analytics({ products }) {
  const totalProducts = products.length;

  const totalValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0,
  );

  const averagePrice = totalProducts
    ? products.reduce((total, product) => total + product.price, 0) /
      totalProducts
    : 0;

  const lowStock = products.filter((product) => product.stock < 10).length;

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <section className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={FiPackage}
          color="bg-violet-500/15 text-violet-400"
          subtitle="Products in your store"
        />

        <StatCard
          title="Inventory Value"
          value={`$${totalValue.toLocaleString()}`}
          icon={FiDollarSign}
          color="bg-emerald-500/15 text-emerald-400"
          subtitle="Total stock value"
        />

        <StatCard
          title="Average Price"
          value={`$${averagePrice.toFixed(2)}`}
          icon={FiTrendingUp}
          color="bg-blue-500/15 text-blue-400"
          subtitle="Average product price"
        />

        <StatCard
          title="Low Stock"
          value={lowStock}
          icon={FiAlertTriangle}
          color="bg-rose-500/15 text-rose-400"
          subtitle="Products below 10 units"
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
        <h3 className="mb-6 text-lg font-bold text-white">
          Category Distribution
        </h3>

        <div className="space-y-5">
          {categories.map((category) => {
            const count = products.filter(
              (product) => product.category === category,
            ).length;

            const percentage = totalProducts
              ? (count / totalProducts) * 100
              : 0;

            return (
              <div key={category}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-300">{category}</span>
                  <span className="text-slate-400">{count} products</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    style={{ width: `${percentage}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
