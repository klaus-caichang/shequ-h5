
export function setStorage(key, data) {
    uni.setStorage({
        key: key,
        data,
    });
}
export function getStorage(key) {
    try {
        return uni.getStorageSync(key);
    } catch (e) {
        console.log('e', e);
    }
}
export function removeStorage(key) {
    uni.removeStorage({
        key: key,
    });
}
