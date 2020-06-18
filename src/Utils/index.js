import dotenv from "dotenv";
dotenv.config();

const URL = process.env.REACT_APP_API_URL;
async function makeRequest({ url = URL, method, data, token }) {
	try {
		const res = await fetch(url, {
			method,
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		return handleResponse(res);
	} catch (err) {
		return handleError(err);
	}
}

const handleResponse = (res) => {
	if (res.status !== 200 && res.status !== 201) {
		throw new Error("Authentication Failed");
	}
	return res.json();
};

const handleError = (err) => {
	throw err;
};
export default makeRequest;
