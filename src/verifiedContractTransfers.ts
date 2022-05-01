import { fetchTransfersVerfiedContract } from "./fetchTransfers"

export const verifiedContractTransfers = async (contract: any, address: string, eventName: string) => {
    const transferEvents = await fetchTransfersVerfiedContract(address, contract, eventName)
    return transferEvents
}