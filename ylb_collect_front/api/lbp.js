const _ = require('lodash')
const crypto = require('crypto')
const axios = require('axios')

let _endpoint = null
let _apiKey = null
let _apiSecret = null

function init(endpoint, apiKey, apiSecret) {
    _endpoint = endpoint
    _apiKey = apiKey
    _apiSecret = apiSecret
}

function generateSignature(nonce, timestamp, method, uri, body) {
    // https://docs-blockchain.line.biz/api-guide/Authentication
    var signTarget = `${nonce}${timestamp}${method}${uri}`
    if (body) {
        if (signTarget.indexOf('?') < 0) {
            signTarget += '?'
        } else {
            signTarget += '&'
        }
        // TODO any way more neat?
        const objBody = body
        const flatPair = {}     // we're going to convert objBody to flatPair
        Object.keys(objBody).forEach(key => {
            const value = objBody[key]
            if (Array.isArray(value)) {
                // scan for all sub-keys
                let allSubKeys = []
                value.forEach(elem => {
                    allSubKeys = _.union(allSubKeys, Object.keys(elem))
                })
                // now we have keys for elements. fill-in flatPair
                value.forEach(elem => { // for each element on the array
                    allSubKeys.forEach(subKey => {
                        const flatKey = `${key}.${subKey}`
                        const flatRawValue = elem[subKey] ? elem[subKey] : ''
                        const prevFlatValue = flatPair[flatKey]
                        const flatValue = prevFlatValue == undefined ? flatRawValue : `${prevFlatValue},${flatRawValue}`
                        flatPair[flatKey] = flatValue
                    })
                })
            } else {
                flatPair[key] = objBody[key]
            }
        })
        const bodyPart = Object.keys(flatPair).sort().map(key => `${key}=${flatPair[key]}`).join('&')
        signTarget += bodyPart
    }

    const hmac = crypto.createHmac('sha512', _apiSecret)
    const signature = hmac.update(signTarget).digest('base64')
    return signature
}

//クエリーパラメータ付きの署名作成
function generateSignaturewithqueryparam(nonce, timestamp, method, uri, body, query_param) {
    let obj = _.assignIn(query_param, body);
    function createSignTarget() {
        let signTarget = `${nonce}${timestamp}${method}${uri}`;
        if (query_param && _.size(query_param) > 0) {
            if (signTarget.indexOf('?') < 0) {
                signTarget += '?'
            } else {
                signTarget += '&'
            }
        }
        return signTarget;
    }

    let signTarget = createSignTarget();
    if (obj && _.size(obj) > 0) {
        signTarget += flatten(obj);
    }
    console.log(signTarget)
    const hmac = crypto.createHmac('sha512', _apiSecret)
    const signature = hmac.update(signTarget).digest('base64')
    return signature
}
//flattenfunction
function flatten(requestBody = {}) {
    const objBody = _.cloneDeep(requestBody)
    const flatPair = {}
    Object.keys(objBody).forEach(key => {
        const value = objBody[key]
        if (Array.isArray(value)) {
            let allSubKeys = []
            value.forEach(elem => {
                allSubKeys = _.union(allSubKeys, Object.keys(elem))
            })

            value.forEach(elem => {
                allSubKeys.forEach(subKey => {
                    const flatKey = `${key}.${subKey}`
                    const flatRawValue = elem[subKey] ? elem[subKey] : EMPTY
                    const prevFlatValue = flatPair[flatKey]
                    flatPair[flatKey] =
                        _.isUndefined(prevFlatValue) ? flatRawValue : `${prevFlatValue},${flatRawValue}`
                })
            })
        } else {
            flatPair[key] = objBody[key]
        }
    })
    return Object.keys(flatPair).sort().map(key => `${key}=${flatPair[key]}`).join('&');
}

