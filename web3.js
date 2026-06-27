/**
 * PUFF-CHAIN Web3 连接模块
 * 连接 MetaMask，调用合约（NFT + Token + Trace）
 */

// ====== 合约地址（部署后替换） ======
const CONFIG = {
  // 默认：本地测试网
  localhost: {
    chainId: 31337,
    puffToken: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    puffNFT: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    puffTrace: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    rpcUrl: 'http://127.0.0.1:8545'
  },
  sepolia: {
    chainId: 11155111,
    puffToken: '0x30E308a5235ceE925e2fe21763e558E10d6c1547',
    puffNFT: '0xeb455684893E96316833809d75Bb08453b74a094',
    puffTrace: '0x3c5C67Ee8Bc30580e5F8737b93A09254AB9D76E0',
    rpcUrl: 'https://ethereum-sepolia.publicnode.com'
  },
  mainnet: {
    chainId: 1,
    puffToken: '',
    puffNFT: '',
    puffTrace: '',
    rpcUrl: 'https://eth.llamarpc.com'
  }
};

// ====== ERC-20 ABI（精简） ======
const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function reward(address to, uint256 value, string memory reason)',
  'function burn(uint256 value)',
  'event Transfer(address indexed from, address indexed to, uint256 value)'
];

// ====== ERC-721 NFT ABI（精简） ======
const ERC721_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint256)',
  'function ownerOf(uint256) view returns (address)',
  'function tokenURI(uint256) view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function mintNFT(address to, string memory tokenURI, string memory productName, string memory batchNo, string memory traceData) payable returns (uint256)',
  'function mintPrice() view returns (uint256)',
  'function productInfo(uint256) view returns (string productName, string batchNo, uint256 mintedAt, string traceData)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'event Mint(address indexed to, uint256 indexed tokenId, string productName)'
];

// ====== Trace ABI ======
const TRACE_ABI = [
  'function createTrace(string memory uid, string memory productName, string memory batchNo)',
  'function addEvent(string memory uid, string memory action, string memory location, string memory operator, string memory metadata)',
  'function activate(string memory uid, address consumer)',
  'function getTraceInfo(string memory uid) view returns (string productName, string batchNo, bool activated, address currentHolder, uint256 eventCount)',
  'function getEvent(string memory uid, uint256 index) view returns (string action, string location, string operator, uint256 timestamp, string metadata)',
  'function totalTraces() view returns (uint256)',
  'function getUID(uint256 index) view returns (string)'
];

// ====== Web3 状态 ======
const Web3State = {
  provider: null,
  signer: null,
  account: null,
  chainId: null,
  isConnected: false
};

// ====== 初始化 ======
async function initWeb3() {
  if (typeof window.ethereum === 'undefined') {
    console.warn('MetaMask not installed');
    return false;
  }
  try {
    Web3State.provider = new ethers.BrowserProvider(window.ethereum);
    return true;
  } catch (e) {
    console.error('Web3 init error:', e);
    return false;
  }
}

// ====== 连接钱包 ======
async function connectWallet() {
  if (!Web3State.provider) {
    const ok = await initWeb3();
    if (!ok) {
      alert('请安装 MetaMask 浏览器插件');
      return null;
    }
  }
  try {
    const accounts = await Web3State.provider.send('eth_requestAccounts', []);
    Web3State.signer = await Web3State.provider.getSigner();
    Web3State.account = accounts[0];
    Web3State.chainId = (await Web3State.provider.getNetwork()).chainId;
    Web3State.isConnected = true;

    // 监听账户/网络切换
    window.ethereum.on('accountsChanged', (accs) => {
      Web3State.account = accs[0] || null;
      Web3State.isConnected = !!accs[0];
      if (window.onWalletChange) window.onWalletChange(Web3State);
    });
    window.ethereum.on('chainChanged', () => window.location.reload());

    if (window.onWalletChange) window.onWalletChange(Web3State);
    return Web3State.account;
  } catch (e) {
    console.error('Connect error:', e);
    return null;
  }
}

