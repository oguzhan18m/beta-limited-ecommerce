import React from "react";
import AppThemeProvider from "./theme/AppThemeProvider";
import AppLayout from "./layout/AppLayout";
import Products from "./pages/products/Products";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
	return (
		<AppThemeProvider>
			<QueryClientProvider client={queryClient}>
				<AppLayout>
					<Products />
					<ReactQueryDevtools initialIsOpen={false} />
				</AppLayout>
			</QueryClientProvider>
		</AppThemeProvider>
	);
}

export default App;
