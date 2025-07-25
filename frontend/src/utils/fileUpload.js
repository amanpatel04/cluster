import { setProgress } from '../features/progress/progress';
import { store } from '../state/store';

import { useApiCall } from './UseApiCall';

const fileUpload = (url, formData) => {
    return new Promise((resolve, reject) => {
        useApiCall('/user/isloggedin').then((data) => {
            if (data.isLoggedIn) {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', `/api/v1${url}`, true);
                xhr.onload = () => {
                    if (xhr.status === 200 || xhr.status === 201) {
                        const data = JSON.parse(xhr.response);
                        store.dispatch(setProgress(0));
                        resolve(data);
                    } else {
                        reject(`Error code : ${xhr.status}`);
                    }
                };
                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentComplete =
                            (event.loaded / event.total) * 100;
                        store.dispatch(setProgress(percentComplete));
                    }
                };
                xhr.onerror = () => {
                    reject(`Error code : ${xhr.status}`);
                };

                xhr.withCredentials = true;
                xhr.send(formData);
            } else {
                reject('Error while authenticate');
            }
        });
    });
};

export default fileUpload;
