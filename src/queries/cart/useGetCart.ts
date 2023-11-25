import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { QueryKeys } from "../query-keys";
import { IProduct } from "../../types/products";
import { axiosInt } from "../../utils/axios";
import { ICardItem } from "../../types/cart";

const keys = {
	all: [QueryKeys.GET_CART] as const,
	byParams: () => [...keys.all],
};

export const useGetCart = (
	options?: UseQueryOptions<
		ICardItem[] | undefined,
		Error,
		ICardItem[] | undefined,
		readonly [...string[]]
	>
): UseQueryResult<ICardItem[] | undefined, Error> => {
	return useQuery<
		ICardItem[] | undefined,
		Error,
		ICardItem[] | undefined,
		readonly [...string[]]
	>(
		keys.byParams(),
		async () => await axiosInt.get("/view-cart").then((res) => res.data),
		options
	);
};
