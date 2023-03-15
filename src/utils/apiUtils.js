import axios from "axios";
const REQUEST_TIMEOUT = 60000;
const URL_API = process.env.REACT_APP_CURRENT_API;
console.log(">>> URL_API", URL_API);
export default class APIUtils {
	accessToken = "";
	currentLanguage = "";

	static setAccessToken(token) {
		this.accessToken = `Bearer ${token}`;
		console.log("token", token);
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
					"Content-Type": "application/x-www-form-urlencoded",
					Accept: "application/json",
					Authorization: this.accessToken
				}
			};
			try {
				const response = await axios(request);
				console.log("response", response);
				const { error_code, error_message } = response.data;
				if (error_code == 0 && error_message === "success") {
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
					"Content-Type": "application/x-www-form-urlencoded",
					Accept: "application/json",
					Authorization: this.accessToken
				},
				data: JSON.stringify(postData)
			};
			try {
				const response = await axios(request);
				console.log("response", response);
				const { error_code, error_message } = response.data;
				if (error_code == 0 && error_message === "success") {
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
		var newFile = {
			...file,
			name: file.filename || file.fileName || "my_photo.jpg",
			type: file.type || "image/jpeg"
		};
		fd.append(name, newFile);

		return new Promise((resolve, reject) =>
			axios
				.post(`${URL_API}/${path}`, fd, {
					Accept: "application/json",
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: this.accessToken,
						...headers
					}
				})
				.then(response => {
					console.log(">>>>>>> Response>>>>>> : ", response);
					const { data } = response;
					resolve(data);
				})
				.catch(err => {
					console.log("[error]", { err });
					reject(err);
				})
		);
	}
}
