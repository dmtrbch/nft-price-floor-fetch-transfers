const fetchTransfers = async (contractAddress: string, web3Provider: any | undefined, contract: any | undefined, topics: string[] | undefined, eventName: string | undefined) => {

    if(contract) {
        return await contract.getPastEvents(eventName, {
            fromBlock: 14600000,
            toBlock: 'latest'
        })
    }
    else {
        return await web3Provider.eth.getPastLogs({
            fromBlock: 13400000,
            toBlock: 'latest',
            address: contractAddress,
            topics: topics
        })
    }
}

export const fetchTransfersVerfiedContract = (contractAddress: string, contract: any, eventName: string) => fetchTransfers(contractAddress, undefined, contract, undefined, eventName)

export const fetchTransfersUnverfiedContract = (contractAddress: string, web3Provider: any, topics: string[]) => fetchTransfers(contractAddress, web3Provider, undefined, topics, undefined)