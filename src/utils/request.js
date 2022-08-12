import store from '@/store';

async function Request(options) {
  const { method = 'get', header, ...extra } = options;
  if (!['get', 'post'].includes(method)) throw `method ${method} is not supported`;
  const [err, { data } = {}] = await uni.request({
    ...extra,
    method,
    header: Request.mergeHeader(header),
  });
  if (err) throw err.errMsg;
  const { status, code } = data;
  const result = code || status;
  if (+result === 0 || result === undefined || result === 'SUCCESS') return data;
  throw data;
}

Request.mergeHeader = function (header = {}) {
  return { ...header, terminalType: 5, token: store.state.auth.token, productId: 1005 };
};

Request.get = function (options) {
  return Request({ ...options, method: 'get' });
};

Request.post = function (options) {
  return Request({ ...options, method: 'post' });
};

export default Request;
