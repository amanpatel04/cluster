const makeDeleteRequest = async (url, auth) => {
    const response = await fetch(`/api/v1${url}`, {
        method: 'DELETE',
        credentials: auth ? 'include' : 'omit',
    });
    if (response.status === 200) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
};

export default makeDeleteRequest;
