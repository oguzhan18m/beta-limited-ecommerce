import React from "react";
import { CardMedia } from "@mui/material";

const Logo: React.FC = () => {
	return (
		<CardMedia
			sx={{
				width: {
					xs: 80,
					md: 140,
					lg: 165,
				},
			}}
			component="img"
			image="https://beta.limited/assets/images/logo-dark.png"
		/>
	);
};

export default Logo;
