import axios from "axios";

export default class Api {
	client;

	static create(base, configuration) {
		const client = axios.create(configuration);

		client.defaults.baseURL = base;

		if (configuration) {
			client.defaults = {
				...client.defaults,
				...configuration,
			};
		}

    const instance = new Api(client);

		return instance;
	}

	constructor(client) {
		this.client = client;
	}

	get(path, parameters) {
		return this.client.get(path, { params: parameters });
	}

	post(path, payload, parameters) {
		return this.client.post(path, payload, { params: parameters });
	}

	put(path, payload, parameters) {
		return this.client.put(path, payload, { params: parameters });
	}

	delete(path, payload, parameters) {
		return this.client.delete(path, {
			params: parameters,
			data: payload,
		});
	}

	request(path, payload, configuration) {
		return this.client.request({
			url: path,
			data: payload,
			...configuration,
		});
	}
}