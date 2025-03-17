import { Icon } from "@iconify/react/dist/iconify.js";
import { formatEther } from "ethers";
import React from "react";
import { truncateString } from "../../utils";
import { useAppContext } from "../../contexts/appContext";

const NFTCard = ({ metadata, mintPrice, tokenId, nextTokenId, mintNFT }) => {
    const { ownedTokens } = useAppContext();
    const isOwned = ownedTokens.includes(tokenId);
    const canMint = Number(nextTokenId) === tokenId && !isOwned;

    return (
        <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="aspect-square overflow-hidden">
                <img
                    src={metadata.image}
                    alt={`${metadata.name} image`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
            </div>
            
            <div className="p-4">
                <h1 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                    {metadata.name}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {truncateString(metadata.description, 100)}
                </p>

                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Icon icon="ri:file-list-3-line" className="w-5 h-5" />
                        <span className="text-sm">{metadata.attributes.length} Attributes</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Icon icon="ri:eth-line" className="w-5 h-5" />
                        <span className="text-sm font-medium">{`${formatEther(mintPrice)} ETH`}</span>
                    </div>

                    <button
                        disabled={!canMint}
                        onClick={mintNFT}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2
                            ${isOwned 
                                ? 'bg-green-500 text-white cursor-default'
                                : canMint
                                    ? 'bg-primary text-secondary hover:bg-primary/90'
                                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            }`}
                    >
                        {isOwned ? (
                            <>
                                <Icon icon="ri:check-line" className="w-5 h-5" />
                                Owned
                            </>
                        ) : (
                            <>
                                <Icon icon="ri:coin-line" className="w-5 h-5" />
                                {canMint ? 'Mint NFT' : 'Not Available'}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Token ID Badge */}
            <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                #{tokenId}
            </div>
        </div>
    );
};

export default NFTCard;
