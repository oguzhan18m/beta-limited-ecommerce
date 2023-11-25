export interface IProduct {
	id: string;
	name: string;
	price: number;
	originalPrice: number;
	rating: number;
	image: string | null;
	discount: string | null;
}
