import React from "react";
import { Box, Button, Divider, Drawer, Stack, Typography } from "@mui/material";
import { useGetCart } from "../../queries/cart/useGetCart";
import CardItem from "./CardItem";
import { useCartStore } from "../../store/cart/useCartStore";
import { ICardItem } from "../../types/cart";
import { ShoppingCart } from "@mui/icons-material";

interface CartDrawerProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, setIsOpen }) => {
	const setCart = useCartStore((state) => state.setCart);
	const cartItemCount = useCartStore((state) =>
		state.items.reduce((acc, item) => acc + item.quantity, 0)
	);

	const { data: cartData } = useGetCart({
		onSuccess: (resp: ICardItem[] | undefined) => {
			if (!resp) return;
			setCart(resp);
		},
	});

	const isCartEmpty = React.useMemo(() => cartItemCount === 0, [cartItemCount]);

	return (
		<Drawer
			anchor="right"
			open={isOpen}
			onClose={() => setIsOpen(false)}
			ModalProps={{ onClose: () => setIsOpen(false) }}
			PaperProps={{ sx: { width: { xs: "90vw", md: "60vw", lg: "30vw" } } }}>
			<Stack
				p={4}
				width={"100%"}
				direction="column"
				justifyContent="space-between">
				<Stack mb={4} width={"100%"} direction="row" alignItems="center">
					<ShoppingCart fontSize="medium" />
					<Typography ml={2} variant="h6" fontWeight="bold">
						Shopping Cart ({cartItemCount})
					</Typography>
				</Stack>
				<Divider />
				<Stack direction="column" my={2}>
					{isCartEmpty ? (
						<Box textAlign="center">
							<Typography variant="body1">No items found.</Typography>
						</Box>
					) : (
						cartData
							?.filter((x) => x?.quantity >= 1)
							?.map((item) => <CardItem key={item?.productId} item={item} />)
					)}
				</Stack>
				<Divider />
				<Stack
					mt={4}
					width={"100%"}
					direction="row"
					justifyContent="space-between"
					alignItems="center">
					<Stack direction="row" alignItems="center">
						<Typography variant="body1" fontWeight="bold">
							Total:
						</Typography>
						<Typography
							ml={1}
							color="primary"
							variant="body1"
							fontWeight="bold">
							$
							{cartData
								?.reduce((acc, item) => acc + item.price * item.quantity, 0)
								.toFixed(2)}
						</Typography>
					</Stack>
					<Button variant="contained" color="primary">
						Continue
					</Button>
				</Stack>
			</Stack>
		</Drawer>
	);
};

export default CartDrawer;
