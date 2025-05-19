const makePostRequest = async (url, formData, auth) => {
    const response = await fetch(`/api/v1/${url}`, {
        method: 'POST',
        credentials: auth ? 'include' : 'omit',
        body: formData,
    });
    if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
};

export default makePostRequest;
