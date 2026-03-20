import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            isCartOpen: false,

            // Actions
            toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
            openCart: () => set({ isCartOpen: true }),
            closeCart: () => set({ isCartOpen: false }),

            addToCart: (product, quantity = 1) => set((state) => {
                const existingItem = state.cart.find((item) => item.id === product.id);
                if (existingItem) {
                    return {
                        cart: state.cart.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                        )
                    };
                }
                return { cart: [...state.cart, { ...product, quantity }] };
            }),

            removeFromCart: (productId) => set((state) => ({
                cart: state.cart.filter((item) => item.id !== productId)
            })),

            updateQuantity: (productId, quantity) => set((state) => ({
                cart: state.cart.map((item) =>
                    item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
                )
            })),

            clearCart: () => set({ cart: [] }),

            // Computed Properties (Helpers)
            getCartTotal: () => {
                const state = get();
                return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            },

            getCartItemsCount: () => {
                const state = get();
                return state.cart.reduce((count, item) => count + item.quantity, 0);
            }
        }),
        {
            name: 'rashi-waters-cart', // local storage key
        }
    )
);

export default useCartStore;
