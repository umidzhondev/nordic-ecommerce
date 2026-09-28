import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CheckoutModal({ isOpen, onClose }) {
    const { cart, totalPrice, clearCart } = useCart();
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone) return;
        setIsSuccess(true);
        clearCart();
    };

    const handleClose = () => {
        setIsSuccess(false);
        setFormData({ name: "", phone: "", address: "" });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-[#f7f4ee] w-full max-w-md rounded-lg shadow-2xl p-6 relative border border-[#e5dfd3]">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-[#8c8275] hover:text-[#2c2a29] cursor-pointer"
                >
                    ✕
                </button>

                {isSuccess ? (
                    <div className="text-center py-8 space-y-4">
                        <div className="w-12 h-12 bg-[#3e5f43] text-white rounded-full flex items-center justify-center mx-auto text-xl">
                            ✓
                        </div>
                        <h3 className="font-serif text-xl text-[#2c2a29]">
                            Заказ успешно оформлен!
                        </h3>
                        <p className="text-xs text-[#8c8275] leading-relaxed">
                            Спасибо за покупку, {formData.name}. Мы свяжемся с вами в ближайшее время по номеру {formData.phone}.
                        </p>
                        <button
                            onClick={handleClose}
                            className="w-full bg-[#2c2a29] text-[#f7f4ee] py-2.5 rounded-full text-xs font-medium hover:bg-[#38332d] transition-all cursor-pointer mt-4"
                        >
                            Отлично
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h3 className="font-serif text-lg text-[#2c2a29] border-b border-[#e5dfd3] pb-2">
                            Оформление заказа
                        </h3>

                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-serif italic text-[#8c8275] block mb-1">
                                    Ваше имя *
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Иван Иванов"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#eae4d8]/50 border border-[#d8d0c1] rounded px-3 py-2 text-xs outline-none focus:border-[#2c2a29]"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-serif italic text-[#8c8275] block mb-1">
                                    Телефон *
                                </label>
                                <input
                                    required
                                    type="tel"
                                    placeholder="+998 90 123 45 67"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-[#eae4d8]/50 border border-[#d8d0c1] rounded px-3 py-2 text-xs outline-none focus:border-[#2c2a29]"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-serif italic text-[#8c8275] block mb-1">
                                    Адрес доставки
                                </label>
                                <textarea
                                    rows="2"
                                    placeholder="Улица, дом, квартира"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full bg-[#eae4d8]/50 border border-[#d8d0c1] rounded px-3 py-2 text-xs outline-none focus:border-[#2c2a29]"
                                />
                            </div>
                        </div>

                        <div className="pt-3 border-t border-[#e5dfd3] flex justify-between items-center text-sm font-bold">
                            <span>Итого к оплате:</span>
                            <span>${totalPrice}</span>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#2c2a29] text-[#f7f4ee] py-3 rounded-full text-xs font-medium hover:bg-[#38332d] transition-all cursor-pointer"
                        >
                            Подтвердить заказ
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}