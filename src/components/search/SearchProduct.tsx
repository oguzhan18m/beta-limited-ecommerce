import { IconButton, Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { Search, SearchRounded } from "@mui/icons-material";
import SearchAutoComplete from "./SearchAutoComplete";
import SearchModal from "./SearchModal";

const SearchProduct = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const [open, setOpen] = React.useState(false);
	const [input, setInput] = React.useState("");
	const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);

	return (
		<Stack direction="column">
			{isMobile ? (
				<Stack direction="row" alignItems="center" justifyContent="center">
					<IconButton
						onClick={() => setIsSearchModalOpen(true)}
						size="large"
						color="primary">
						<SearchRounded fontSize="medium" color="primary" />
					</IconButton>
				</Stack>
			) : (
				<SearchAutoComplete
					open={open}
					setOpen={setOpen}
					input={input}
					setInput={setInput}
				/>
			)}

			<SearchModal
				isOpen={isSearchModalOpen}
				setIsOpen={(val: boolean) => setIsSearchModalOpen(val)}>
				<SearchAutoComplete
					open={open}
					setOpen={setOpen}
					input={input}
					setInput={setInput}
				/>{" "}
			</SearchModal>
		</Stack>
	);
};

export default SearchProduct;
