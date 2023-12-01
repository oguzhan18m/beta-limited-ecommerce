import { create } from "zustand";
import { IProduct } from "../../types/products";

interface ProductStore {
	products: IProduct[];
	isProductModalOpen: boolean;
	selectedProduct: IProduct | undefined;
	setProducts: (products: IProduct[]) => void;
	setIsProductModalOpen: (isOpen: boolean) => void;
	setSelectedProduct: (product: IProduct | undefined) => void;
	resetStore: () => void;
}

const initialState = {
	products: [],
	isProductModalOpen: false,
	selectedProduct: undefined,
};

export const useProductStore = create<ProductStore>((set) => ({
	...initialState,
	setProducts: (products) => set({ products }),
	setIsProductModalOpen: (isOpen) => set({ isProductModalOpen: isOpen }),
	setSelectedProduct: (product) => set({ selectedProduct: product }),
	resetStore: () => set({ ...initialState }),
}));
