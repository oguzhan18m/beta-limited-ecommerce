import React from "react";
import { Container, Grid, Skeleton, Typography } from "@mui/material";

const ProductsSkeleton: React.FC = () => {
	return (
		<Container maxWidth="lg">
			<Typography variant="h4" fontWeight="bold">
				Products
			</Typography>
			<Grid container spacing={2} mt={4}>
				{[...Array(3)]?.map((s, index) => (
					<Grid key={index} item xs={12} sm={6} lg={4}>
						<Skeleton
							key={index}
							variant="rectangular"
							sx={{ height: 398, borderRadius: 2 }}
						/>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default ProductsSkeleton;
