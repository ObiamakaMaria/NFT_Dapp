import { Contract } from "ethers";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getReadOnlyProvider } from "../utils";
import NFT_ABI from "../ABI/nft.json";
import { useAccount } from "wagmi";

const appContext = createContext();

export const useAppContext = () => {
    const context = useContext(appContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [nextTokenId, setNextTokenId] = useState(null);
    const [maxSupply, setMaxSupply] = useState(null);
    const [baseTokenURI, setBaseTokenURI] = useState("");
    const [tokenMetaData, setTokenMetaData] = useState(new Map());
    const [mintPrice, setMintPrice] = useState(null);
    const [ownedTokens, setOwnedTokens] = useState([]);
    const { address } = useAccount();

    const refreshOwnedTokens = useCallback(async () => {
        if (!address || !maxSupply) return;
        
        const contract = new Contract(
            import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
            NFT_ABI,
            getReadOnlyProvider()
        );

        try {
            const owned = [];
            for (let i = 0; i < Number(maxSupply); i++) {
                try {
                    const owner = await contract.ownerOf(i);
                    if (owner.toLowerCase() === address.toLowerCase()) {
                        owned.push(i);
                    }
                } catch (e) {
                    // Skip if token doesn't exist yet
                    continue;
                }
            }
            setOwnedTokens(owned);
        } catch (error) {
            console.error("Error fetching owned tokens:", error);
        }
    }, [address, maxSupply]);

    useEffect(() => {
        const contract = new Contract(
            import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
            NFT_ABI,
            getReadOnlyProvider()
        );

        contract
            .nextTokenId()
            .then((id) => setNextTokenId(id))
            .catch((error) => console.error("error: ", error));

        contract
            .baseTokenURI()
            .then((uri) => setBaseTokenURI(uri))
            .catch((error) => console.error("error: ", error));

        contract
            .maxSupply()
            .then((supply) => setMaxSupply(supply))
            .catch((error) => console.error("error: ", error));

        contract
            .mintPrice()
            .then((price) => setMintPrice(price))
            .catch((error) => console.error("error: ", error));
    }, []);

    useEffect(() => {
        if (!maxSupply || !baseTokenURI) return;
        const tokenIds = [];
        for (let i = 0; i < maxSupply; i++) {
            tokenIds.push(i);
        }

        const promises = tokenIds.map((id) => {
            return fetch(`${baseTokenURI}${id}.json`)
                .then((response) => response.json())
                .then((data) => {
                    return data;
                });
        });

        Promise.all(promises)
            .then((responses) => {
                const tokenMetaData = new Map();
                responses.forEach((response, index) => {
                    tokenMetaData.set(index, response);
                });
                setTokenMetaData(tokenMetaData);
            })
            .catch((error) => console.error("error: ", error));
    }, [baseTokenURI, maxSupply]);

    // Fetch owned tokens when address changes
    useEffect(() => {
        refreshOwnedTokens();
    }, [address, maxSupply, refreshOwnedTokens]);

    return (
        <appContext.Provider
            value={{
                nextTokenId,
                setNextTokenId,
                maxSupply,
                baseTokenURI,
                tokenMetaData,
                mintPrice,
                ownedTokens,
                setOwnedTokens,
                refreshOwnedTokens
            }}
        >
            {children}
        </appContext.Provider>
    );
};
