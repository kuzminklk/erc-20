

import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useConnection } from "wagmi";
import { parseEther } from "viem";


const CONTRACT_ADDRESS = "0x93E34494ACdd8f7300c83254E08a19010921cCa2";

const CONTRACT_ABI = [
	{
		"type": "function",
		"name": "buyTokens",
		"inputs": [],
		"outputs": [],
		"stateMutability": "payable"
	}
] as const;

export function Buy() {
	const [etherAmount, setEtherAmount] = useState("0.01");
	const { isConnected } = useConnection();

	const { data: hash, error, isPending, writeContract } = useWriteContract();
	const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

	function handleBuy() {
		writeContract({
			address: CONTRACT_ADDRESS,
			abi: CONTRACT_ABI,
			functionName: "buyTokens",
			value: parseEther(etherAmount),
			gas: 300_000n
		})
	}

	return (
		<>
			{isConnected ? (
				<section>
					<div className="controllers">
						<div className="amount">
							<label><h3>Amount of Ether 💰 to spend:</h3></label>
							<input 
								type="number"
								value={etherAmount}
								step="0.01"
								onChange={(event) => setEtherAmount(event.target.value)}
								disabled={isPending || isConfirming}
							/>
						</div>
						<button 
							onClick={handleBuy}
							disabled={isPending || isConfirming}
						>
							{ isPending ? "Confirming in Wallet…" : isConfirming ? "Baking on chain…" : "Buy Strawberries! 🌿" }
						</button>
					</div>
					<div className="information">
						{isSuccess && <p>🎉 Success!</p>}
						{isConfirming && <p>⏱️ Transaction is being confirmed…</p>}
						{hash && <p>📜 Hash: {hash}</p>}
						{error && <p>‼️ {error.shortMessage}</p>}
					</div>
				</section>
			) : (
				<section className="skeleton">
					<div className="controllers">
						<div className="amount">
							<label><h3>Amount of Ether 💰 to spend:</h3></label>
							<input 
								type="number"
								placeholder="0.01"
								disabled
							/>
						</div>
						<button disabled>
							Buy Strawberries!<span className="emoji">⏳</span>
						</button>
					</div>
				</section>
			)}
		</>
	);
}