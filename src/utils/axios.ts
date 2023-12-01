import axios from "axios";

export const axiosInt = axios.create({
	baseURL: "https://linkedin-cv-crawler.beta-limited.workers.dev/interview",
	headers: {
		Accept: "*/*",
		"Access-Control-Allow-Origin": "*",
	},
});
