import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";
import React from "react";

interface Props {
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
	children: React.ReactNode;
}

const SearchModal: React.FC<Props> = ({ isOpen, setIsOpen, children }) => {
	return (
		<Dialog
			sx={{
				"& .MuiPaper-root": {
					maxWidth: "unset",
					width: {
						xs: "95vw",
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
				<Typography fontWeight="bold">Search</Typography>
			</DialogTitle>
			<DialogContent
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					p: 4,
				}}>
				{children}
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

export default SearchModal;
