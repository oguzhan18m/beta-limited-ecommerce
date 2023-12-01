import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useGetProducts } from "../../queries/products/useGetProducts";
import { IProduct } from "../../types/products";
import ProductCard from "../../components/product/ProductCard";
import { useCartStore } from "../../store/cart/useCartStore";
import CartDrawer from "../../components/cart/CartDrawer";
import { useProductStore } from "../../store/product/useProductStore";
import ProductModal from "../../components/product/ProductModal";
import { useGetCart } from "../../queries/cart/useGetCart";
import ProductsSkeleton from "../../components/product/ProductsSkeleton";

interface Props {
	isLoading: boolean;
}

const Products: React.FC<Props> = ({ isLoading }) => {
	const isCartDrawerOpen = useCartStore((state) => state.isCartDrawerOpen);
	const setIsCartDrawerOpen = useCartStore((state) => state.setCartDrawerOpen);
	const selectedProduct = useProductStore((state) => state.selectedProduct);
	const isProductModalOpen = useProductStore(
		(state) => state.isProductModalOpen
	);
	const setIsProductModalOpen = useProductStore(
		(state) => state.setIsProductModalOpen
	);

	const productsData = useProductStore((state) => state.products);
	const setProducts = useProductStore((state) => state.setProducts);

	useGetProducts({
		onSuccess: (resp: IProduct[] | undefined) => {
			if (!resp) return;
			setProducts(resp);
		},
	});

	const { isLoading: isCartLoading } = useGetCart();

	if (isLoading || isCartLoading) {
		return <ProductsSkeleton />;
	}

	return (
		<Container maxWidth="lg">
			<Typography variant="h4" fontWeight="bold">
				Products
			</Typography>
			<Grid container spacing={2} mt={4}>
				{productsData?.length === 0 && (
					<Typography variant="body1">No products found.</Typography>
				)}
				{productsData?.map((product: IProduct) => (
					<Grid key={product?.id} item xs={12} sm={6} lg={4}>
						<ProductCard product={product} />
					</Grid>
				))}
			</Grid>

			<CartDrawer
				isOpen={isCartDrawerOpen}
				setIsOpen={(val: boolean) => setIsCartDrawerOpen(val)}
			/>

			{selectedProduct && isProductModalOpen && (
				<ProductModal
					isOpen={isProductModalOpen}
					setIsOpen={(val: boolean) => setIsProductModalOpen(val)}
					product={selectedProduct}
				/>
			)}
		</Container>
	);
};

export default Products;
