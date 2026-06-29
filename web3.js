/* ============================================================
   PUFF-CHAIN — Web3 module (ethers.js v5)
   MetaMask connect + PuffToken / PuffNFT / PuffTrace on Sepolia.
   Dual-channel: on-chain when wallet present, graceful local fallback otherwise.
   NOTE: contract addresses are PUBLIC. No private keys live in front-end code.
   ============================================================ */
(function () {
  const ADDR = {
    token: "0x30E308a5235ceE925e2fe21763e558E10d6c1547",
    nft:   "0xeb455684893E96316833809d75Bb08453b74a094",
    trace: "0x3c5C67Ee8Bc30580e5F8737b93A09254AB9D76E0",
  };
  const SEPOLIA = {
    chainId: "0xaa36a7", // 11155111
    chainName: "Sepolia Test Network",
    nativeCurrency: { name: "Sepolia ETH", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://ethereum-sepolia.publicnode.com"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  };
  const NETWORKS = {
    "0xaa36a7": "Sepolia",
    "0x1": "Mainnet",
    "0x7a69": "Hardhat Local", // 31337
  };

  const ABI = {
    token: [
      "function balanceOf(address) view returns (uint256)",
      "function totalSupply() view returns (uint256)",
      "function decimals() view returns (uint8)",
      "function symbol() view returns (string)",
    ],
    nft: [
      "function mintNFT(address to, string tokenURI, string name, string batchNo, string traceData) payable returns (uint256)",
      "function mintPrice() view returns (uint256)",
      "function balanceOf(address) view returns (uint256)",
      "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
      "function tokenURI(uint256) view returns (string)",
    ],
    trace: [
      "function getTraceInfo(string uid) view returns (string productName, string batchNo, bool activated, address currentHolder, uint256 eventCount)",
      "function getEvent(string uid, uint256 index) view returns (string action, string location, string operator_, uint256 timestamp, string metadata)",
    ],
  };

  const W3 = {
    ADDR, ABI, NETWORKS,
    provider: null, signer: null, account: null, chainId: null,

    hasMetaMask() { return typeof window.ethereum !== "undefined"; },
    short(a) { return a ? a.slice(0, 6) + "…" + a.slice(-4) : ""; },

    async connect() {
      if (!this.hasMetaMask()) throw { code: "NO_METAMASK" };
      if (typeof ethers === "undefined") throw { code: "NO_ETHERS" };
      const accts = await window.ethereum.request({ method: "eth_requestAccounts" });
      this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      this.signer = this.provider.getSigner();
      this.account = accts[0];
      this.chainId = await window.ethereum.request({ method: "eth_chainId" });

      window.ethereum.removeAllListeners?.("accountsChanged");
      window.ethereum.removeAllListeners?.("chainChanged");
      window.ethereum.on?.("accountsChanged", () => location.reload());
      window.ethereum.on?.("chainChanged", () => location.reload());

      // persist wallet to the logged-in user
      const app = window.PuffApp;
      const u = app && app.Users.current();
      if (u) app.Users.update(u.email, { wallet: this.account });

      return { account: this.account, chainId: this.chainId, network: this.networkName() };
    },

    networkName() { return NETWORKS[this.chainId] || "Unknown (" + this.chainId + ")"; },

    async switchToSepolia() {
      if (!this.hasMetaMask()) throw { code: "NO_METAMASK" };
      try {
        await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: SEPOLIA.chainId }] });
      } catch (e) {
        if (e.code === 4902) {
          await window.ethereum.request({ method: "wallet_addEthereumChain", params: [SEPOLIA] });
        } else throw e;
      }
    },

    contract(which, withSigner) {
      const base = (withSigner && this.signer) ? this.signer : this.provider;
      return new ethers.Contract(ADDR[which], ABI[which], base);
    },

    async ethBalance() {
      const wei = await this.provider.getBalance(this.account);
      return Number(ethers.utils.formatEther(wei));
    },

    async puffBalance() {
      try {
        const c = this.contract("token");
        const [raw, dec] = await Promise.all([c.balanceOf(this.account), c.decimals()]);
        return Number(ethers.utils.formatUnits(raw, dec));
      } catch { return 0; }
    },

    async myNFTs() {
      const out = [];
      try {
        const c = this.contract("nft");
        const bal = (await c.balanceOf(this.account)).toNumber();
        for (let i = 0; i < bal; i++) {
          try {
            const id = await c.tokenOfOwnerByIndex(this.account, i);
            let uri = "";
            try { uri = await c.tokenURI(id); } catch {}
            out.push({ id: id.toString(), uri });
          } catch {}
        }
      } catch {}
      return out;
    },

    async mintNFT({ to, tokenURI, name, batchNo, traceData }) {
      const c = this.contract("nft", true);
      let price = ethers.BigNumber.from(0);
      try { price = await c.mintPrice(); } catch {}
      const tx = await c.mintNFT(to || this.account, tokenURI, name, batchNo, traceData, { value: price });
      const receipt = await tx.wait();
      return { hash: tx.hash, receipt };
    },

    // getEvent returns multiple strings — use staticCall-style low level + per-event try/catch
    async getTrace(uid) {
      try {
        const c = this.contract("trace");
        const info = await c.getTraceInfo(uid);
        const count = info.eventCount.toNumber();
        const events = [];
        for (let i = 0; i < count; i++) {
          try {
            const ev = await c.getEvent(uid, i);
            events.push({ action: ev.action, location: ev.location, operator: ev.operator_, timestamp: ev.timestamp.toNumber(), metadata: ev.metadata });
          } catch {}
        }
        return { productName: info.productName, batchNo: info.batchNo, activated: info.activated, holder: info.currentHolder, events };
      } catch { return null; }
    },
  };

  window.PuffWeb3 = W3;
})();
