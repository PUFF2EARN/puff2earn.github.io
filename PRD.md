# PUFF-CHAIN — Web3.0 电子雾化平台

## 项目结构

```
cyber-vape/
├── index.html          # 首页（9 板块 + 三语）
├── style.css           # 全局样式（赛博朋克暗色主题）
├── web3.js             # Web3 连接模块（MetaMask + 合约交互）
├── store.html          # 商店（购物车 + 下单 + PUFF 奖励）
├── wallet.html         # 钱包（PUFF 余额 + NFT + 扫码记录）
├── register.html       # 注册/登录（邮箱 + MetaMask）
├── scan.html           # 扫码验证（追溯 + NFT 铸造）
├── 404.html            # 自定义 404 页面
├── CNAME               # 自定义域名绑定
├── PRD.md              # 产品需求
└── contracts/          # 智能合约
    ├── PuffNFT.sol     # ERC-721 NFT 合约
    ├── PuffToken.sol   # ERC-20 PUFF 代币合约
    ├── PuffTrace.sol   # 产品溯源存证合约
    ├── package.json
    ├── hardhat.config.js
    └── scripts/
        └── deploy.js   # 部署脚本
```

## Web3 架构

### 合约

| 合约 | 类型 | 功能 |
|------|------|------|
| **PuffNFT.sol** | ERC-721 | 扫码铸造 NFT，存储产品溯源信息 |
| **PuffToken.sol** | ERC-20 | 平台激励代币（1 亿总量，含锁仓 + 生态池 + 空投） |
| **PuffTrace.sol** | 自定义 | 产品全链路链上溯源（生产→质检→物流→激活） |

### 前端交互

```
用户                    MetaMask                Web3.js                合约
 │                         │                        │                   │
 ├─ 连接钱包 ───────────► provider/signer ───────► connectWallet()
 │                         │                        │
 ├─ 查看 PUFF ──────────► 读链上余额 ───────────► getPuffBalance() ←── PuffToken.balanceOf()
 │                         │                        │
 ├─ 扫码铸造 NFT ──────► 发送交易 ───────────────► mintNFT() ←──────── PuffNFT.mintNFT()
 │                         │                        │
 ├─ 创建产品溯源 ──────► 发送交易 ───────────────► createTrace() ←──── PuffTrace.createTrace()
 │                         │                        │
 └─ 查看溯源 ──────────► 读链上数据 ──────────────► getTrace() ←───── PuffTrace.getTraceInfo()
```

### 双通道模式

- **链上模式**: MetaMask 已安装 → 真实以太坊交易
- **本地模式**: 无 MetaMask → fallback 到 localStorage 模拟（功能完整，数据脱链）

### 部署

```
# 本地测试
cd contracts
npm install
npx hardhat node          # 启动本地链
npx hardhat run scripts/deploy.js --network localhost  # 部署合约

# 测试网（需环境变量: SEPOLIA_RPC_URL, PRIVATE_KEY）
npx hardhat run scripts/deploy.js --network sepolia

# 前端配置
编辑 web3.js 中的 CONFIG 对象，填入合约地址
```

## 上线的完整商业流程

1. **用户注册** → 生成钱包（本地）或连接 MetaMask
2. **选购产品** → 加入购物车 → 填写收货信息 → 下单
3. **获得 PUFF** → 下单奖励到用户账户余额
4. **扫码验证** → 扫码查看产品溯源 → 铸造 NFT → 钱包展示
5. **管理后台** → 产品/订单/用户/NFT/合伙人/内容/系统设置
