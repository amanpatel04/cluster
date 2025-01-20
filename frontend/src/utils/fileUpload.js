const fileUpload = (url, formData) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `api${url}`, true);
        xhr.withCredentials = true;
        xhr.send(formData);
        xhr.onload = () => {
            if (xhr.status == 200 || xhr.status == 201) {
                const data = JSON.parse(xhr.response);
                resolve(data);
            } else {
                reject(`Error code : ${xhr.status}`);
            }
        };

        xhr.onerror = () => {
            reject(`Error code : ${xhr.status}`);
        };
        xhr.upload.onprogress = (e) => {
            const progress = Math.round((e.loaded / e.total) * 100);
            console.log(progress);
        };
    });
};

export default fileUpload;
