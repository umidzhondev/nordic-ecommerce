import React from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onQuickView }) {
    const { addToCart, wishlist, toggleWishlist } = useCart();
    const isWishlisted = wishlist.some((item) => item.id === product.id);

    const getBadgeStyle = (badge) => {
        switch (badge?.toLowerCase()) {
            case "sale":
                return "bg-[#3e5f43]/90 text-[#f7f4ee] border border-[#527d58]/30";
            case "new":
                return "bg-[#bd5d38]/90 text-[#f7f4ee] border border-[#d66f48]/30";
            case "top":
                return "bg-[#211f1e]/90 text-[#f7f4ee] border border-white/10";
            default:
                return "bg-[#2c2a29]/90 text-[#f7f4ee]";
        }
    };

    return (
        <div
            onClick={() => onQuickView(product)}
            className="group flex flex-col justify-between cursor-pointer rounded-sm p-2 -m-2 transition-all duration-300 hover:bg-[#f2ede4]/60 relative"
        >
            <div>
                <div className="relative aspect-square overflow-hidden bg-[#eae4d8] rounded-md shadow-sm">
              
                    {/* Badge (Sale, New, Top) */}
                    {product.badge && (
                        <span
                            className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-md shadow-sm backdrop-blur-md z-10 ${product.badge === "Sale"
                                    ? "bg-[#3e5c43] text-white"
                                    : product.badge === "New"
                                        ? "bg-[#bd5d38] text-white"
                                        : "bg-[#2c2a29]/90 text-[#f7f4ee]"
                                }`}
                        >
                            {product.badge}
                        </span>
                    )}

                    {/* Wishlist Heart */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product);
                        }}
                        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${isWishlisted
                                ? "bg-[#bd5d38] text-white shadow-md"
                                : "bg-white/70 text-[#2c2a29] hover:bg-white"
                            }`}
                    >
                        <svg
                            className="w-4 h-4"
                            fill={isWishlisted ? "currentColor" : "none"}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </button>

                
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Quick View Button */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onQuickView(product);
                            }}
                            className="w-full bg-[#f7f4ee]/95 backdrop-blur-md text-[#2c2a29] text-xs font-medium py-2 rounded-md shadow-md hover:bg-[#2c2a29] hover:text-[#f7f4ee] transition-all cursor-pointer"
                        >
                            Быстрый просмотр
                        </button>
                    </div>
                </div>

                <div className="pt-3 pb-1">
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-sans font-semibold tracking-wider text-[#9e9382] uppercase">
                            {product.category}
                        </span>

                        {product.rating && (
                            <div className="flex items-center gap-1 text-[11px] text-[#2c2a29]">
                                <span className="text-amber-600">★</span>
                                <span className="font-medium">{product.rating}</span>
                                {product.reviewsCount && (
                                    <span className="text-[#9e9382] text-[10px]">
                                        ({product.reviewsCount})
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <h3 className="font-serif font-medium text-sm text-[#2c2a29] group-hover:text-[#7d6b53] transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </div>
            </div>

            {/* Prices & Add button */}
            <div className="flex items-center justify-between pt-1">
                <div className="flex items-baseline gap-1.5">
                    <span className="font-sans font-bold text-sm text-[#38332d]">
                        ${product.price}
                    </span>
                    {product.oldPrice && (
                        <span className="font-sans text-xs text-[#a3998b] line-through">
                            ${product.oldPrice}
                        </span>
                    )}
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                    }}
                    className="text-xs font-sans font-medium text-[#2c2a29] hover:text-[#7d6b53] px-2 py-1 rounded hover:bg-[#eae4d8] transition-all cursor-pointer"
                >
                    + В корзину
                </button>
            </div>
        </div>
    );
}