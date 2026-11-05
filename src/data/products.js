const templates = [
  {
    title: "Wireless Headphones",
    category: "Electronics",
    price: 89,
    stock: 25,
  },
  { title: "Smart Watch", category: "Electronics", price: 129, stock: 18 },
  { title: "Gaming Mouse", category: "Electronics", price: 49, stock: 30 },
  {
    title: "Mechanical Keyboard",
    category: "Electronics",
    price: 99,
    stock: 15,
  },
  { title: "Cotton T-Shirt", category: "Fashion", price: 25, stock: 40 },
  { title: "Denim Jacket", category: "Fashion", price: 75, stock: 12 },
  { title: "Running Shoes", category: "Fashion", price: 95, stock: 20 },
  { title: "Leather Wallet", category: "Accessories", price: 35, stock: 22 },
  { title: "Travel Backpack", category: "Accessories", price: 59, stock: 16 },
  { title: "Desk Lamp", category: "Home", price: 39, stock: 28 },git init
];

const products = Array.from({ length: 100 }, (_, index) => {
  const item = templates[index % templates.length];

  return {
    id: index + 1,
    title: `${item.title} ${Math.floor(index / 10) + 1}`,
    category: item.category,
    price: item.price + Math.floor(index / 10) * 5,
    stock: ((index * 7) % 50) + 1,
  };
});

export default products;
