import request from '@/utils/request';
import { DOMAINS } from '@/utils/config';

const OPEN = `${DOMAINS.OPEN}/api`;

// 文章草稿详情
export function getArticalDraft(data) {
    return request.get({
        url: `${OPEN}/content/content/draftDetail`,
        data
    });
}

// 文章详情
export function getArtical(data) {
    return request.get({
        url: `${OPEN}/content/content/contentDetails`,
        data
    });
}

