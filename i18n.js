/* ============================================================
   PUFF-CHAIN — i18n (zh / en / ko)
   Usage: data-i18n="key" on element text; data-i18n-ph="key" for placeholder.
   PuffI18n.t('key') for JS strings. PuffI18n.setLang('en').
   ============================================================ */
(function () {
  const DICT = {
    zh: {
      // nav / common
      nav_home: "首页", nav_road: "路线", nav_nft: "藏品", nav_trace: "追溯",
      nav_store: "商店", nav_eco: "生态", nav_protocol: "协议", nav_about: "关于",
      nav_login: "注册 / 登录", nav_logout: "退出", nav_admin: "管理", nav_wallet: "钱包", nav_scan: "扫码",
      cart: "购物车", connect_wallet: "连接钱包", lang_name: "中文",
      // hero
      hero_title_a: "雾化即挖矿", hero_title_b: "PUFF2EARN",
      hero_lead: "全球首个电子雾化 Web3.0 数字生态 —— 产品链上溯源、扫码铸造 NFT、消费即获 PUFF 代币激励。",
      hero_cta_store: "进入商店", hero_cta_scan: "扫码验证",
      hero_st_products: "上架产品", hero_st_brands: "合作品牌", hero_st_chain: "链上存证", hero_st_lang: "支持语言",
      // sections
      road_tag: "路线图", road_title: "发展路线 Roadmap", road_sub: "从产品溯源到全链生态，分阶段构建去中心化雾化网络。",
      nft_tag: "数字藏品", nft_title: "PUFF NFT 藏品", nft_sub: "扫码激活产品即可铸造专属 ERC-721 数字藏品，记录设备全生命周期。",
      trace_tag: "链上溯源", trace_title: "全链路追溯", trace_sub: "每一件产品从生产到激活，全流程上链存证，不可篡改。",
      trace_s1: "生产", trace_s2: "质检", trace_s3: "物流", trace_s4: "激活",
      trace_s1d: "工厂铸造批次上链", trace_s2d: "质检报告哈希存证", trace_s3d: "物流节点实时记录", trace_s4d: "用户扫码激活确权",
      store_tag: "Web3 商店", store_title: "精选雾化产品", store_sub: "16 款主流品牌产品，链上下单，消费即获 PUFF 代币奖励。",
      store_all: "查看全部商店",
      eco_tag: "生态矩阵", eco_title: "PUFF 生态矩阵", eco_sub: "围绕代币与 NFT 构建的完整去中心化应用生态。",
      eco1: "PUFF 代币", eco1d: "ERC-20 平台激励通证，总量 1 亿",
      eco2: "NFT 市场", eco2d: "设备数字藏品铸造与流转",
      eco3: "链上溯源", eco3d: "产品全生命周期防伪存证",
      eco4: "消费挖矿", eco4d: "Puff2Earn 消费激励机制",
      eco5: "DAO 治理", eco5d: "社区投票决定生态发展",
      eco6: "质押收益", eco6d: "质押 PUFF 获取生态分红",
      partner_tag: "合作支持", partner_title: "合作品牌与支持",
      access_tag: "接入", access_title: "立即接入", access_sub: "扫描二维码体验完整 Web3 雾化生态。",
      qr_verify: "扫码验证", qr_verify_d: "验证产品真伪与溯源",
      qr_register: "注册账号", qr_register_d: "创建你的 PUFF 账户",
      qr_login: "扫码登录", qr_login_d: "快速登录平台",
      foot_about: "白皮书", foot_links: "导航", foot_resource: "资源", foot_community: "社区",
      foot_rights: "保留所有权利。", foot_tagline: "雾化 · 上链 · 激励",
      // store page
      sp_title: "Web3 雾化商店", sp_sub: "链上下单 · 消费挖矿 · 正品溯源",
      f_all: "全部", f_disposable: "一次性", f_pod: "换弹", f_refill: "注油", f_juice: "烟油",
      add_cart: "加入购物车", reward_label: "奖励", cart_empty: "购物车是空的",
      checkout: "去结算", total: "合计", remove: "移除", continue_shop: "继续购物",
      co_title: "结算信息", co_name: "收货人", co_phone: "手机号", co_addr: "收货地址",
      co_submit: "提交订单", co_back: "返回购物车", order_ok: "下单成功！获得 {n} PUFF 奖励",
      need_login: "请先登录后再下单", added: "已加入购物车",
      // wallet
      w_title: "我的钱包", w_sub: "MetaMask · Sepolia 测试网",
      w_connect: "连接 MetaMask", w_connected: "已连接", w_eth: "Sepolia ETH", w_puff: "PUFF 代币",
      w_nft: "我的 NFT 藏品", w_records: "扫码验证记录", w_network: "网络", w_no_nft: "暂无 NFT 藏品",
      w_no_records: "暂无验证记录", w_install: "请先安装 MetaMask 钱包扩展",
      // scan
      s_title: "扫码验证 · NFT 铸造", s_sub: "输入产品码验证真伪并铸造数字藏品",
      s_input_ph: "输入产品码 (例如 PUFF-0001)", s_verify: "验证产品", s_mint: "铸造 NFT",
      s_trace_title: "链上溯源信息", s_verified: "✓ 正品验证通过", s_notfound: "未找到该产品码",
      s_minting: "铸造中...", s_mint_ok: "NFT 铸造成功！", s_connect_first: "请先连接 MetaMask",
      s_product: "产品", s_batch: "批次", s_status: "状态",
      // auth
      a_login: "登录", a_register: "注册", a_email: "邮箱", a_pwd: "密码", a_pwd2: "确认密码",
      a_login_btn: "登 录", a_register_btn: "注 册", a_welcome: "欢迎回来",
      a_create: "创建账户开启 Puff2Earn 之旅", a_pwd_mismatch: "两次密码不一致",
      a_exists: "该邮箱已注册", a_no_user: "邮箱或密码错误", a_login_ok: "登录成功",
      a_reg_ok: "注册成功，已自动登录", a_logout_ok: "已退出登录",
      // about
      ab_title: "关于 PUFF-CHAIN", ab_sub: "重新定义电子雾化的数字未来",
      ab_intro: "PUFF-CHAIN 是全球首个电子雾化 Web3.0 数字生态平台。我们将区块链技术与雾化产品深度融合，实现产品全链路溯源、NFT 数字藏品铸造与消费即挖矿的代币激励体系，打造透明、可信、去中心化的雾化消费新范式。",
      ab_milestone: "里程碑", ab_team: "核心团队",
      // 404
      e_title: "页面迷失在链上", e_sub: "你访问的页面不存在或已被转移到其他区块。", e_home: "返回首页",
    },
    en: {
      nav_home: "Home", nav_road: "Roadmap", nav_nft: "NFT", nav_trace: "Trace",
      nav_store: "Store", nav_eco: "Ecosystem", nav_protocol: "Protocol", nav_about: "About",
      nav_login: "Sign In", nav_logout: "Logout", nav_admin: "Admin", nav_wallet: "Wallet", nav_scan: "Scan",
      cart: "Cart", connect_wallet: "Connect Wallet", lang_name: "English",
      hero_title_a: "Vape to Mine", hero_title_b: "PUFF2EARN",
      hero_lead: "The world's first Web3.0 digital ecosystem for vaping — on-chain product tracing, scan-to-mint NFTs, and earn PUFF tokens as you consume.",
      hero_cta_store: "Enter Store", hero_cta_scan: "Scan & Verify",
      hero_st_products: "Products", hero_st_brands: "Brands", hero_st_chain: "On-chain Proofs", hero_st_lang: "Languages",
      road_tag: "Roadmap", road_title: "Development Roadmap", road_sub: "From product tracing to a full on-chain ecosystem, built in phases.",
      nft_tag: "Collectibles", nft_title: "PUFF NFT Collection", nft_sub: "Scan to activate a product and mint a unique ERC-721 NFT recording its full lifecycle.",
      trace_tag: "On-chain Trace", trace_title: "Full-chain Traceability", trace_sub: "Every product is recorded on-chain from production to activation — tamper-proof.",
      trace_s1: "Produce", trace_s2: "Inspect", trace_s3: "Logistics", trace_s4: "Activate",
      trace_s1d: "Factory batch on-chain", trace_s2d: "QC report hash stored", trace_s3d: "Logistics nodes logged", trace_s4d: "User scan activation",
      store_tag: "Web3 Store", store_title: "Featured Products", store_sub: "16 top-brand products, on-chain checkout, earn PUFF rewards on every purchase.",
      store_all: "View Full Store",
      eco_tag: "Matrix", eco_title: "PUFF Ecosystem Matrix", eco_sub: "A complete decentralized app ecosystem around the token and NFTs.",
      eco1: "PUFF Token", eco1d: "ERC-20 utility token, 100M supply",
      eco2: "NFT Market", eco2d: "Mint & trade device collectibles",
      eco3: "On-chain Trace", eco3d: "Anti-counterfeit lifecycle proofs",
      eco4: "Consume to Mine", eco4d: "Puff2Earn reward mechanism",
      eco5: "DAO Governance", eco5d: "Community-voted development",
      eco6: "Staking Yield", eco6d: "Stake PUFF for ecosystem dividends",
      partner_tag: "Partners", partner_title: "Brand Partners & Backers",
      access_tag: "Access", access_title: "Get Started Now", access_sub: "Scan a QR code to experience the full Web3 vaping ecosystem.",
      qr_verify: "Scan Verify", qr_verify_d: "Verify authenticity & trace",
      qr_register: "Register", qr_register_d: "Create your PUFF account",
      qr_login: "Scan Login", qr_login_d: "Quick platform login",
      foot_about: "Whitepaper", foot_links: "Navigation", foot_resource: "Resources", foot_community: "Community",
      foot_rights: "All rights reserved.", foot_tagline: "Vape · Chain · Earn",
      sp_title: "Web3 Vape Store", sp_sub: "On-chain checkout · Consume to mine · Authentic trace",
      f_all: "All", f_disposable: "Disposable", f_pod: "Pod", f_refill: "Refillable", f_juice: "E-Juice",
      add_cart: "Add to Cart", reward_label: "Reward", cart_empty: "Your cart is empty",
      checkout: "Checkout", total: "Total", remove: "Remove", continue_shop: "Continue Shopping",
      co_title: "Checkout", co_name: "Recipient", co_phone: "Phone", co_addr: "Address",
      co_submit: "Place Order", co_back: "Back to Cart", order_ok: "Order placed! Earned {n} PUFF",
      need_login: "Please sign in before ordering", added: "Added to cart",
      w_title: "My Wallet", w_sub: "MetaMask · Sepolia Testnet",
      w_connect: "Connect MetaMask", w_connected: "Connected", w_eth: "Sepolia ETH", w_puff: "PUFF Token",
      w_nft: "My NFT Collection", w_records: "Scan Records", w_network: "Network", w_no_nft: "No NFTs yet",
      w_no_records: "No records yet", w_install: "Please install the MetaMask extension first",
      s_title: "Scan Verify · Mint NFT", s_sub: "Enter a product code to verify and mint a collectible",
      s_input_ph: "Enter product code (e.g. PUFF-0001)", s_verify: "Verify", s_mint: "Mint NFT",
      s_trace_title: "On-chain Trace Info", s_verified: "✓ Authentic", s_notfound: "Product code not found",
      s_minting: "Minting...", s_mint_ok: "NFT minted!", s_connect_first: "Connect MetaMask first",
      s_product: "Product", s_batch: "Batch", s_status: "Status",
      a_login: "Login", a_register: "Register", a_email: "Email", a_pwd: "Password", a_pwd2: "Confirm Password",
      a_login_btn: "Sign In", a_register_btn: "Sign Up", a_welcome: "Welcome back",
      a_create: "Create an account to start Puff2Earn", a_pwd_mismatch: "Passwords do not match",
      a_exists: "Email already registered", a_no_user: "Wrong email or password", a_login_ok: "Signed in",
      a_reg_ok: "Registered & signed in", a_logout_ok: "Logged out",
      ab_title: "About PUFF-CHAIN", ab_sub: "Redefining the digital future of vaping",
      ab_intro: "PUFF-CHAIN is the world's first Web3.0 digital ecosystem for vaping. We deeply integrate blockchain with vape products to enable full traceability, NFT minting, and a consume-to-earn token economy — building a transparent, trusted, decentralized new paradigm for vaping.",
      ab_milestone: "Milestones", ab_team: "Core Team",
      e_title: "Lost on the chain", e_sub: "The page you requested doesn't exist or moved to another block.", e_home: "Back Home",
    },
    ko: {
      nav_home: "홈", nav_road: "로드맵", nav_nft: "NFT", nav_trace: "추적",
      nav_store: "스토어", nav_eco: "생태계", nav_protocol: "프로토콜", nav_about: "소개",
      nav_login: "로그인", nav_logout: "로그아웃", nav_admin: "관리", nav_wallet: "지갑", nav_scan: "스캔",
      cart: "장바구니", connect_wallet: "지갑 연결", lang_name: "한국어",
      hero_title_a: "흡입하며 채굴", hero_title_b: "PUFF2EARN",
      hero_lead: "세계 최초의 전자담배 Web3.0 디지털 생태계 — 온체인 제품 추적, 스캔 NFT 발행, 소비 시 PUFF 토큰 보상.",
      hero_cta_store: "스토어 입장", hero_cta_scan: "스캔 인증",
      hero_st_products: "제품", hero_st_brands: "브랜드", hero_st_chain: "온체인 증명", hero_st_lang: "지원 언어",
      road_tag: "로드맵", road_title: "개발 로드맵", road_sub: "제품 추적부터 완전한 온체인 생태계까지 단계별 구축.",
      nft_tag: "컬렉션", nft_title: "PUFF NFT 컬렉션", nft_sub: "스캔으로 제품을 활성화하고 전체 수명주기를 기록하는 ERC-721 NFT를 발행합니다.",
      trace_tag: "온체인 추적", trace_title: "전체 체인 추적성", trace_sub: "모든 제품은 생산부터 활성화까지 온체인에 기록되어 위변조가 불가능합니다.",
      trace_s1: "생산", trace_s2: "검사", trace_s3: "물류", trace_s4: "활성화",
      trace_s1d: "공장 배치 온체인", trace_s2d: "QC 보고서 해시 저장", trace_s3d: "물류 노드 기록", trace_s4d: "사용자 스캔 활성화",
      store_tag: "Web3 스토어", store_title: "추천 제품", store_sub: "16개 주요 브랜드 제품, 온체인 결제, 구매 시 PUFF 보상.",
      store_all: "전체 스토어 보기",
      eco_tag: "매트릭스", eco_title: "PUFF 생태계 매트릭스", eco_sub: "토큰과 NFT를 중심으로 한 완전한 탈중앙화 앱 생태계.",
      eco1: "PUFF 토큰", eco1d: "ERC-20 유틸리티 토큰, 1억 발행",
      eco2: "NFT 마켓", eco2d: "디바이스 컬렉션 발행 및 거래",
      eco3: "온체인 추적", eco3d: "위조 방지 수명주기 증명",
      eco4: "소비 채굴", eco4d: "Puff2Earn 보상 메커니즘",
      eco5: "DAO 거버넌스", eco5d: "커뮤니티 투표 개발",
      eco6: "스테이킹 수익", eco6d: "PUFF 스테이킹으로 배당",
      partner_tag: "파트너", partner_title: "브랜드 파트너 및 후원자",
      access_tag: "접속", access_title: "지금 시작하기", access_sub: "QR 코드를 스캔하여 완전한 Web3 전자담배 생태계를 경험하세요.",
      qr_verify: "스캔 인증", qr_verify_d: "정품 및 추적 확인",
      qr_register: "회원가입", qr_register_d: "PUFF 계정 생성",
      qr_login: "스캔 로그인", qr_login_d: "빠른 플랫폼 로그인",
      foot_about: "백서", foot_links: "내비게이션", foot_resource: "리소스", foot_community: "커뮤니티",
      foot_rights: "모든 권리 보유.", foot_tagline: "흡입 · 체인 · 보상",
      sp_title: "Web3 전자담배 스토어", sp_sub: "온체인 결제 · 소비 채굴 · 정품 추적",
      f_all: "전체", f_disposable: "일회용", f_pod: "팟", f_refill: "주입형", f_juice: "액상",
      add_cart: "장바구니 담기", reward_label: "보상", cart_empty: "장바구니가 비어 있습니다",
      checkout: "결제하기", total: "합계", remove: "삭제", continue_shop: "쇼핑 계속하기",
      co_title: "결제 정보", co_name: "수령인", co_phone: "전화번호", co_addr: "배송 주소",
      co_submit: "주문하기", co_back: "장바구니로", order_ok: "주문 완료! {n} PUFF 획득",
      need_login: "주문 전에 로그인하세요", added: "장바구니에 담음",
      w_title: "내 지갑", w_sub: "MetaMask · Sepolia 테스트넷",
      w_connect: "MetaMask 연결", w_connected: "연결됨", w_eth: "Sepolia ETH", w_puff: "PUFF 토큰",
      w_nft: "내 NFT 컬렉션", w_records: "스캔 기록", w_network: "네트워크", w_no_nft: "NFT 없음",
      w_no_records: "기록 없음", w_install: "먼저 MetaMask 확장 프로그램을 설치하세요",
      s_title: "스캔 인증 · NFT 발행", s_sub: "제품 코드를 입력하여 인증하고 컬렉션을 발행하세요",
      s_input_ph: "제품 코드 입력 (예: PUFF-0001)", s_verify: "인증", s_mint: "NFT 발행",
      s_trace_title: "온체인 추적 정보", s_verified: "✓ 정품 인증", s_notfound: "제품 코드를 찾을 수 없음",
      s_minting: "발행 중...", s_mint_ok: "NFT 발행 완료!", s_connect_first: "먼저 MetaMask 연결",
      s_product: "제품", s_batch: "배치", s_status: "상태",
      a_login: "로그인", a_register: "회원가입", a_email: "이메일", a_pwd: "비밀번호", a_pwd2: "비밀번호 확인",
      a_login_btn: "로그인", a_register_btn: "가입하기", a_welcome: "다시 오신 것을 환영합니다",
      a_create: "계정을 만들어 Puff2Earn을 시작하세요", a_pwd_mismatch: "비밀번호가 일치하지 않습니다",
      a_exists: "이미 등록된 이메일", a_no_user: "이메일 또는 비밀번호 오류", a_login_ok: "로그인됨",
      a_reg_ok: "가입 및 로그인 완료", a_logout_ok: "로그아웃됨",
      ab_title: "PUFF-CHAIN 소개", ab_sub: "전자담배의 디지털 미래를 재정의",
      ab_intro: "PUFF-CHAIN은 세계 최초의 전자담배 Web3.0 디지털 생태계입니다. 블록체인과 전자담배 제품을 깊이 통합하여 전체 추적성, NFT 발행, 소비-채굴 토큰 경제를 구현하고 투명하고 신뢰할 수 있는 탈중앙화 패러다임을 구축합니다.",
      ab_milestone: "마일스톤", ab_team: "핵심 팀",
      e_title: "체인에서 길을 잃음", e_sub: "요청한 페이지가 존재하지 않거나 다른 블록으로 이동했습니다.", e_home: "홈으로",
    },
  };

  const LANGS = ["zh", "en", "ko"];
  let cur = localStorage.getItem("puff-lang") || "zh";
  if (!LANGS.includes(cur)) cur = "zh";

  function t(key, vars) {
    let s = (DICT[cur] && DICT[cur][key]) || (DICT.zh[key]) || key;
    if (vars) for (const k in vars) s = s.replace("{" + k + "}", vars[k]);
    return s;
  }

  function apply(root) {
    (root || document).querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    (root || document).querySelectorAll("[data-i18n-ph]").forEach(el => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });
    document.documentElement.lang = cur === "zh" ? "zh-CN" : cur;
    document.querySelectorAll(".lang-switch button").forEach(b => {
      b.classList.toggle("active", b.dataset.lang === cur);
    });
  }

  function setLang(l) {
    if (!LANGS.includes(l)) return;
    cur = l;
    localStorage.setItem("puff-lang", l);
    apply();
    document.dispatchEvent(new CustomEvent("langchange", { detail: l }));
  }

  window.PuffI18n = { t, setLang, apply, get lang() { return cur; }, LANGS };

  document.addEventListener("DOMContentLoaded", () => apply());
})();
