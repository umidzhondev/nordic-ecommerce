import React, { useState, useMemo } from "react";
import ProductCard from "./components/ProductCard";
import Sidebar from "./components/Sidebar";
import Pagination from "./components/Pagination";
import QuickViewModal from "./components/QuickViewModal";
import CartModal from "./components/CartModal";
import { useCart } from "./context/CartContext";
import { PRODUCTS } from "./data/products";

const ITEMS_PER_PAGE = 8;

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOnlyWishlist, setShowOnlyWishlist] = useState(false);

  const { totalItems, wishlist, toastMessage } = useCart();

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedCategory("Все");
    setSearch("");
    setSortBy("default");
    setCurrentPage(1);
    setShowOnlyWishlist(false);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "Все" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());
      const matchesWishlist = showOnlyWishlist
        ? wishlist.some((w) => w.id === product.id)
        : true;
      return matchesCategory && matchesSearch && matchesWishlist;
    }).sort((a, b) => {
      if (sortBy === "low-to-high") return a.price - b.price;
      if (sortBy === "high-to-low") return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, search, sortBy, showOnlyWishlist, wishlist]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#2c2a29] font-sans antialiased selection:bg-[#eae4d8] relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-40 bg-[#2c2a29] text-[#f7f4ee] text-xs font-medium px-4 py-3 rounded-lg shadow-xl backdrop-blur-md transition-all animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <header className="border-b border-[#e5dfd3] bg-[#f7f4ee]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div
            onClick={resetFilters}
            className="flex items-baseline gap-3 cursor-pointer group select-none"
          >
            <h1 className="text-2xl sm:text-3xl font-serif font-semibold tracking-wider text-[#2c2a29] group-hover:opacity-75 transition-opacity">
              NORDIC
            </h1>
            <span className="text-xs font-serif italic text-[#8c8275] hidden sm:inline">
              универсал магазин
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Кнопка Избранное */}
            <button
              onClick={() => {
                setShowOnlyWishlist(!showOnlyWishlist);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all cursor-pointer text-xs font-medium ${showOnlyWishlist
                ? "bg-[#bd5d38] text-white border-[#bd5d38]"
                : "border-[#d8d0c1] text-[#2c2a29] hover:bg-[#eae4d8]"
                }`}
            >
              <svg
                className={`w-4 h-4 transition-colors ${showOnlyWishlist || wishlist?.length > 0
                  ? showOnlyWishlist
                    ? "fill-white stroke-white"
                    : "fill-[#bd5d38] stroke-[#bd5d38]"
                  : "fill-none stroke-[#2c2a29]"
                  }`}
                viewBox="0 0 24 24"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>Избранное</span>
              <span
                className={
                  showOnlyWishlist ? "text-white/80" : "text-[#8c8275]"
                }
              >
                ({wishlist?.length || 0})
              </span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="border border-[#2c2a29] px-4 py-2 rounded-full text-xs font-medium tracking-wide hover:bg-[#2c2a29] hover:text-[#f7f4ee] transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>Корзина</span>
              <span className="bg-[#eae4d8] text-[#2c2a29] px-2 py-0.5 rounded-full text-[10px] font-bold">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <Sidebar
            search={search}
            setSearch={setSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleFilterChange={handleFilterChange}
            resetFilters={resetFilters}
          />

          <section className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#e5dfd3]">
              <span className="text-xs text-[#8c8275]">
                {showOnlyWishlist ? "Избранные товары: " : "Найдено товаров: "}
                <strong className="text-[#2c2a29]">
                  {filteredProducts.length}
                </strong>
              </span>
            </div>

            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-3">
                <p className="text-sm text-[#8c8275]">
                  По вашему запросу ничего не найдено.
                </p>
                <button
                  onClick={resetFilters}
                  className="text-xs font-medium text-[#2c2a29] underline hover:opacity-80 cursor-pointer"
                >
                  Показать все товары
                </button>
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </section>
        </div>
      </main>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}