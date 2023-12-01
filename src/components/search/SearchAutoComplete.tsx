import { Close, Search } from "@mui/icons-material";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import React, { KeyboardEvent } from "react";
import { useSearchProducts } from "../../queries/products/useSearchProducts";
import { IProduct } from "../../types/products";
import { useProductStore } from "../../store/product/useProductStore";

interface Props {
	open: boolean;
	setOpen: (val: boolean) => void;
	input: string;
	setInput: (val: string) => void;
	setIsSearchModalOpen: (val: boolean) => void;
}

const SearchAutoComplete: React.FC<Props> = ({
	input,
	setInput,
	setIsSearchModalOpen,
}) => {
	const setProducts = useProductStore((state) => state.setProducts);
	const [searchText, setSearchText] = React.useState<string | undefined>(
		undefined
	);

	const handleClear = () => {
		setSearchText("");
		setInput("");
	};

	useSearchProducts(searchText as string, {
		enabled: searchText !== undefined ? true : false,
		onSuccess: (resp: IProduct[] | undefined) => {
			if (!resp) return;
			setProducts(resp);
			setIsSearchModalOpen(false);
		},
	});

	const handleSearch = () => {
		setSearchText(input);
	};

	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<Paper
			elevation={0}
			sx={{
				display: "flex",
				alignItems: "center",
				width: { xs: "100%", lg: 500 },
				borderRadius: 200,
				pl: 2,
				border: "1px solid #ccc",
			}}>
			<Search color="disabled" />
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				value={input}
				onChange={(event) => setInput(event.target.value)}
				placeholder="Searching for..."
				onKeyDown={handleKeyPress}
			/>
			{searchText && searchText?.length > 0 && (
				<IconButton onClick={handleClear}>
					<Close />
				</IconButton>
			)}
			<Button
				onClick={handleSearch}
				variant="contained"
				sx={{
					bgcolor: "primary",
					borderTopRightRadius: 200,
					borderBottomRightRadius: 200,
					height: 45,
					width: 100,
					ml: 1,
				}}>
				Search
			</Button>
		</Paper>
	);
};

export default SearchAutoComplete;
