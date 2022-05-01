import Web3 from "web3"

import dotenv from "dotenv"
dotenv.config()

import { verifiedContractTransfers } from "./verifiedContractTransfers";
import { unverifiedContractTransfers } from "./unverifiedContractTransfers";

const RPC_HOST: string = process.env.RPC_HOST!
const web3 = new Web3(RPC_HOST)


/*================== BORED APES ======================*/
const BORED_APES_ADDRESS: string = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'

const boredApesABI = require('../contracts/boredApesABI.json')
import { BoredApesABI } from "../types/web3-v1-contracts/BoredApesABI"

const boredApes = new web3.eth.Contract(boredApesABI, BORED_APES_ADDRESS) as any as BoredApesABI


/*================== GUTTER CATS ======================*/
const GUTTER_CATS_GANG_ADDRESS: string = '0xEdB61f74B0d09B2558F1eeb79B247c1F363Ae452'

const gutterCatGangABI = require('../contracts/gutterCatGangABI.json')
import { GutterCatGangABI } from "../types/web3-v1-contracts/GutterCatGangABI"

const gutterCatGang = new web3.eth.Contract(gutterCatGangABI, GUTTER_CATS_GANG_ADDRESS) as any as GutterCatGangABI


/*================== ROLLBOTS ======================*/
const ROLLBOTS_ADDRESS = '0x2f102E69cbcE4938CF7fB27ADb40fAd097A13668'
const rollbotsTransferEvent = ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']


async function main() {
    /*================== BORED APES ======================*/
    let boredApesTransfers = await verifiedContractTransfers(boredApes, BORED_APES_ADDRESS, 'Transfer')
    boredApesTransfers.forEach((transfer: any) => {
        console.log(`Bored Ape NFT ${transfer.returnValues.tokenId} transferred ${transfer.returnValues.from} -> ${transfer.returnValues.to}, Txn Hash: ${transfer.transactionHash}`)
    })

    /*================== GUTTER CATS ======================*/
    let gutterCatGangTransfers = await verifiedContractTransfers(gutterCatGang, GUTTER_CATS_GANG_ADDRESS, 'TransferSingle')
    gutterCatGangTransfers.forEach((transfer: any) => {
        console.log(`Gutter Cat NFT ${transfer.returnValues.id} transferred ${transfer.returnValues.from} -> ${transfer.returnValues.to}, Quantity: ${transfer.returnValues.value}, Txn Hash: ${transfer.transactionHash}`)
    })

    /*================== ROLLBOTS ======================*/
    let rollbotsTransfers = await unverifiedContractTransfers(web3, ROLLBOTS_ADDRESS, rollbotsTransferEvent)
    rollbotsTransfers.forEach((transfer: any) => {
        let from = transfer.topics[1].slice(0, 2) + transfer.topics[1].slice(26)
        let to = transfer.topics[2].slice(0, 2) + transfer.topics[2].slice(26)
        let tokenID = web3.utils.hexToNumber(transfer.topics[3])

        console.log(`Rollbot NFT ${tokenID} transferred ${from} -> ${to}, Txn Hash: ${transfer.transactionHash}`)
    })
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})