import {
	BarChart,
	Dashboard,
	Layers,
	People,
	ShoppingCart,
} from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

export const mainListItems = (
	<React.Fragment>
		<ListItemButton>
			<ListItemIcon sx={{ pl: 2 }}>
				<Dashboard color="primary" />
			</ListItemIcon>
			<ListItemText primary="Dairy & Eggs" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon sx={{ pl: 2 }}>
				<ShoppingCart color="primary" />
			</ListItemIcon>
			<ListItemText primary="Breakfast" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon sx={{ pl: 2 }}>
				<People color="primary" />
			</ListItemIcon>
			<ListItemText primary="Frozen" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon sx={{ pl: 2 }}>
				<BarChart color="primary" />
			</ListItemIcon>
			<ListItemText primary="Vegetables" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon sx={{ pl: 2 }}>
				<Layers color="primary" />
			</ListItemIcon>
			<ListItemText primary="Fruits" />
		</ListItemButton>
	</React.Fragment>
);
