# Wallet Integration Setup Guide

This guide explains how the multi-wallet system works and how to configure it for your project.

## Overview

The Zelion Grid application supports multiple wallet connection methods to provide the best user experience across all devices:

1. **MetaMask Extension** (Desktop with extension installed)
2. **WalletConnect QR Code** (Desktop without extension)
3. **Mobile Deep Linking** (Mobile devices → MetaMask app)

## Connection Flow

### Desktop Users

#### With MetaMask Extension
1. User clicks "Buy $ZLN" button
2. Modal shows "Connect with MetaMask Extension" option
3. User clicks and approves in MetaMask extension
4. Connection established ✓

#### Without MetaMask Extension
1. User clicks "Buy $ZLN" button
2. Modal shows "Scan with MetaMask" option
3. User clicks to generate QR code
4. User scans QR with MetaMask mobile app
5. Connection established via WalletConnect ✓

### Mobile Users

#### In MetaMask App Browser
1. User clicks "Buy $ZLN" button
2. Direct connection via `window.ethereum`
3. Connection established ✓

#### In Regular Mobile Browser
1. User clicks "Buy $ZLN" button
2. Modal shows "Connect with MetaMask" option
3. User clicks and is redirected to MetaMask app
4. Deep link opens MetaMask with connection request
5. User approves and returns to browser
6. Connection established ✓

## Configuration

### 1. Environment Variables

Create a `.env` file in the project root:

```env
# Treasury address to receive BNB payments
VITE_TREASURY_ADDRESS=0xYourBSCWalletAddressHere

# Network configuration (BNB Smart Chain only)
VITE_CHAIN_ID=56
VITE_CHAIN_NAME=BNB Smart Chain

# WalletConnect Project ID (required for QR pairing)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

### 2. Get WalletConnect Project ID

**Steps:**
1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign up for a free account
3. Create a new project:
   - Project Name: "Zelion Grid" (or your project name)
   - Project URL: Your production domain
4. Copy the Project ID
5. Add to `.env` file as `VITE_WALLETCONNECT_PROJECT_ID`

**Important:** The free tier supports up to 1 million requests per month, which is sufficient for most projects.

### 3. Treasury Wallet Setup

Your treasury wallet address will receive all BNB payments from $ZLN purchases.

**Requirements:**
- Must be a valid BNB Smart Chain (BSC) address
- Must support BEP-20 tokens
- Recommended: Use a hardware wallet (Ledger, Trezor) for production

**Setup:**
1. Create or use existing BSC wallet
2. Add address to `.env` as `VITE_TREASURY_ADDRESS`
3. **Never commit `.env` to version control**

## Technical Architecture

### Components

#### MultiWalletModal (`src/components/MultiWalletModal.jsx`)
- Main connection modal with 3 states:
  - **Connect Options**: Shows available connection methods
  - **Scan QR**: Displays WalletConnect QR code
  - **Get MetaMask**: Shows download links and QR

#### WalletConnectQR (`src/components/WalletConnectQR.jsx`)
- Displays QR code for WalletConnect pairing
- Shows connection instructions
- Handles URI generation and display

#### WalletDownloadQR (`src/components/WalletDownloadQR.jsx`)
- Shows MetaMask download options
- Platform-specific buttons (iOS/Android/Extension)
- QR code for mobile app download

### Services

#### web3.js (`src/services/web3.js`)
- MetaMask connection and integration
- BNB transaction handling
- Network validation and switching
- Mobile deep linking

#### walletconnectService.js (`src/services/walletconnectService.js`)
- WalletConnect v2 integration
- QR code URI generation
- Session management
- Event listeners for connection/disconnection

### Utilities

#### deviceDetection.js (`src/utils/deviceDetection.js`)
- Device type detection (mobile/desktop)
- Browser detection (MetaMask app/regular browser)
- OS detection for download links
- Deep link generation for MetaMask app

### Context

#### WalletContext (`src/context/WalletContext.jsx`)
- Centralized wallet state management
- Supports both MetaMask and WalletConnect
- Connection method tracking
- Transaction handling for both methods
- Event listeners for account/network changes

## Supported Networks

**Currently supported:**
- BNB Smart Chain (Chain ID: 56) **ONLY**

**Not supported:**
- Ethereum Mainnet
- Other EVM chains
- Non-EVM chains

The application will automatically:
1. Detect current network
2. Request network switch to BSC if needed (MetaMask only)
3. Block transactions on wrong network

## Security Considerations

### Best Practices

1. **Never expose private keys**
   - All wallet interactions use signed sessions
   - Private keys remain in user's wallet

2. **Validate all transactions**
   - Check network (Chain ID 56)
   - Verify treasury address
   - Validate amounts

3. **Environment variables**
   - Never commit `.env` to git
   - Use different addresses for dev/production
   - Rotate WalletConnect Project ID if compromised

4. **Error handling**
   - User-friendly error messages
   - Handle connection rejections gracefully
   - Timeout handling for QR codes

### Transaction Security

All transactions follow this flow:
1. User connects wallet (signed session, no keys exposed)
2. User enters BNB amount
3. Network validation (must be BSC)
4. Transaction preview shown
5. User approves in wallet
6. Transaction submitted to blockchain
7. Success/failure feedback

## Testing

### Local Testing

```sh
# Start development server
npm run dev

