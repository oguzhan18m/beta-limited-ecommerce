import React, { useState } from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Drawer,
	List,
	CssBaseline,
	useMediaQuery,
	useTheme,
	Typography,
	Badge,
	Divider,
	Stack,
	Card,
	Grid,
	Box,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { mainListItems } from "./main_list_items";
import MenuIcon from "@mui/icons-material/Menu";
import { useCartStore } from "../store/cart/useCartStore";
import Logo from "../components/logo/Logo";
import SearchProduct from "../components/search/SearchProduct";

interface Props {
	children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [isLeftMenuDrawerOpen, setIsLeftMenuDrawerOpen] = useState(false);

	const cartItemCount = useCartStore((state) =>
		state.items.reduce((acc, item) => acc + item.quantity, 0)
	);
	const setIsCartDrawerOpen = useCartStore((state) => state.setCartDrawerOpen);

	const handleDrawerToggle = () => {
		setIsLeftMenuDrawerOpen(!isLeftMenuDrawerOpen);
	};

	return (
		<Grid container>
			<Grid item xs={12}>
				<CssBaseline />
				<AppBar
					position="absolute"
					sx={{ bgcolor: theme.palette.common.white, height: 100 }}>
					<Toolbar
						sx={{
							px: { xs: 2, sm: 3, md: 4 },
							display: "flex",
							width: "100%",
							height: "100%",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}>
						<Grid container width={"100%"}>
							<Grid item xs={4}>
								<Stack width="100%" direction="row" alignItems="center">
									{isMobile && (
										<IconButton
											sx={{ mr: 2 }}
											onClick={handleDrawerToggle}
											color="primary">
											<MenuIcon color="primary" />
										</IconButton>
									)}
									<Logo />
								</Stack>
							</Grid>
							<Grid item xs={8}>
								<Stack
									width="100%"
									direction="row"
									alignItems="center"
									justifyContent={isMobile ? " flex-end" : "space-between"}>
									<SearchProduct />
									<IconButton
										sx={{ ml: 2 }}
										size="large"
										onClick={() => setIsCartDrawerOpen(true)}
										color="primary">
										<Badge badgeContent={cartItemCount} color="secondary">
											<ShoppingCart />
										</Badge>
									</IconButton>
								</Stack>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</Grid>

			<Drawer
				ModalProps={{ onClose: () => setIsLeftMenuDrawerOpen(false) }}
				PaperProps={{ sx: { width: "50vw" } }}
				variant="temporary"
				open={isLeftMenuDrawerOpen}>
				<Toolbar
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-start",
						px: [1],
					}}>
					<IconButton sx={{ ml: 2 }} onClick={handleDrawerToggle}>
						<MenuIcon />
					</IconButton>
				</Toolbar>
				<Divider />
				<List component="nav">{mainListItems}</List>
			</Drawer>

			{!isMobile && (
				<Grid item xs={4} mt={6}>
					<Stack p={4} mt={8}>
						<Card elevation={4}>
							<Stack p={2}>
								<Typography variant="h6" fontWeight="bold">
									Top categories
								</Typography>
							</Stack>
							<Divider />
							<List component="nav">{mainListItems}</List>
						</Card>
					</Stack>
				</Grid>
			)}
			<Grid item xs={isMobile ? 12 : 8} mt={6}>
				<main style={{ width: "100%" }}>
					<Toolbar />
					<Box p={4}>{children}</Box>
				</main>
			</Grid>
		</Grid>
	);
};

export default AppLayout;
