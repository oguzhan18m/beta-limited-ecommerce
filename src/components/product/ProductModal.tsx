import React from "react";
import {
	Typography,
	Dialog,
	DialogActions,
	Button,
	DialogContent,
	DialogTitle,
	Chip,
	Stack,
	Rating,
} from "@mui/material";
import { IProduct } from "../../types/products";

interface ProductModalProps {
	product: IProduct | undefined;
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
	product,
	isOpen,
	setIsOpen,
}) => {
	return (
		<Dialog
			sx={{
				"& .MuiPaper-root": {
					maxWidth: "unset",
					width: {
						xs: "90vw",
						md: "70vw",
						lg: "40vw",
					},
				},
			}}
			open={isOpen}
			keepMounted={true}
			onClose={() => setIsOpen(false)}>
			<DialogTitle
				display="flex"
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between">
				<Typography variant="h6" fontWeight="bold">
					{product?.name}
				</Typography>
				<Chip color="primary" label={product?.discount} />
			</DialogTitle>
			<DialogContent
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}>
				<img src={product?.image as string} width={300} height={300} />
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
				<Stack direction="row" my={1} alignItems="center">
					<Rating value={product?.rating} readOnly sx={{ mr: 1 }} />
					<Typography variant="inherit">{`(${product?.rating})`}</Typography>
				</Stack>
			</DialogContent>
			<DialogActions
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					borderTop: (theme) => `1px solid ${theme.palette.divider}`,
					px: 4,
					m: 0,
				}}>
				<Button variant="outlined" onClick={() => setIsOpen(false)}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ProductModal;
