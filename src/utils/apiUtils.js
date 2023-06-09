import axios from "axios";
const REQUEST_TIMEOUT = 60000;
const URL_API = process.env.REACT_APP_CURRENT_API;
let getToken = JSON.parse(localStorage.getItem("persist:auth"));
let tokens = getToken?.token;
export default class APIUtils {
	accessToken = tokens || "";
	currentLanguage = "";
	static setAccessToken(token) {
		this.accessToken = `${token}`;
	}
	static changeCurrentLanguage(value = "vn") {
		this.currentLanguage = value;
	}

	static getAccessToken() {
		return this.accessToken;
	}

	static get(path, params) {
		return new Promise(async (resolve, reject) => {
			let request = {
				url: `${URL_API}/${path}`,
				method: "GET",
				timeout: REQUEST_TIMEOUT,
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${
						this.accessToken || tokens.slice(1, tokens.length - 1)
					}`
				}
			};
			try {
				const response = await axios(request);
				const { status } = response;
				if (status === 200 || status === 201) {
					return resolve(response.data);
				} else {
					return reject(response.data);
				}
			} catch (error) {
				reject(error);
			}
		});
	}

	static post(path, postData, headers) {
		return new Promise(async (resolve, reject) => {
			let request = {
				url: `${URL_API}/${path}`,
				method: "POST",
				timeout: REQUEST_TIMEOUT,
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${
						this.accessToken || tokens.slice(1, tokens.length - 1)
					}`
				},
				data: JSON.stringify(postData)
			};
			try {
				const response = await axios(request);
				const { status } = response;
				if (status === 200 || status === 201) {
					return resolve(response.data);
				} else {
					return reject(response.data);
				}
			} catch (error) {
				reject(error);
			}
		});
	}

	static uploadFile(path, file, name, headers) {
		var fd = new FormData();
		fd.append(name, file);
		return new Promise((resolve, reject) =>
			axios
				.post(`${URL_API}/${path}`, fd, {
					headers: {
						"Content-Type": "multipart/form-data",
						authorization: `Bearer ${
							this.accessToken || tokens.slice(1, tokens.length - 1)
						}`
					}
				})
				.then(response => {
					const { status } = response;
					if (status === 200 || status === 201) {
						return resolve(response.data);
					} else {
						return reject(response.data);
					}
				})
				.catch(err => {
					reject(err);
				})
		);
	}
}
