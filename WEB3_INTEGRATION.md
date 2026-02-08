# Web3 Integration - MetaMask & BNB

## Overview

Real MetaMask wallet integration for BNB transactions on BNB Smart Chain following modern dApp connection standards.

## Modern dApp Connection Flow

✅ **Correct Flow:**
1. User clicks "Connect MetaMask" button
2. Website sends `eth_requestAccounts` request
3. MetaMask popup opens automatically
4. User approves connection in MetaMask
5. Website receives wallet address → connected

❌ **Old/Incorrect Flow:**
- Showing "MetaMask required" warnings before user attempts connection
- Blocking UI with install messages on page load
- Disabling connect button preemptively

**Key Principle:** Only show "install MetaMask" messages AFTER connection attempt fails due to missing MetaMask.

## Features

✅ **MetaMask Connection**
- Uses modern `window.ethereum.request({ method: 'eth_requestAccounts' })`
- No premature install warnings
- Clean error handling with user-friendly messages

✅ **BNB Smart Chain Support**
- Chain ID: 56 (BNB Smart Chain Mainnet)
- Network validation after connection
- Automatic network switch prompts

✅ **Real Transactions**
- BNB to Wei conversion using ethers.js
- Transaction confirmation awaiting
- Balance updates after transactions

✅ **Error Handling**
- User rejection detection (code 4001)
- Pending request detection (code -32002)
- Insufficient funds errors
- Wrong network warnings
- MetaMask not detected (only after connection attempt)

## Installation

Already installed:
```bash
npm install ethers
```

## Environment Variables

Create `.env` file:

```env
VITE_TREASURY_ADDRESS=0xYourTreasuryWalletAddress
```

**Security:** Never commit `.env` file. Use `.env.example` as template.

## File Structure

```
src/
├── services/
│   └── web3.js              # Core Web3 functions
├── context/
│   └── WalletContext.jsx    # Wallet state management
├── components/
│   └── MetaMaskConnectModal.jsx
└── pages/
    └── BuyZelion.jsx        # Purchase interface
```

## Core Functions

### services/web3.js

#### `connectMetaMask()`
Connects to MetaMask wallet following modern dApp standards.

**Modern Implementation:**
```js
const accounts = await window.ethereum.request({ 
  method: "eth_requestAccounts" 
});
```

**Flow:**
1. Checks if `window.ethereum` exists
2. Sends `eth_requestAccounts` request (triggers MetaMask popup)
3. User approves in MetaMask
4. Returns wallet address
5. Validates BSC network

**Returns:** `string` - Wallet address

**Throws:**
- "MetaMask is not detected..." (only if MetaMask missing)
- "Connection request rejected..." (user rejected - code 4001)
- "Connection request already pending..." (code -32002)
- "Please switch MetaMask network to BNB Smart Chain." (wrong network)

#### `sendBNBTransaction(toAddress, amountBNB)`
Sends BNB transaction on BSC.

**Parameters:**
- `toAddress` (string) - Recipient wallet address
- `amountBNB` (string|number) - Amount in BNB (e.g., "0.1")

**Returns:** `Object`
```js
{
  success: true,
  txHash: "0x...",
  blockNumber: 12345,
  gasUsed: "21000"
}
```

**Throws:**
- "Transaction rejected by user."
- "Insufficient BNB balance to complete transaction."
- "Network error. Please check your connection."

#### `getBNBBalance(address)`
Gets BNB balance for wallet address.

**Returns:** `string` - Balance in BNB

#### `validateBSCNetwork()`
Validates user is on BNB Smart Chain (Chain ID 56).

**Throws:** Error if wrong network

#### `switchToBSC()`
Prompts MetaMask to switch to BSC or adds BSC if not present.

## Usage Example

### Connect Wallet

```jsx
import { useWallet } from "@/context/WalletContext";

function MyComponent() {
  const { connectMetaMaskWallet, walletAddress, chainId } = useWallet();

  const handleConnect = async () => {
    try {
      const address = await connectMetaMaskWallet();
      console.log("Connected:", address);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <button onClick={handleConnect}>
      {walletAddress ? `Connected: ${walletAddress}` : "Connect MetaMask"}
    </button>
  );
}
```

### Send BNB Transaction

