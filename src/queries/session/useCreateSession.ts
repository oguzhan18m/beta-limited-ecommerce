import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { QueryKeys } from "../query-keys";
import { axiosInt } from "../../utils/axios";

const keys = {
	all: [QueryKeys.CREATE_SESSION] as const,
	byParams: () => [...keys.all],
};

export const useCreateSession = (
	options?: UseQueryOptions<
		string | undefined,
		Error,
		string | undefined,
		readonly [...string[]]
	>
): UseQueryResult<string | undefined, Error> => {
	return useQuery<
		string | undefined,
		Error,
		string | undefined,
		readonly [...string[]]
	>(
		keys.byParams(),
		async () => await axiosInt.get("/createsession").then((res) => res.data),
		options
	);
};
