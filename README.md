# 🚀 NovaStore – Product Management Dashboard

A modern, responsive, and feature-rich Product Management Dashboard built with **React.js and Tailwind CSS**. NovaStore helps manage products, monitor inventory, analyze product statistics, and organize product data through a clean and interactive dashboard.

This project focuses on practical React concepts, reusable components, state management, performance optimization, and CRUD operations.

## 🌐 Live Demo

[View Live Demo](https://novastore-product-management-dashboar.netlify.app/)

## 📸 Project Overview

NovaStore is a product management application where users can:

- Manage products with Add, Edit, and Delete functionality.
- Search products by name.
- Filter products by category.
- Sort products by price.
- Monitor low-stock products.
- View inventory statistics and analytics.
- Store product data in LocalStorage.
- View product images and details.

## ✨ Features

### 📊 Dashboard & Analytics

- Total products overview.
- Total inventory value.
- Average product price.
- Low-stock product count.
- Category-wise product distribution.

### 📦 Product Management (CRUD)

- Add new products.
- Edit existing products.
- Delete products with confirmation.
- Add product image URLs.
- Preview product images.
- Manage product categories, prices, and stock quantities.

### 🔍 Search, Filter & Sorting

- Search products by title.
- Filter products by category.
- Sort products by price (Low to High).
- Sort products by price (High to Low).
- View all products or low-stock products.

### 💾 Data Persistence

- Save product data using LocalStorage.
- Keep product information after page refresh.
- Custom reusable LocalStorage hook.

### 🎨 User Interface

- Modern dark dashboard design.
- Responsive layout.
- Sidebar navigation.
- Product cards with real images.
- Interactive modals.
- Toast notifications.
- React Icons.

## 🧠 React Concepts & Problem Solving

This project helped me practice and understand important React concepts.

### 1. useState()

Used to manage application states, including:

- Products
- Search input
- Category selection
- Sorting options
- Active navigation page
- Add/Edit modal
- Delete confirmation modal

### 2. useEffect()

Used inside the custom LocalStorage hook to synchronize product data with browser LocalStorage whenever the state changes.

### 3. useMemo() – Performance Optimization

One of the important parts of this project was implementing search, category filtering, low-stock filtering, and sorting.

Instead of recalculating the filtered and sorted product list on every render, I used `useMemo()` to optimize the process.

**Example:**

```jsx
const filteredProducts = useMemo(() => {
  let result = [...products];

  // Search
  if (search.trim()) {
    result = result.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // Category Filter
  if (category !== "All") {
    result = result.filter((product) => product.category === category);
  }

  // Low Stock Filter
  if (activePage === "Inventory") {
    result = result.filter((product) => product.stock < 10);
  }

  // Sorting
  if (sort === "low-high") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "high-low") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
}, [products, search, category, sort, activePage]);
```

**What I learned:**

- How `useMemo()` works.
- How to optimize expensive calculations.
- How to combine multiple filters.
- How to implement sorting without directly mutating the original products array.
- How dependency arrays control memoization.

### 4. Custom Hook – useLocalStorage()

Created a reusable custom hook to manage LocalStorage.

```jsx
import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

This allows product data to remain available after refreshing the browser.

### 5. Component-Based Architecture

Separated the application into reusable components to make the code easier to maintain, understand, and extend.

## 🛠️ Technologies Used

| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| React.js          | Frontend development          |
| JavaScript (ES6+) | Application logic             |
| Tailwind CSS      | Styling and responsive design |
| React Icons       | Icons                         |
| React Toastify    | Toast notifications           |
| LocalStorage      | Data persistence              |
| Vite              | Development environment       |

## 📁 Project Structure

```text
src/
├── components/
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── StatCard.jsx
│   ├── Analytics.jsx
│   ├── ProductList.jsx
│   ├── ProductCard.jsx
│   ├── ProductModal.jsx
│   ├── ConfirmModal.jsx
│   └── Toast.jsx
│
├── data/
│   └── products.js
│
├── hooks/
│   └── useLocalStorage.js
│
├── App.jsx
├── main.jsx
└── index.css
```

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
gh repo clone mdruhulamins786/NovaStore-Product-Management-Dashboard
```

### 2. Navigate to the Project Directory

```bash
cd NovaStore-Product-Management-Dashboard
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Install Additional Packages

```bash
npm install react-toastify react-icons
```

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 📚 What I Learned From This Project

While building NovaStore, I improved my understanding of:

- React component architecture.
- State management with `useState()`.
- Side effects with `useEffect()`.
- Performance optimization with `useMemo()`.
- Custom React Hooks.
- CRUD operations.
- Search, filtering, and sorting logic.
- LocalStorage integration.
- Reusable components.
- Conditional rendering.
- Form handling and validation.
- Working with product images.
- Building responsive dashboards with Tailwind CSS.

## 🚀 Future Improvements

- Backend API integration.
- Database integration.
- User authentication.
- Product pagination.
- Advanced analytics and charts.
- Image upload functionality.
- Admin and user roles.

## 👨‍💻 Developer

**Md Ruhul Amin**

Aspiring Full-Stack Web Developer passionate about building modern, responsive, and interactive web applications.

- GitHub: [mdruhulamins786](https://github.com/mdruhulamins786)

---

⭐ If you like this project, consider giving it a star!
