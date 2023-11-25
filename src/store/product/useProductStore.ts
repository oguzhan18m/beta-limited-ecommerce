import { create } from "zustand";
import { IProduct } from "../../types/products";

interface ProductStore {
	isProductModalOpen: boolean;
	selectedProduct: IProduct | undefined;
	setIsProductModalOpen: (isOpen: boolean) => void;
	setSelectedProduct: (product: IProduct | undefined) => void;
	resetStore: () => void;
}

const initialState = {
	isProductModalOpen: false,
	selectedProduct: undefined,
};

export const useProductStore = create<ProductStore>((set) => ({
	...initialState,
	setIsProductModalOpen: (isOpen) => set({ isProductModalOpen: isOpen }),
	setSelectedProduct: (product) => set({ selectedProduct: product }),
	resetStore: () => set({ ...initialState }),
}));
