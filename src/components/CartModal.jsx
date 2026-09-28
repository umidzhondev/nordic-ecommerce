import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartModal({ isOpen, onClose }) {
    const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
    });

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.address) return;
        setIsSuccess(true);
        setIsCheckout(false);
        clearCart();
    };

    const handleCloseAll = () => {
        setIsSuccess(false);
        setIsCheckout(false);
        setFormData({ name: "", phone: "", address: "" });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={handleCloseAll}
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-[#f7f4ee] shadow-2xl flex flex-col justify-between p-6 relative z-50">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-[#e5dfd3]">
                        <h2 className="text-xl font-serif font-semibold text-[#2c2a29]">
                            {isSuccess
                                ? "Заказ оформлен"
                                : isCheckout
                                    ? "Оформление заказа"
                                    : "Ваша корзина"}
                        </h2>
                        <button
                            onClick={handleCloseAll}
                            className="text-[#8c8275] hover:text-[#2c2a29] text-xl cursor-pointer p-1"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto py-4">
                        {isSuccess ? (
                            <div className="py-12 text-center space-y-4">
                                <div className="w-16 h-16 bg-[#3e5c43] text-white rounded-full flex items-center justify-center mx-auto text-2xl shadow-lg">
                                    ✓
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-[#2c2a29]">
                                    Спасибо за заказ!
                                </h3>
                                <p className="text-xs text-[#8c8275] leading-relaxed max-w-xs mx-auto">
                                    Мы получили ваш заказ. Наш менеджер свяжется с вами в ближайшее время для подтверждения доставки.
                                </p>
                                <button
                                    onClick={handleCloseAll}
                                    className="mt-6 w-full bg-[#2c2a29] text-[#f7f4ee] py-3 rounded-full text-xs font-medium hover:bg-[#423e3b] transition-all cursor-pointer"
                                >
                                    Продолжить покупки
                                </button>
                            </div>
                        ) : isCheckout ? (
                            /* 2. CHECKOUT FORM VIEW */
                            <form onSubmit={handleSubmitOrder} className="space-y-4 pt-2">
                                <div>
                                    <label className="block text-xs font-medium text-[#2c2a29] mb-1">
                                        Ваше имя *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Александр Иванов"
                                        className="w-full px-3 py-2 bg-[#eae4d8]/50 border border-[#d8d0c1] rounded-md text-xs focus:outline-none focus:border-[#2c2a29]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-[#2c2a29] mb-1">
                                        Телефон *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+998 90 123 45 67"
                                        className="w-full px-3 py-2 bg-[#eae4d8]/50 border border-[#d8d0c1] rounded-md text-xs focus:outline-none focus:border-[#2c2a29]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-[#2c2a29] mb-1">
                                        Адрес доставки *
                                    </label>
                                    <textarea
                                        name="address"
                                        required
                                        rows="3"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Улица, дом, квартира"
                                        className="w-full px-3 py-2 bg-[#eae4d8]/50 border border-[#d8d0c1] rounded-md text-xs focus:outline-none focus:border-[#2c2a29]"
                                    />
                                </div>

                                <div className="pt-4 border-t border-[#e5dfd3] flex justify-between text-sm font-bold text-[#2c2a29]">
                                    <span>К оплате:</span>
                                    <span>${totalPrice}</span>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsCheckout(false)}
                                        className="w-1/3 border border-[#d8d0c1] text-[#2c2a29] py-3 rounded-full text-xs font-medium hover:bg-[#eae4d8] transition-all cursor-pointer"
                                    >
                                        Назад
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-2/3 bg-[#bd5d38] text-white py-3 rounded-full text-xs font-medium hover:bg-[#a34e2e] transition-all cursor-pointer shadow-md"
                                    >
                                        Подтвердить заказ
                                    </button>
                                </div>
                            </form>
                        ) : (
                            /* 3. CART ITEMS LIST VIEW */
                            <div>
                                {cart.length === 0 ? (
                                    <p className="text-center py-12 text-xs text-[#8c8275]">
                                        Корзина пуста. Добавьте товары из каталога.
                                    </p>
                                ) : (

                                    <div className="space-y-4">
                                        {cart.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-start gap-4 pb-4 border-b border-[#e5dfd3] relative group"
                                            >

                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-md bg-[#eae4d8] flex-shrink-0"
                                                />

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h4 className="text-sm font-serif font-normal text-[#2c2a29] line-clamp-1">
                                                            {item.name}
                                                        </h4>

                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-[#a3998b] hover:text-[#bd5d38] p-0.5 text-xs transition-colors cursor-pointer"
                                                            title="Удалить"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>

                                                    <p className="text-xs text-[#8c8275] font-sans mt-0.5">
                                                        ${item.price}
                                                    </p>

                                                    {/* Counter & Subtotal */}
                                                    <div className="flex items-center justify-between mt-3">

                                                        <div className="inline-flex items-center justify-between border border-[#d8d0c1] rounded-full bg-[#f2efe9] px-2 py-1 w-24 flex-shrink-0 select-none">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="w-5 h-5 flex items-center justify-center text-xs text-[#2c2a29] hover:text-[#bd5d38] transition-colors cursor-pointer flex-shrink-0 font-bold"
                                                            >
                                                                −
                                                            </button>

                                                            <span className="text-xs font-medium text-center text-[#2c2a29] truncate max-w-[32px]">
                                                                {item.quantity}
                                                            </span>

                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="w-5 h-5 flex items-center justify-center text-xs text-[#2c2a29] hover:text-[#bd5d38] transition-colors cursor-pointer flex-shrink-0 font-bold"
                                                            >
                                                                +
                                                            </button>
                                                        </div>


                                                        <span className="text-xs font-sans font-semibold text-[#2c2a29] ml-2 truncate">
                                                            ${(item.price * item.quantity).toLocaleString()}
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                    </div>


                                )}
                            </div>
                        )}
                    </div>


                    {!isCheckout && !isSuccess && cart.length > 0 && (
                        <div className="pt-4 border-t border-[#e5dfd3] space-y-3">
                            <div className="flex justify-between text-sm font-bold text-[#2c2a29]">
                                <span>Итого:</span>
                                <span>${totalPrice}</span>
                            </div>
                            <button
                                onClick={() => setIsCheckout(true)}
                                className="w-full bg-[#2c2a29] text-[#f7f4ee] py-3 rounded-full text-xs font-medium hover:bg-[#423e3b] transition-all cursor-pointer shadow-md"
                            >
                                Перейти к оформлению
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}