```jsx
import { useWallet } from "@/context/WalletContext";

function BuyComponent() {
  const { purchaseZLNWithBNB } = useWallet();

  const handlePurchase = async () => {
    try {
      const result = await purchaseZLNWithBNB(0.1); // 0.1 BNB
      
      if (result.success) {
        console.log("Transaction Hash:", result.txHash);
        console.log("ZLN Received:", result.zlnAmount);
      } else {
        console.error("Transaction failed:", result.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handlePurchase}>Buy with 0.1 BNB</button>;
}
```

## Wallet Context State

```jsx
const {
  walletConnected,      // boolean - Wallet connection status
  walletAddress,        // string | null - Connected wallet address
  isConnecting,         // boolean - Connection in progress
  chainId,              // number | null - Current chain ID
  balance,              // string | null - BNB balance
  error,                // string | null - Last error message
  isMetaMaskAvailable,  // boolean - MetaMask detected
  connectMetaMaskWallet, // async function - Connect wallet
  disconnectWallet,     // function - Disconnect wallet
  purchaseZLNWithBNB,   // async function - Purchase ZLN
} = useWallet();
```

## Network Configuration

**BNB Smart Chain Mainnet:**
- Chain ID: 56 (0x38 in hex)
- Chain Name: BNB Smart Chain
- Currency: BNB
- RPC URL: https://bsc-dataseed.binance.org/
- Block Explorer: https://bscscan.com/

## Error Codes

| Code | Description | When Shown |
|------|-------------|------------|
| 4001 | User rejected request | After user clicks "Reject" in MetaMask |
| -32002 | Request already pending | When connection request already open in MetaMask |
| 4902 | Chain not added to MetaMask | When switching to BSC for first time |
| INSUFFICIENT_FUNDS | Not enough BNB | During transaction attempt |
| ACTION_REJECTED | Transaction rejected | User rejected transaction in MetaMask |

## UX Best Practices

✅ **DO:**
- Let user click connect before showing any MetaMask-related errors
- Use `window.ethereum.request({ method: 'eth_requestAccounts' })` for connection
- Show "Waiting for MetaMask approval..." during connection
- Display clear error messages only AFTER connection fails
- Validate network AFTER successful connection
- Handle all error codes appropriately

❌ **DON'T:**
- Show "install MetaMask" warnings before user attempts to connect
- Block UI with premature MetaMask checks
- Disable connect button based on MetaMask detection
- Show technical error codes to users
- Ignore user rejections
- Skip network validation

## Testing

### Manual Testing Checklist

1. **MetaMask Not Installed:**
   - [ ] Shows "MetaMask is required" error

2. **MetaMask Installed:**
   - [ ] Connect button appears
   - [ ] Connection request opens MetaMask
   - [ ] Address displays after connection

3. **Wrong Network:**
   - [ ] Shows "Switch to BSC" warning
   - [ ] Prompts network switch
   - [ ] Validates after switch

4. **BNB Transaction:**
   - [ ] Input accepts BNB amount
   - [ ] Shows transaction in MetaMask
   - [ ] Waits for confirmation
   - [ ] Updates balance after tx

5. **Error Handling:**
   - [ ] User rejection shows error
   - [ ] Insufficient funds detected
   - [ ] Network errors handled

### Test Network (Optional)

Use BSC Testnet for testing:
- Chain ID: 97
- RPC: https://data-seed-prebsc-1-s1.binance.org:8545/
- Explorer: https://testnet.bscscan.com/

Update `web3.js` to use testnet chain ID.

## Deployment

### Before Production:

1. **Set Treasury Address:**
   ```env
   VITE_TREASURY_ADDRESS=0xYourRealTreasuryAddress
   ```

2. **Verify Network:**
   - Ensure Chain ID 56 is configured
   - Test on mainnet with small amounts

3. **Security Audit:**
   - Review all transaction flows
   - Test error handling
   - Validate address format

4. **User Education:**
   - Provide MetaMask installation guide
   - Explain BSC network requirement
   - Document transaction fees

## Future Enhancements

Potential additions (not implemented):

- [ ] Gas price estimation
- [ ] Transaction speed options
- [ ] Token contract interaction
- [ ] Multi-wallet support
- [ ] Transaction history
- [ ] Slippage protection

## Support

For issues:
1. Check MetaMask is installed
2. Verify BSC network selected
3. Ensure sufficient BNB balance
4. Check browser console for errors

## License

Proprietary - Zelion Project
