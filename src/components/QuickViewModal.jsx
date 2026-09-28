import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-[#f7f4ee] w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden border border-[#e5dfd3] relative animate-fade-in">
        {/* Close btn */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-[#8c8275] hover:text-[#2c2a29] text-xl cursor-pointer"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-square bg-[#f0ebe1] relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-[#2c2a29] text-[#f7f4ee] text-[10px] uppercase px-2 py-0.5 rounded-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Info card */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-serif italic text-[#8c8275] block mb-1">
                {product.category}
              </span>
              <h2 className="font-serif text-2xl text-[#2c2a29] mb-3">
                {product.name}
              </h2>
              <p className="font-bold text-lg text-[#5a4e40] mb-4">
                ${product.price}
              </p>
              <p className="text-xs text-[#6b6255] leading-relaxed mb-6">
                {product.description || "Элегантный элемент интерьера, выполненный из высококачественных материалов."}
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-3 rounded-full text-xs font-medium transition-all cursor-pointer ${isAdded
                  ? "bg-[#4d7c55] text-white"
                  : "bg-[#2c2a29] text-[#f7f4ee] hover:bg-[#454240]"
                }`}
            >
              {isAdded ? "✓ Добавлено в корзину" : "Добавить в корзину"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}