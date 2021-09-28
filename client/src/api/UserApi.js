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
		return UserApi.client.get(`cadastros`, payload, parameters);
	}

	static post(payload, parameters) {
		return UserApi.client.post(`cadastros`, payload, parameters);
	}
}