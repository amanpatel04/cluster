export const useApiCall = async (url) => {
    const respone = await fetch(`/api/v1${url}`, {
        method: 'GET',
        credentials: 'include',
    });

    let data = null;

    if (respone.status === 401) {
        const renew = await fetch(`/api/v1/user/renew`, {
            method: 'GET',
            credentials: 'include',
        });
        if (renew.status === 200) {
            const fallback = await fetch(`/api/v1${url}`, {
                method: 'GET',
                credentials: 'include',
            });
            console.log('Refresh');
            data = await fallback.json();
        } else {
            localStorage.removeItem('isLoggedIn');
            window.location.href = '/login';
        }
    } else if (respone.status === 200) {
        data = await respone.json();
    }

    return data;
};
