//LBD YLB Channelの環境変数まわり
const YLB_API_KEY = process.env.YLB_API_KEY
const YLB_API_SECRET = process.env.YLB_API_SECRET
const YLB_ENDPOINT = process.env.YLB_ENDPOINT
const YLB_OWNER_WALLET_ADDRESS = process.env.YLB_OWNER_WALLET_ADDRESS
const YLB_OWNER_WALLET_SECRET = process.env.YLB_OWNER_WALLET_SECRET
const YLB_CONTRACT_ID_ITEM = process.env.YLB_CONTRACT_ID_ITEM
const YLB_TOKEN_TYPE_LBCR = process.env.YLB_TOKEN_TYPE_LBCR

const lbp = require('./lbp')
lbp.init(YLB_ENDPOINT, YLB_API_KEY, YLB_API_SECRET)
//NFTデータを作成
async function CreateNFT(tokenName, UserId) {
    return await lbp.sellerCreateNonfangibletoken(
        YLB_CONTRACT_ID_ITEM,
        YLB_OWNER_WALLET_ADDRESS,
        YLB_OWNER_WALLET_SECRET,
        tokenName,
        UserId
    )
}
//NFTを一個だけ買う時
async function BuyNFT(name, toUserId, tokenType) {
    const meta = `${new Date().getTime()}|${tokenType}|${toUserId}`
    return await lbp.itemtokenpostmintNFT(
        name,
        meta,
        YLB_OWNER_WALLET_ADDRESS,
        YLB_OWNER_WALLET_SECRET,
        toUserId,
        YLB_CONTRACT_ID_ITEM,
        tokenType
    )
}
//NFTメッセージカードを送るとき時
async function SendMessageNFT(name, toUserId, tokenType) {
    const meta = 'One_message_card_in_the_world'
    return await lbp.itemtokenpostmintNFT(
        name,
        meta,
        YLB_OWNER_WALLET_ADDRESS,
        YLB_OWNER_WALLET_SECRET,
        toUserId,
        YLB_CONTRACT_ID_ITEM,
        tokenType
    )
}

//複数のNFTを同時に買う場合
async function MultiParchaiseNFT(mintList, toUserId) {
    return await lbp.itemtokenpostmultimintNFT(
        mintList,
        YLB_OWNER_WALLET_ADDRESS,
        YLB_OWNER_WALLET_SECRET,
        toUserId,
        YLB_CONTRACT_ID_ITEM
    )

}

//ユーザのNFTのバランス取得限定50個まで
async function GetNFTBalance(toUserId) {
    return lbp.UsersitemtokengetbalanceNFT(
        toUserId,
        YLB_CONTRACT_ID_ITEM
    )
}

module.exports = {
    CreateNFT,
    BuyNFT,
    MultiParchaiseNFT,
    GetNFTBalance,
    SendMessageNFT,
    YLB_API_KEY,
    YLB_API_SECRET,
    YLB_ENDPOINT,
    YLB_OWNER_WALLET_ADDRESS,
    YLB_OWNER_WALLET_SECRET,
    YLB_CONTRACT_ID_ITEM,
    YLB_TOKEN_TYPE_LBCR
}