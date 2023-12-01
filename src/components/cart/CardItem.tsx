import {
	Card,
	CardContent,
	CircularProgress,
	Divider,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import React from "react";
import { ICardItem } from "../../types/cart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useQueryClient } from "react-query";
import { useAddToCart } from "../../queries/cart/useAddToCart";
import { QueryKeys } from "../../queries/query-keys";
import { useSubtractFromCart } from "../../queries/cart/useSubtractFromCart";

interface Props {
	item: ICardItem;
}

const CardItem: React.FC<Props> = ({ item }) => {
	const queryClient = useQueryClient();

	const { mutateAsync: addToCart, isLoading: isAddToCartLoading } =
		useAddToCart({
			onSuccess: () => {
				queryClient.invalidateQueries(QueryKeys.GET_CART);
			},
		});

	const {
		mutateAsync: subtractFromCart,
		isLoading: isSubtractFromCartLoading,
	} = useSubtractFromCart({
		onSuccess: () => {
			queryClient.invalidateQueries(QueryKeys.GET_CART);
		},
	});

	const handleAddToCart = async (productId: string) => {
		await addToCart({ productId });
	};

	const handleSubtractFromCart = async (productId: string) => {
		await subtractFromCart({ productId });
	};
	return (
		<Card elevation={4} sx={{ mb: 2 }}>
			<CardContent>
				<Stack
					direction="row"
					alignItems="center"
					width="100%"
					mb={1}
					justifyContent="space-between">
					<Typography variant="body1" fontWeight="bold">
						{item?.name}
					</Typography>
					<Stack direction="row" alignItems="center">
						<Typography mr={1} variant="body2" fontWeight="bold">
							Price:
						</Typography>
						<Typography color="primary" variant="body2">
							${item?.price?.toFixed(2)}
						</Typography>
					</Stack>
				</Stack>
				<Divider />
				<Stack direction="row" alignItems="center" mt={1}>
					<Typography mr={1} variant="body2" fontWeight="bold">
						Quantity:
					</Typography>
					<Stack direction="row" alignItems="center">
						<IconButton
							disabled={isSubtractFromCartLoading}
							size="small"
							color="primary"
							sx={{
								p: 0.5,
								borderRadius: 2,
								border: "1px solid #c34b5b",
							}}
							onClick={() => handleSubtractFromCart(item?.productId)}>
							{isSubtractFromCartLoading ? (
								<CircularProgress size={24} color="primary" />
							) : (
								<RemoveIcon />
							)}
						</IconButton>
						<Typography
							mx={2}
							color="primary"
							variant="body2"
							fontWeight="bold">
							{item?.quantity}
						</Typography>
						<IconButton
							disabled={isAddToCartLoading}
							size="small"
							color="primary"
							sx={{
								p: 0.5,
								borderRadius: 2,
								border: "1px solid #c34b5b",
							}}
							onClick={() => handleAddToCart(item?.productId)}>
							{isAddToCartLoading ? (
								<CircularProgress size={24} color="primary" />
							) : (
								<AddIcon color="primary" />
							)}
						</IconButton>
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default CardItem;
