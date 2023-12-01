import React from "react";
import AppThemeProvider from "./theme/AppThemeProvider";
import AppLayout from "./layout/AppLayout";
import Products from "./pages/products/Products";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { axiosInt } from "./utils/axios";

const queryClient = new QueryClient();

function App() {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	React.useEffect(() => {
		const sessionId = window.localStorage.getItem("sessionId");

		if (sessionId) {
			axiosInt.defaults.headers.common["Session-ID"] = sessionId;
			setIsLoading(false);
		} else {
			setIsLoading(true);
			handleCreateSession();
		}
	}, []);

	const handleCreateSession = async () => {
		const res = await axiosInt.get("/createsession").then((res) => res.data);
		if (res) {
			axiosInt.defaults.headers.common["Session-ID"] = res;
			window.localStorage.setItem("sessionId", res);
			setIsLoading(false);
		}
	};

	return (
		<AppThemeProvider>
			<QueryClientProvider client={queryClient}>
				<AppLayout>
					<Products isLoading={isLoading} />
					<ReactQueryDevtools initialIsOpen={false} />
				</AppLayout>
			</QueryClientProvider>
		</AppThemeProvider>
	);
}

export default App;
