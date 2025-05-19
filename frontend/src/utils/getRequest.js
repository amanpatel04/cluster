const makeGetRequest = async (url, auth) => {
    const response = await fetch(`/api/v1/${url}`, {
        method: 'GET',
        credentials: auth ? 'include' : 'omit',
    });
    if (response.status === 200) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
};

export default makeGetRequest;
