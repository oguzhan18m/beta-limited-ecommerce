import { create } from "zustand";
import { ICardItem } from "../../types/cart";

interface CartStore {
	isCartDrawerOpen: boolean;
	items: ICardItem[];
	setCart: (items: ICardItem[]) => void;
	setCartDrawerOpen: (isOpen: boolean) => void;
	resetStore: () => void;
}

const initialState = {
	isCartDrawerOpen: false,
	items: [],
};

export const useCartStore = create<CartStore>((set) => ({
	...initialState,
	setCart: (items) => set({ items }),
	setCartDrawerOpen: (isOpen) => set({ isCartDrawerOpen: isOpen }),
	resetStore: () => set({ ...initialState }),
}));
