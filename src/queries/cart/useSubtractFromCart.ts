import { UseMutationOptions, useMutation } from "react-query";
import { axiosInt } from "../../utils/axios";

interface IData {
	productId: string;
}

export const useSubtractFromCart = (
	options?: Omit<
		UseMutationOptions<any, unknown, any, unknown>,
		"mutationFn" | "mutationKey"
	>
) => {
	return useMutation((data: IData) => {
		const { productId } = data;
		return axiosInt.post(`/subtract-from-cart?id=${productId}`);
	}, options);
};
