import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAppContext } from "./contexts/appContext";
import NFTCard from "./components/NFTCard";
import useMintToken from "./hooks/useMintToken";
import OwnedTokens from "./components/OwnedTokens";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAccount } from "wagmi";

function App() {
    const { nextTokenId, tokenMetaData, mintPrice } = useAppContext();
    const { address } = useAccount();
    const [activeTab, setActiveTab] = useState("mint");
    const tokenMetaDataArray = Array.from(tokenMetaData.values());
    const mintToken = useMintToken();

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-128px)]">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary">
                        NFT Collection
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Mint and Manage Your NFTs
                    </p>
                </div>

                {address ? (
                    <>
                        <div className="flex justify-center mb-8">
                            <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
                                <button
                                    onClick={() => setActiveTab("mint")}
                                    className={`px-4 py-2 rounded-md transition-all ${
                                        activeTab === "mint"
                                            ? "bg-primary text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                >
                                    Mint NFTs
                                </button>
                                <button
                                    onClick={() => setActiveTab("owned")}
                                    className={`px-4 py-2 rounded-md transition-all ${
                                        activeTab === "owned"
                                            ? "bg-primary text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                >
                                    My NFTs
                                </button>
                            </div>
                        </div>

                        {activeTab === "mint" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {tokenMetaDataArray.map((token, i) => (
                                    <NFTCard
                                        key={token.name.split(" ").join("")}
                                        metadata={token}
                                        mintPrice={mintPrice}
                                        tokenId={i}
                                        nextTokenId={nextTokenId}
                                        mintNFT={mintToken}
                                    />
                                ))}
                            </div>
                        ) : (
                            <OwnedTokens />
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-lg">
                            <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
                            <p className="text-gray-600">
                                Please connect your wallet to start minting and managing your NFTs.
                            </p>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default App;
