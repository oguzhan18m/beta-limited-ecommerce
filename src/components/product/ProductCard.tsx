import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IProduct } from "../../types/products";
import {
	Chip,
	CircularProgress,
	Grid,
	IconButton,
	Rating,
	Stack,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useAddToCart } from "../../queries/cart/useAddToCart";
import { useSubtractFromCart } from "../../queries/cart/useSubtractFromCart";
import { useQueryClient } from "react-query";
import { QueryKeys } from "../../queries/query-keys";
import { useCartStore } from "../../store/cart/useCartStore";

interface Props {
	product: IProduct;
}

const ProductCard: React.FC<Props> = ({ product }) => {
	const queryClient = useQueryClient();
	const cartItems = useCartStore((state) => state.items);

	const { mutateAsync: addToCart, isLoading: isAddToCartLoading } =
		useAddToCart({
			onSuccess: () => {
				queryClient.refetchQueries(QueryKeys.GET_CART);
			},
		});

	const {
		mutateAsync: subtractFromCart,
		isLoading: isSubtractFromCartLoading,
	} = useSubtractFromCart({
		onSuccess: () => {
			queryClient.refetchQueries(QueryKeys.GET_CART);
		},
	});

	const handleAddToCart = async (productId: string) => {
		await addToCart({ productId });
	};

	const handleSubtractFromCart = async (productId: string) => {
		await subtractFromCart({ productId });
	};

	const quantity: number = React.useMemo(
		() =>
			Number(
				Array.isArray(cartItems) &&
					cartItems?.find((item) => item?.productId === product?.id)?.quantity
			),
		[cartItems]
	);

	return (
		<Card sx={{ p: 0 }} elevation={4}>
			<CardContent sx={{ p: "0px", pb: 1 }}>
				<Stack width="100%" position="relative" bgcolor="#f4f7ff">
					<CardMedia
						component="img"
						height="100%"
						width={"100%"}
						image={product?.image as string}
						alt="Paella dish"
					/>
					<Chip
						size="small"
						variant="filled"
						color="primary"
						label={product?.discount}
						sx={{ position: "absolute", left: 10, top: 10 }}
					/>
				</Stack>
				<Stack width="100%" px={2} pt={2} height="116px">
					<Grid container>
						<Grid item xs={10}>
							<Typography fontWeight="bold" variant="body1">
								{product?.name ?? ""}
							</Typography>
							<Stack direction="row" my={1} alignItems="center">
								<Rating
									name="read-only"
									value={product?.rating}
									readOnly
									sx={{ mr: 1 }}
								/>
								<Typography variant="inherit">{`(${product?.rating})`}</Typography>
							</Stack>
							<Stack direction="row" alignItems="center">
								<Typography
									mr={1}
									color="primary"
									fontWeight="bold"
									variant="inherit">
									${product?.price}
								</Typography>
								<Typography
									variant="inherit"
									color="text.secondary"
									sx={{ textDecoration: "line-through" }}>
									${product?.originalPrice?.toFixed(2)}
								</Typography>
							</Stack>
						</Grid>
						<Grid item xs={2}>
							<Stack
								width={"100%"}
								height={"100%"}
								direction="column"
								alignItems="center"
								justifyContent={quantity >= 1 ? "center" : "flex-end"}>
								{quantity >= 1 && (
									<>
										<IconButton
											disabled={isSubtractFromCartLoading}
											color="primary"
											size="small"
											sx={{
												p: 0.5,
												borderRadius: 2,
												border: "1px solid #c34b5b",
											}}
											onClick={() => handleSubtractFromCart(product?.id)}>
											{isSubtractFromCartLoading ? (
												<CircularProgress size={24} color="primary" />
											) : (
												<RemoveIcon />
											)}
										</IconButton>
										<Typography
											my={1}
											color="primary"
											variant="body2"
											fontWeight="bold">
											{quantity}
										</Typography>
									</>
								)}
								<IconButton
									disabled={isAddToCartLoading}
									size="small"
									sx={{
										p: 0.5,
										borderRadius: 2,
										border: "1px solid #c34b5b",
									}}
									onClick={() => handleAddToCart(product?.id)}>
									{isAddToCartLoading ? (
										<CircularProgress size={24} color="primary" />
									) : (
										<AddIcon color="primary" />
									)}
								</IconButton>
							</Stack>
						</Grid>
					</Grid>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default ProductCard;