// ====== 切换网络 ======
async function switchNetwork(chainId) {
  if (!Web3State.provider) return false;
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x' + chainId.toString(16) }]
    });
    return true;
  } catch (e) {
    // 网络不存在，尝试添加
    if (e.code === 4902) {
      const config = Object.values(CONFIG).find(c => c.chainId === chainId);
      if (!config) return false;
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x' + chainId.toString(16),
            chainName: chainId === 31337 ? 'Hardhat Local' : (chainId === 11155111 ? 'Sepolia Testnet' : 'Ethereum Mainnet'),
            rpcUrls: [config.rpcUrl],
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 }
          }]
        });
        return true;
      } catch (e2) {
        return false;
      }
    }
    return false;
  }
}

// ====== 获取合约实例 ======
function getTokenContract(address) {
  return new ethers.Contract(address, ERC20_ABI, Web3State.signer);
}

function getNFTContract(address) {
  return new ethers.Contract(address, ERC721_ABI, Web3State.signer);
}

function getTraceContract(address) {
  return new ethers.Contract(address, TRACE_ABI, Web3State.signer);
}

// ====== PUFF Token 交互 ======
async function getPuffBalance(address) {
  const cfg = getActiveConfig();
  if (!cfg || !cfg.puffToken) return '0';
  try {
    const c = getTokenContract(cfg.puffToken);
    const bal = await c.balanceOf(address);
    return ethers.formatEther(bal);
  } catch { return '0'; }
}

async function awardPuffs(to, amount) {
  const cfg = getActiveConfig();
  if (!cfg || !cfg.puffToken) return false;
  try {
    const c = getTokenContract(cfg.puffToken);
    const tx = await c.reward(to, ethers.parseEther(amount.toString()), 'purchase reward');
    await tx.wait();
    return true;
  } catch (e) {
    console.error('Award error:', e);
    return false;
  }
}

// ====== NFT 铸造 ======
async function mintNFT(to, name, batchNo, traceData, tokenURI) {
  const cfg = getActiveConfig();
  if (!cfg || !cfg.puffNFT) return null;
  try {
    const c = getNFTContract(cfg.puffNFT);
    const price = await c.mintPrice();
    const tx = await c.mintNFT(to, tokenURI || '', name, batchNo, traceData || '', { value: price });
    const receipt = await tx.wait();
    // 从事件中提取 tokenId
    for (const log of receipt.logs) {
      try {
        const parsed = c.interface.parseLog(log);
        if (parsed && parsed.name === 'Mint') {
          return { tokenId: parsed.args.tokenId.toString(), tx: tx.hash };
        }
      } catch {}
    }
    return { tokenId: 'unknown', tx: tx.hash };
  } catch (e) {
    console.error('Mint error:', e);
    return null;
  }
}

// ====== 溯源 ======
async function createProductTrace(uid, name, batchNo) {
  const cfg = getActiveConfig();
  if (!cfg || !cfg.puffTrace) return false;
  try {
    const c = getTraceContract(cfg.puffTrace);
    const tx = await c.createTrace(uid, name, batchNo);
    await tx.wait();
    return true;
  } catch (e) {
    console.error('Trace create error:', e);
    return false;
  }
}

async function getTrace(uid) {
  const cfg = getActiveConfig();
  if (!cfg || !cfg.puffTrace) return null;
  try {
    const c = getTraceContract(cfg.puffTrace);
    // 使用 staticCall 直接底层 ABI 解码
    const rawInfo = await c.getTraceInfo.staticCall(uid);
    const eventCount = Number(rawInfo.eventCount);
    const events = [];
    for (let i = 0; i < eventCount; i++) {
      try {
        const e = await c.getEvent.staticCall(uid, i);
        events.push({
          action: String(e.action),
          location: String(e.location),
          operator: String(e.operator_),
          timestamp: new Date(Number(e.timestamp) * 1000).toISOString(),
          metadata: String(e.metadata)
        });
      } catch(e2) {
        events.push({ action: 'decode_error', error: String(e2).slice(0,50) });
      }
    }
    return {
      productName: String(rawInfo.productName),
      batchNo: String(rawInfo.batchNo),
      activated: rawInfo.activated,
      currentHolder: rawInfo.currentHolder,
      events
    };
  } catch(e) {
    console.error('getTrace error:', e);
    return null;
  }
}

// ====== 工具 ======
function getActiveConfig() {
  if (Web3State.chainId === 31337) return CONFIG.localhost;
  if (Web3State.chainId === 11155111) return CONFIG.sepolia;
  if (Web3State.chainId === 1) return CONFIG.mainnet;
  return CONFIG.localhost;
}

function formatAddress(addr) {
  if (!addr) return '';
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}
