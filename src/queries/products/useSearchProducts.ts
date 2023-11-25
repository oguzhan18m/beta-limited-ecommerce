import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { QueryKeys } from "../query-keys";
import { IProduct } from "../../types/products";
import { axiosInt } from "../../utils/axios";

const keys = {
	all: [QueryKeys.SEARCH_PRODUCTS] as const,
	byParams: (name: string) => [...keys.all, name],
};

export const useSearchProducts = (
	name: string,
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
		keys.byParams(name),
		async () =>
			await axiosInt.get(`/search?name=${name}`).then((res) => res.data),
		options
	);
};
