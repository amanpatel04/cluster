import { login, logout } from '../features/auth/auth'
import { store } from '../state/store'

const apiGateway = async (url, method, data, controller) => {
  const opts = {
    'method': method,
    'credentials': 'include'
  }

  if (method === 'POST' || method === 'PUT') {
    opts['body'] = data;
  }
  if (controller !== undefined) {
    opts['signal'] = controller.signal;
  }

  try {
    let response = await fetch(url, opts);
    let data = await response.json();
    if (data.success) {
      return data;
    } else if (data.statusCode === 401) {
      response = await fetch('/api/v1/user/renew/', {
        'method': 'GET',
        'credentials': 'include'
      });
      data = await response.json();
      if (data.success) {
        store.dispatch(login());
        console.log('Renew token')
        return await apiGateway(url, method, data);
      }
    }
    store.dispatch(logout())
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export default apiGateway;
