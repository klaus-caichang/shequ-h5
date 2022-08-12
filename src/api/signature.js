import request from '@/utils/request';
import { DOMAINS } from '@/utils/config';

// const appletsSignature = `${DOMAINS.LUBAN}/website-open-api/applets/signature`;

const UDB = `${DOMAINS.UDB}/api`;
const udbSign = `${UDB}/udb/wechat/applet/sign`;

export function getSignature(data) {
  return request.post({
    url: udbSign,
    data,
  });
}
