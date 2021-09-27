import { Api } from "./Api";

export default class UserApi {
	static BASE_URL = 'http://localhost:8080/api/';

	static #api = null;

	static get client() {
		if (this.#api === null) {
			this.#api = Api.create(UserApi.BASE_URL);
		}

		return this.#api;
	}

	static get(userId, payload, parameters) {
		return UserApi.client.get(`usuarios/${userId}`, payload, parameters);
	}

	static getAll(payload, parameters) {
		// deveria ser:
		// return UserApi.client.post(`usuarios`, payload, parameters);

		// mas ta assim
		return UserApi.client.get(`cadastros`, payload, parameters);
	}

	static post(payload, parameters) {
		// deveria ser:
		// return UserApi.client.post(`usuarios`, payload, parameters);

		return UserApi.client.post(`cadastros`, payload, parameters);
	}
}