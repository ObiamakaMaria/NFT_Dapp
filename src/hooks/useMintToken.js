import React, { useCallback } from "react";
import { useAccount, useChainId, useConfig } from "wagmi";
import { useAppContext } from "../contexts/appContext";
import { Contract } from "ethers";
import NFT_ABI from "../ABI/nft.json";
import { getEthersSigner } from "../config/wallet-connection/adapter";
import { isSupportedNetwork } from "../utils";
// import { config } from "../config/wallet-connection/wagmi";

const useMintToken = () => {
    const { address } = useAccount();
    const chainId = useChainId();
    const wagmiConfig = useConfig();
    const { nextTokenId, maxSupply, mintPrice, setNextTokenId, refreshOwnedTokens } = useAppContext();

    return useCallback(async () => {
        if (!address) return alert("Please connect your wallet");
        if (!isSupportedNetwork(chainId)) return alert("Unsupported network");
        if (nextTokenId >= maxSupply) return alert("No more tokens to mint");

        const signer = await getEthersSigner(wagmiConfig);

        const contract = new Contract(
            import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
            NFT_ABI,
            signer
        );

        try {
            // Start the minting process
            const tx = await contract.mint({ value: mintPrice });
            
            // Wait for transaction confirmation
            const receipt = await tx.wait();
            if (receipt.status === 0) {
                throw new Error("Transaction failed");
            }

            // Find the Minted event in the receipt
            const mintedEvent = receipt.logs
                .map(log => {
                    try {
                        return contract.interface.parseLog(log);
                    } catch (e) {
                        return null;
                    }
                })
                .find(event => event && event.name === "Minted");

            if (mintedEvent) {
                const [to, tokenId] = mintedEvent.args;
                // Only update if the token was minted to the current user
                if (to.toLowerCase() === address.toLowerCase()) {
                    // Update next token ID
                    setNextTokenId(tokenId + 1n);
                    // Refresh owned tokens list
                    await refreshOwnedTokens();
                }
            }

            alert("Token minted successfully");
        } catch (error) {
            console.error("error: ", error);
            alert("Failed to mint token");
        }
    }, [address, chainId, maxSupply, mintPrice, nextTokenId, wagmiConfig, setNextTokenId, refreshOwnedTokens]);
};

export default useMintToken;
