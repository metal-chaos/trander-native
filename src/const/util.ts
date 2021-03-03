export const OK = 200
export const CREATED = 201
export const NO_RECORD = 404
export const INTERNAL_SERVER_ERROR = 500
export const UNPROCESSABLE_ENTITY = 422

export const DISTANCE_MSG = {
    10: '近所を散策しましょう',
    30: '自転車でお出かけしましょう',
    60: '車や電車でお出かけしましょう',
    100: '車や電車で遠出しましょう'
}

/**
 * クッキーの値を取得する
 * @param {String} searchKey 検索するキー
 * @returns {String} キーに対応する値
 */
export function getCookieValue(searchKey: string) {
    if (typeof searchKey === 'undefined') {
        return ''
    }

    let val = ''

    document.cookie.split(';').forEach(cookie => {
        const [key, value] = cookie.split('=')
        if (key === searchKey) {
            return val = value
        }
    })

    return val
}