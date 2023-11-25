import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useGetProducts } from "../../queries/products/useGetProducts";
import { useCreateSession } from "../../queries/session/useCreateSession";
import { IProduct } from "../../types/products";
import ProductCard from "../../components/product/ProductCard";
import { useCartStore } from "../../store/cart/useCartStore";
import CartDrawer from "../../components/cart/CartDrawer";
import { useProductStore } from "../../store/product/useProductStore";
import ProductModal from "../../components/product/ProductModal";

interface Props {}

const Products: React.FC<Props> = ({}) => {
	const hasSession = window.localStorage.getItem("sessionId") ?? false;

	const isCartDrawerOpen = useCartStore((state) => state.isCartDrawerOpen);
	const setIsCartDrawerOpen = useCartStore((state) => state.setCartDrawerOpen);
	const selectedProduct = useProductStore((state) => state.selectedProduct);
	const isProductModalOpen = useProductStore(
		(state) => state.isProductModalOpen
	);
	const setIsProductModalOpen = useProductStore(
		(state) => state.setIsProductModalOpen
	);

	const { isLoading } = useCreateSession({
		enabled: hasSession ? false : true,
		retry: 0,
		refetchOnWindowFocus: false,
		onSuccess: (resp: string | undefined) => {
			if (resp) {
				window.localStorage.setItem("sessionId", resp);
			}
		},
	});

	const { data: productsData } = useGetProducts({
		enabled: hasSession ? true : false,
	});

	if (isLoading) {
		return <CircularProgress size={24} />;
	}

	return (
		<Container maxWidth="lg">
			<Typography variant="h4" fontWeight="bold">
				Products
			</Typography>
			<Grid container spacing={2} mt={4}>
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
