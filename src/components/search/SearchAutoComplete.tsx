import { ChevronRight, SearchRounded } from "@mui/icons-material";
import {
	Autocomplete,
	CircularProgress,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import { useSearchProducts } from "../../queries/products/useSearchProducts";
import { IProduct } from "../../types/products";
import { useProductStore } from "../../store/product/useProductStore";

interface Props {
	open: boolean;
	setOpen: (val: boolean) => void;
	input: string;
	setInput: (val: string) => void;
}

const SearchAutoComplete: React.FC<Props> = ({
	open,
	setOpen,
	input,
	setInput,
}) => {
	const setIsProductModalOpen = useProductStore(
		(state) => state.setIsProductModalOpen
	);
	const setSelectedProduct = useProductStore(
		(state) => state.setSelectedProduct
	);

	const { data: productsData, isLoading } = useSearchProducts(input);

	const handleOpenProductModal = (product: IProduct) => {
		setSelectedProduct(product);
		setIsProductModalOpen(true);
	};
	return (
		<Autocomplete
			sx={{ width: 450 }}
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			isOptionEqualToValue={(option, value) => option.name === value.name}
			getOptionLabel={(option) => option.name}
			disableClearable={false}
			renderOption={(props, option) => (
				<Stack
					p={2}
					sx={{
						width: "100%",
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						cursor: "pointer",
						borderBottom: "1px solid #ccc",
					}}
					onClick={() => handleOpenProductModal(option)}>
					<Typography>{option?.name}</Typography>
					<ChevronRight color="disabled" />
				</Stack>
			)}
			options={productsData ?? []}
			loading={isLoading}
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder="Searching for..."
					onChange={(event) => setInput(event.target.value)}
					InputProps={{
						...params.InputProps,
						startAdornment: (
							<SearchRounded fontSize="medium" color="disabled" />
						),
						endAdornment: (
							<React.Fragment>
								{isLoading ? (
									<CircularProgress color="inherit" size={20} />
								) : null}
							</React.Fragment>
						),
					}}
				/>
			)}
		/>
	);
};

export default SearchAutoComplete;
