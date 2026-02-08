# Quick Start - MetaMask Integration

## Modern dApp Connection Standards

This integration follows modern dApp UX best practices:

✅ **Correct Flow:**
1. User clicks "Connect MetaMask"
2. `eth_requestAccounts` triggers MetaMask popup
3. User approves in MetaMask
4. Wallet connected

❌ **Outdated Flow (Not Used):**
- Showing install warnings before user clicks connect
- Blocking UI with MetaMask detection on load
- Premature error messages

**Key Rule:** Only show "install MetaMask" if connection attempt fails because MetaMask is missing.

## For Developers

### 1. Environment Setup

Create `.env` file:
```env
VITE_TREASURY_ADDRESS=0xYourTreasuryAddress
```

### 2. Install Dependencies

Already done:
```bash
npm install ethers
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Test MetaMask Connection

1. Open app in browser
2. Navigate to `/buy` page
3. Click "Connect with MetaMask Wallet"
4. Approve connection in MetaMask
5. Ensure you're on BSC (Chain ID 56)

### 5. Test Transaction (Use Testnet!)

⚠️ **Important:** Test on BSC Testnet first!

Update `src/services/web3.js`:
```js
// Change from:
const BSC_CHAIN_ID = 56;
// To:
const BSC_CHAIN_ID = 97; // BSC Testnet
```

Get testnet BNB from faucet:
- https://testnet.bnbchain.org/faucet-smart

## For Users

### Required:
1. **MetaMask Browser Extension**
   - Chrome: https://metamask.io/download/
   - Firefox: https://metamask.io/download/
   - Edge: https://metamask.io/download/

2. **BNB Smart Chain Network**
   - Will be added automatically on first connection

3. **BNB Balance**
   - Need BNB for transactions + gas fees

### Steps:
1. Visit website
2. Click "Buy $ZLN"
3. Click "Connect with MetaMask Wallet"
4. MetaMask popup opens automatically
5. Click "Approve" in MetaMask
6. Switch to BSC if prompted
7. Enter BNB amount
8. Confirm transaction in MetaMask
9. Wait for confirmation

## Connection States

### Idle
- Button shows: "Click to connect"
- User can click to initiate connection

### Connecting
- Button shows: "Waiting for MetaMask approval..."
- Spinner icon displays
- MetaMask popup is open

### Connected
- Shows wallet address (truncated)
- User can now make purchases

### Error
- Shows specific error message
- Examples:
  - "MetaMask is not detected. To continue, install MetaMask from: https://metamask.io/download/"
  - "Connection request rejected. Please approve the connection in MetaMask."
  - "Please switch MetaMask network to BNB Smart Chain."

## Troubleshooting

### "MetaMask is not detected"
**When shown:** After clicking connect
**Solution:** Install MetaMask extension from https://metamask.io/download/

### "Connection request rejected"
**When shown:** When user clicks "Reject" in MetaMask
**Solution:** Click connect again and approve in MetaMask

### "Connection request already pending"
**When shown:** When MetaMask popup already open
**Solution:** Check MetaMask browser extension popup

### "Please switch MetaMask network to BNB Smart Chain"
**When shown:** After connection, if on wrong network
**Solution:** Click switch button in MetaMask popup

### "Insufficient BNB balance"
→ Add BNB to your wallet

### "Transaction rejected by user"
→ You cancelled in MetaMask (normal)

### "Network error"
→ Check internet connection

## Key Files

```
src/
├── services/web3.js              ← Core Web3 logic
├── context/WalletContext.jsx     ← Wallet state
├── components/
│   └── MetaMaskConnectModal.jsx  ← Connect UI
└── pages/
    └── BuyZelion.jsx             ← Purchase page
```

## Production Checklist

Before going live:

- [ ] Set real treasury address in `.env`
- [ ] Test on BSC Mainnet with small amount
- [ ] Verify Chain ID is 56
- [ ] Test all error scenarios
- [ ] Review gas costs
- [ ] Document for users

## Support Contacts

- Technical Issues: Check browser console
- MetaMask Help: https://metamask.io/support/
- BSC Network: https://www.bnbchain.org/

## Network Info

**BSC Mainnet:**
- Chain ID: 56
- RPC: https://bsc-dataseed.binance.org/
- Explorer: https://bscscan.com/

**BSC Testnet:**
- Chain ID: 97
- RPC: https://data-seed-prebsc-1-s1.binance.org:8545/
- Explorer: https://testnet.bscscan.com/
