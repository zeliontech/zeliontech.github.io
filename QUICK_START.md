# Quick Start Guide - Multi-Wallet System

## For Developers

### Setup (5 minutes)

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Get WalletConnect Project ID**:
   - Visit: https://cloud.walletconnect.com/
   - Sign up (free)
   - Create project
   - Copy Project ID

3. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   VITE_TREASURY_ADDRESS=0xYourBSCAddress
   VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
   ```

4. **Start development**:
   ```bash
   npm run dev
   ```

5. **Test the connection**:
   - Open http://localhost:8081
   - Click "Buy $ZLN"
   - Try connecting with your preferred method

### Testing Checklist

- [ ] Desktop: Connect with MetaMask extension
- [ ] Desktop: Generate and scan QR code
- [ ] Mobile: Test deep link to MetaMask app
- [ ] Verify network switches to BSC (Chain ID 56)
- [ ] Test transaction with small amount
- [ ] Test disconnect functionality

## For Users

### Desktop (With MetaMask Extension)

1. Click **"Buy $ZLN"** button
2. Click **"MetaMask Extension"** in modal
3. Approve connection in MetaMask popup
4. ✅ Connected!

### Desktop (Without Extension)

1. Click **"Buy $ZLN"** button
2. Click **"Scan with MetaMask"** in modal
3. Open MetaMask app on phone
4. Tap scan icon (top right)
5. Scan the QR code on screen
6. Approve connection in app
7. ✅ Connected!

### Mobile (Any Browser)

1. Click **"Buy $ZLN"** button
2. Click **"Connect with MetaMask"** in modal
3. MetaMask app will open automatically
4. Approve connection in app
5. Return to browser
6. ✅ Connected!

### Don't Have MetaMask?

1. Click **"Buy $ZLN"** button
2. Click **"Get MetaMask"** in modal
3. Choose your platform:
   - **iOS**: Download from App Store
   - **Android**: Download from Google Play
   - **Desktop**: Install browser extension
4. Scan QR code or click button to download
5. Return and connect!

## Connection Methods

| Device | MetaMask Extension | Connection Method |
|--------|-------------------|-------------------|
| 🖥️ Desktop | ✅ Installed | Direct connection via extension |
| 🖥️ Desktop | ❌ Not installed | WalletConnect QR code |
| 📱 Mobile | N/A | Deep link to MetaMask app |

## Purchasing $ZLN

After connecting:

1. **Check Network**: Must be on BNB Smart Chain
   - If wrong network, MetaMask will prompt to switch
   
2. **Enter BNB Amount**: Type amount you want to spend
   - Example: 0.1 BNB = 1,000 ZLN
   
3. **Review**: Check estimated ZLN amount
   - Exchange rate: 1 BNB = 10,000 ZLN
   
4. **Purchase**: Click "Purchase $ZLN"
   - Approve transaction in wallet
   - Wait for confirmation
   
5. **Success**: View transaction on BSCScan

## Network Requirements

- **Network**: BNB Smart Chain (BSC)
- **Chain ID**: 56
- **Currency**: BNB (for gas and payment)

**Important**: Only BSC is supported. Transactions on other networks will fail.

## Troubleshooting

### "MetaMask extension not detected"
- **Desktop**: Install MetaMask extension or use QR code
- **Mobile**: This is normal, use "Connect with MetaMask" button

### "Wrong network"
- Approve network switch when prompted
- Or manually switch to "BNB Smart Chain" in MetaMask

### "Transaction failed"
- Check BNB balance (need enough for amount + gas)
- Verify on BNB Smart Chain (not Ethereum)
- Try again with lower amount

### QR code not showing
- Check internet connection
- Contact admin to verify WalletConnect setup
- Try refreshing page

### Mobile redirect not working
- Make sure MetaMask app is installed
- Click "Get MetaMask" to download
- Try opening link in different browser

## Support

**Before asking for help:**
1. ✅ Check you're on BNB Smart Chain (Chain ID 56)
2. ✅ Verify you have BNB in wallet
3. ✅ Try disconnecting and reconnecting
4. ✅ Check this troubleshooting guide

**Need more help?**
- See [WALLET_SETUP.md](./WALLET_SETUP.md) for technical details
- Check [README.md](./README.md) for general info

## Security Tips

- ✅ Always verify you're on the correct website
- ✅ Never share your seed phrase
- ✅ Double-check transaction details before approving
- ✅ Only connect to trusted dApps
- ✅ Keep MetaMask updated

## Development Resources

- **Full Documentation**: See [WALLET_SETUP.md](./WALLET_SETUP.md)
- **Implementation Details**: See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- **WalletConnect Docs**: https://docs.walletconnect.com/
- **MetaMask Docs**: https://docs.metamask.io/
- **BSC Docs**: https://docs.bnbchain.org/

---

**Ready to get started? Click "Buy $ZLN" and connect your wallet!** 🚀
