const makeGetRequest = async (url, auth) => {
	const response = await fetch(`api${url}`, {
		method: 'GET',
		credentials: auth ? 'include' : 'omit'
	});
	if (response.status == 200) {
		const data = await response.json();
		return data;
	} else {
		return {};
	}

}

export default  makeGetRequest
