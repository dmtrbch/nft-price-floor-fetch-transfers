import { fetchTransfersUnverfiedContract } from "./fetchTransfers"

export const unverifiedContractTransfers = async (web3: any, address: string, topics: string[]) => {
    const transferEvents = await fetchTransfersUnverfiedContract(address, web3, topics)
    return transferEvents
}