//以下のコードはしたのURLにしたがって実装されたし
//https://docs-blockchain.line.biz/ja/api-guide/category-item-tokens?id=mint-a-non-fungible
//sellerによるNFTの作成処理
async function sellerCreateNonfangibletoken(contractId, ownerAddress, ownerSecret, name, UserId) {
    const uri = `/v1/item-tokens/${contractId}/non-fungibles`
    const url = `${_endpoint}${uri}`
    const timestamp = new Date().getTime().toString()
    const nonce = timestamp.slice(-8)
    const hashHex = crypto.createHash('sha256').update(UserId, 'utf8').digest('hex');
    const meta = timestamp + "_5c4755b234c7d941f9555edb92a1dc75df77ff0f957cd5c387518d3b012caca4e9156f5ea97d3fc40dd7ae7cd093a264e2e9b6d71905d42ce91a28e066258f61_" + hashHex
    const reqBody = {
        ownerAddress,
        ownerSecret,
        name,
        meta
    }
    const signature = generateSignature(nonce, timestamp, 'POST', uri, reqBody)
    console.log(signature)
    const lbpResp = await axios.post(url, reqBody, {
        headers: {
            timestamp,
            'service-api-key': _apiKey,
            nonce,
            signature,
            'Content-Type': 'application/json'
        }
    })
    console.log('[lbp] response :', lbpResp.data)
    return lbpResp.data
}

//トランザクションhashid検索(NFTクリエイト用)
async function gettransactionresult(Txhash) {
    const uri = `/v1/transactions/${Txhash}`
    const url = `${_endpoint}${uri}`
    const timestamp = new Date().getTime().toString()
    const nonce = timestamp.slice(-8)
    const signature = generateSignature(nonce, timestamp, 'GET', uri, null)
    console.log(signature)
    const lbpResp = await axios.get(url, {
        headers: {
            'service-api-key': _apiKey,
            nonce,
            timestamp,
            signature
        }
    })
    console.log('[lbp] response :', lbpResp.data)
    return lbpResp.data
}

//発行されたNFTを買う動作のfunction
async function itemtokenpostmintNFT(name, meta, ownerAddress, ownerSecret, toUserId, contractId, tokenType) {
    const uri = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/mint`
    const url = `${_endpoint}${uri}`
    const timestamp = new Date().getTime().toString()
    const nonce = timestamp.slice(-8)
    const reqBody = {
        toUserId,
        name,
        meta,
        ownerAddress,
        ownerSecret
    }
    const signature = generateSignature(nonce, timestamp, 'POST', uri, reqBody)
    const lbpResp = await axios.post(url, reqBody, {
        headers: {
            timestamp,
            'service-api-key': _apiKey,
            nonce,
            signature,
            'Content-Type': 'application/json'
        }
    })
    return lbpResp.data
}

//NFTの複数購入用のfunction
async function itemtokenpostmultimintNFT(mintList, ownerAddress, ownerSecret, toUserId, contractId) {
    const uri = `/v1/item-tokens/${contractId}/non-fungibles/multi-mint`
    const url = `${_endpoint}${uri}`
    const timestamp = new Date().getTime().toString()
    const nonce = timestamp.slice(-8)
    const reqBody = {
        toUserId,
        ownerAddress,
        ownerSecret,
        mintList
    }
    const signature = generateSignature(nonce, timestamp, 'POST', uri, reqBody)
    const lbpResp = await axios.post(url, reqBody, {
        headers: {
            timestamp,
            'service-api-key': _apiKey,
            nonce,
            signature,
            'Content-Type': 'application/json'
        }
    })
    return lbpResp.data
}

//ユーザウォレットでNFTの総合計を取得するfunction
async function UsersitemtokengetbalanceNFT(toUserId, contracId) {
    const uri = `/v1/users/${toUserId}/item-tokens/${contracId}/non-fungibles`
    const url = `${_endpoint}${uri}`
    const timestamp = new Date().getTime().toString()
    const nonce = timestamp.slice(-8)
    const params = {
        'limit': 50,
        'orderBy': 'asc',
        'page': 1
    }
    const signature = generateSignaturewithqueryparam(nonce, timestamp, 'GET', uri, null, params)
    console.log(signature)
    const lbpResp = await axios.get(url, {
        params: {
            'limit': 50,
            'orderBy': 'asc',
            'page': 1,
        },
        headers: {
            timestamp,
            'service-api-key': _apiKey,
            nonce,
            signature
        }
    });
    return lbpResp.data
}
module.exports = {
    generateSignature,
    init,
    sellerCreateNonfangibletoken,
    gettransactionresult,
    itemtokenpostmintNFT,
    itemtokenpostmultimintNFT,
    UsersitemtokengetbalanceNFT
}