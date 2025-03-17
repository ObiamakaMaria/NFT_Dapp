import React, { useState } from 'react';
import { useAppContext } from '../../contexts/appContext';
import { Contract } from 'ethers';
import { useAccount, useConfig } from 'wagmi';
import { getEthersSigner } from '../../config/wallet-connection/adapter';
import NFT_ABI from '../../ABI/nft.json';

const OwnedTokens = () => {
    const { ownedTokens, tokenMetaData, refreshOwnedTokens } = useAppContext();
    const { address } = useAccount();
    const wagmiConfig = useConfig();
    const [transferTo, setTransferTo] = useState('');
    const [isTransferring, setIsTransferring] = useState(false);

    const handleTransfer = async (tokenId) => {
        if (!transferTo) {
            alert('Please enter recipient address');
            return;
        }

        try {
            setIsTransferring(true);
            const signer = await getEthersSigner(wagmiConfig);
            const contract = new Contract(
                import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
                NFT_ABI,
                signer
            );

            const tx = await contract.transferFrom(address, transferTo, tokenId);
            await tx.wait();
            
            await refreshOwnedTokens();
            setTransferTo('');
            alert('Token transferred successfully!');
        } catch (error) {
            console.error('Transfer error:', error);
            alert('Failed to transfer token. Please try again.');
        } finally {
            setIsTransferring(false);
        }
    };

    if (!ownedTokens.length) {
        return (
            <div className="text-center p-8">
                <h2 className="text-2xl font-bold mb-4">My NFTs</h2>
                <p className="text-gray-500">You don't own any NFTs yet.</p>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">My NFTs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ownedTokens.map((tokenId) => {
                    const metadata = tokenMetaData.get(tokenId);
                    if (!metadata) return null;
                    
                    return (
                        <div key={tokenId} className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                            <img
                                src={metadata.image}
                                alt={metadata.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="font-bold text-lg mb-2">{metadata.name}</h3>
                            <p className="text-sm text-gray-600 mb-4">{metadata.description}</p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Token #{tokenId}</span>
                                </div>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        placeholder="Enter recipient address (0x...)"
                                        value={transferTo}
                                        onChange={(e) => setTransferTo(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                    <button
                                        onClick={() => handleTransfer(tokenId)}
                                        disabled={isTransferring}
                                        className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:bg-gray-400"
                                    >
                                        {isTransferring ? 'Transferring...' : 'Transfer'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OwnedTokens; 