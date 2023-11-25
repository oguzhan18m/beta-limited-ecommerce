import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { QueryKeys } from "../query-keys";
import { IProduct } from "../../types/products";
import { axiosInt } from "../../utils/axios";

const keys = {
	all: [QueryKeys.GET_PRODUCTS] as const,
	byParams: () => [...keys.all],
};

export const useGetProducts = (
	options?: UseQueryOptions<
		IProduct[] | undefined,
		Error,
		IProduct[] | undefined,
		readonly [...string[]]
	>
): UseQueryResult<IProduct[] | undefined, Error> => {
	return useQuery<
		IProduct[] | undefined,
		Error,
		IProduct[] | undefined,
		readonly [...string[]]
	>(
		keys.byParams(),
		async () => await axiosInt.get("/products").then((res) => res.data),
		options
	);
};
