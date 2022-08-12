import request from '@/utils/request';
import { DOMAINS } from '@/utils/config';

const OPEN = `${DOMAINS.OPEN}/api`;

export function getRecord(data) {
  return request.get({
    url: `${OPEN}/user/userCreator/getApplyRecord`,
    // url: `http://post.tanzk.com/mock/585/userCreator/getApplyRecord`,
    data,
  });
}

export function getOccupation(data) {
  return request.get({
    url: `${OPEN}/user/userCreator/getOccupation`,
    // url: `http://post.tanzk.com/mock/585/userCreator/getOccupation`,
    data,
  });
}

export function addUsrCreatorApply(data) {
  return request.post({
    url: `${OPEN}/user/userCreator/addUsrCreatorApply`,
    data,
  });
}