# Test on local network
# Access via: http://192.168.1.X:8081
```

### Test Checklist

**Desktop with MetaMask Extension:**
- ✅ Connect via extension
- ✅ Network switch to BSC
- ✅ Send test transaction
- ✅ Disconnect

**Desktop without Extension:**
- ✅ QR code displays
- ✅ Scan with mobile app
- ✅ Connection established
- ✅ Transaction via WalletConnect

**Mobile (MetaMask App Browser):**
- ✅ Direct connection
- ✅ Transaction approval
- ✅ Return to app after approval

**Mobile (Regular Browser):**
- ✅ Deep link opens MetaMask
- ✅ Connection approved
- ✅ Returns to browser
- ✅ Transaction works

### Test Networks

For testing, consider using BSC Testnet:
- Chain ID: 97
- RPC: https://data-seed-prebsc-1-s1.binance.org:8545/
- Get test BNB from faucet

**Note:** Update `VITE_CHAIN_ID=97` in `.env` for testnet.

## Troubleshooting

### Common Issues

**"MetaMask extension not detected"**
- User doesn't have MetaMask extension
- → Show WalletConnect QR option
- → Show "Get MetaMask" download screen

**"Wrong network" error**
- User is on different network
- → For MetaMask: Auto-request network switch
- → For WalletConnect: Show manual instruction

**"Connection rejected"**
- User declined in wallet
- → Show error message with retry option

**QR code not displaying**
- Missing `VITE_WALLETCONNECT_PROJECT_ID`
- → Check `.env` configuration
- → Verify Project ID is valid

**Mobile redirect not working**
- User doesn't have MetaMask app
- → Show "Get MetaMask" screen
- → Provide App Store/Play Store links

## Production Deployment

### Pre-deployment Checklist

- ✅ Set production `VITE_TREASURY_ADDRESS`
- ✅ Set production `VITE_WALLETCONNECT_PROJECT_ID`
- ✅ Verify `VITE_CHAIN_ID=56` (BSC Mainnet)
- ✅ Test all connection methods
- ✅ Test actual BNB transactions
- ✅ Remove any test/debug code
- ✅ Build production bundle: `npm run build`

### Environment Setup

**Production `.env`:**
```env
VITE_TREASURY_ADDRESS=0xYourProductionAddress
VITE_CHAIN_ID=56
VITE_CHAIN_NAME=BNB Smart Chain
VITE_WALLETCONNECT_PROJECT_ID=your_production_project_id
```

### Deployment Steps

1. Build production bundle:
   ```sh
   npm run build
   ```

2. Deploy `dist/` folder to hosting:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Or any static hosting

3. Configure domain and SSL

4. Test all wallet connections on production

## Support

For issues or questions:
- Check this documentation first
- Review code comments in source files
- Test with BSC Testnet before mainnet
- Verify environment variables are correctly set

## References

- [WalletConnect Documentation](https://docs.walletconnect.com/)
- [MetaMask Developer Docs](https://docs.metamask.io/)
- [ethers.js Documentation](https://docs.ethers.org/)
- [BNB Smart Chain Documentation](https://docs.bnbchain.org/)
