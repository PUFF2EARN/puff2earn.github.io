/* ============================================================
   PUFF-CHAIN — Shared app logic
   - localStorage user system (puff_users / puff_session)
   - cart (puff_cart), orders (puff_orders), PUFF reward ledger
   - navbar rendering + user state + lang switch + mobile toggle
   - toast helper
   ============================================================ */
(function () {
  const KEY = { users: "puff_users", session: "puff_session", cart: "puff_cart", orders: "puff_orders", scans: "puff_scans" };
  const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  /* -------- users / session -------- */
  const Users = {
    all: () => read(KEY.users, []),
    current() {
      const email = read(KEY.session, null);
      return email ? this.all().find(u => u.email === email) || null : null;
    },
    register(email, password) {
      email = String(email).trim().toLowerCase();
      const users = this.all();
      if (users.find(u => u.email === email)) return { ok: false, err: "a_exists" };
      const user = { email, password: btoa(password), puffs: 0, orders: [], wallet: "", createdAt: new Date().toISOString() };
      users.push(user); write(KEY.users, users); write(KEY.session, email);
      return { ok: true, user };
    },
    login(email, password) {
      email = String(email).trim().toLowerCase();
      const u = this.all().find(x => x.email === email);
      if (!u || u.password !== btoa(password)) return { ok: false, err: "a_no_user" };
      write(KEY.session, email);
      return { ok: true, user: u };
    },
    logout() { localStorage.removeItem(KEY.session); },
    update(email, patch) {
      const users = this.all();
      const i = users.findIndex(u => u.email === email);
      if (i < 0) return;
      users[i] = { ...users[i], ...patch }; write(KEY.users, users);
    },
    addPuffs(email, amount) {
      const u = this.all().find(x => x.email === email);
      if (u) this.update(email, { puffs: (u.puffs || 0) + amount });
    },
  };

  /* -------- cart -------- */
  const Cart = {
    items: () => read(KEY.cart, []),               // [{id, qty}]
    count() { return this.items().reduce((n, i) => n + i.qty, 0); },
    add(id, qty = 1) {
      const items = this.items();
      const it = items.find(i => i.id === id);
      if (it) it.qty += qty; else items.push({ id, qty });
      write(KEY.cart, items); this._sync();
    },
    setQty(id, qty) {
      let items = this.items();
      const it = items.find(i => i.id === id);
      if (it) it.qty = qty;
      items = items.filter(i => i.qty > 0);
      write(KEY.cart, items); this._sync();
    },
    remove(id) { write(KEY.cart, this.items().filter(i => i.id !== id)); this._sync(); },
    clear() { write(KEY.cart, []); this._sync(); },
    detailed() {
      return this.items().map(i => ({ ...i, product: window.PuffData.byId(i.id) })).filter(x => x.product);
    },
    total() { return this.detailed().reduce((s, i) => s + i.product.price * i.qty, 0); },
    rewardTotal() { return this.detailed().reduce((s, i) => s + i.product.reward * i.qty, 0); },
    _sync() { document.dispatchEvent(new CustomEvent("cartchange")); App.updateCartBadge(); },
  };

  /* -------- orders -------- */
  const Orders = {
    all: () => read(KEY.orders, []),
    create({ items, total, puffReward, address }) {
      const user = Users.current();
      const order = {
        id: "PUFF-" + Date.now().toString(36).toUpperCase(),
        user: user ? user.email : "guest",
        items, total, puffReward, address,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      const orders = Orders.all(); orders.unshift(order); write(KEY.orders, orders);
      if (user) {
        Users.addPuffs(user.email, puffReward);
        const u = Users.current();
        Users.update(user.email, { orders: [...(u.orders || []), order.id] });
      }
      return order;
    },
  };

  /* -------- scan records -------- */
  const Scans = {
    all: () => read(KEY.scans, []),
    add(rec) { const a = Scans.all(); a.unshift({ ...rec, at: new Date().toISOString() }); write(KEY.scans, a.slice(0, 50)); },
  };

  /* -------- toast -------- */
  let toastEl;
  function toast(msg, ms = 2400) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastEl._t); toastEl._t = setTimeout(() => toastEl.classList.remove("show"), ms);
  }

  /* -------- navbar -------- */
  const NAV_LINKS = [
    { href: "index.html#road", key: "nav_road" },
    { href: "index.html#nft", key: "nav_nft" },
    { href: "index.html#trace", key: "nav_trace" },
    { href: "store.html", key: "nav_store" },
    { href: "scan.html", key: "nav_scan" },
    { href: "wallet.html", key: "nav_wallet" },
    { href: "about.html", key: "nav_about" },
  ];

  function renderNav(active) {
    const host = document.getElementById("nav");
    if (!host) return;
    host.className = "nav";
    host.innerHTML = `
      <div class="nav-inner">
        <a class="logo" href="index.html"><span class="dot"></span>PUFF<span class="grad">-CHAIN</span></a>
        <nav class="nav-links" id="navLinks">
          <a href="index.html" data-i18n="nav_home" ${active==="home"?'class="active"':''}>首页</a>
          ${NAV_LINKS.map(l => `<a href="${l.href}" data-i18n="${l.key}" ${active===l.key?'class="active"':''}>${l.key}</a>`).join("")}
        </nav>
        <div class="nav-right">
          <div class="lang-switch">
            <button data-lang="zh">ZH</button><button data-lang="en">EN</button><button data-lang="ko">KO</button>
          </div>
          <button class="btn btn-ghost btn-sm cart-btn" id="navCart" title="cart">🛒<span class="cart-badge hidden" id="cartBadge">0</span></button>
          <span id="navUser"></span>
          <button class="nav-toggle" id="navToggle">≡</button>
        </div>
      </div>`;

    // user state
    renderUser();
    App.updateCartBadge();

    // lang buttons
    host.querySelectorAll(".lang-switch button").forEach(b =>
      b.addEventListener("click", () => window.PuffI18n.setLang(b.dataset.lang)));

    // cart button -> open drawer if present, else go to store
    document.getElementById("navCart").addEventListener("click", () => {
      const drawer = document.getElementById("cartDrawer");
      if (drawer) document.dispatchEvent(new CustomEvent("opencart"));
      else location.href = "store.html";
    });

    // mobile toggle
    document.getElementById("navToggle").addEventListener("click", () =>
      document.getElementById("navLinks").classList.toggle("open"));

    window.PuffI18n.apply(host);
  }

  function renderUser() {
    const el = document.getElementById("navUser");
    if (!el) return;
    const u = Users.current();
    const T = window.PuffI18n.t;
    if (u) {
      const w = u.wallet ? `<span class="uwallet">${u.wallet.slice(0,6)}…${u.wallet.slice(-4)}</span>` : "";
      el.className = "nav-user";
      el.innerHTML = `<span class="uname">${u.email.split("@")[0]}</span>${w}
        <a href="admin/index.html" class="btn btn-ghost btn-sm">${T("nav_admin")}</a>
        <button class="btn btn-ghost btn-sm" id="logoutBtn">${T("nav_logout")}</button>`;
      document.getElementById("logoutBtn").addEventListener("click", () => {
        Users.logout(); toast(T("a_logout_ok")); renderUser();
      });
    } else {
      el.className = "";
      el.innerHTML = `<a href="register.html" class="btn btn-primary btn-sm">${T("nav_login")}</a>`;
    }
  }

  /* -------- footer -------- */
  function renderFooter() {
    const host = document.getElementById("footer");
    if (!host) return;
    host.className = "footer";
    host.innerHTML = `<div class="wrap"><div class="footer-grid">
      <div>
        <a class="logo" href="index.html"><span class="dot"></span>PUFF<span class="grad">-CHAIN</span></a>
        <p style="color:var(--muted);font-size:14px;margin-top:12px;max-width:320px" data-i18n="hero_lead"></p>
      </div>
      <div><h5 data-i18n="foot_links"></h5>
        <a href="index.html" data-i18n="nav_home"></a>
        <a href="store.html" data-i18n="nav_store"></a>
        <a href="scan.html" data-i18n="nav_scan"></a>
        <a href="wallet.html" data-i18n="nav_wallet"></a></div>
      <div><h5 data-i18n="foot_resource"></h5>
        <a href="about.html" data-i18n="foot_about"></a>
        <a href="https://github.com/PUFF2EARN" target="_blank" rel="noopener">GitHub</a>
        <a href="about.html" data-i18n="nav_about"></a></div>
      <div><h5 data-i18n="foot_community"></h5>
        <a href="#" target="_blank" rel="noopener">Discord</a>
        <a href="#" target="_blank" rel="noopener">Twitter / X</a>
        <a href="#" target="_blank" rel="noopener">Telegram</a></div>
      </div>
      <div class="footer-bottom">© 2026 PUFF-CHAIN · <span data-i18n="foot_tagline"></span> · <span data-i18n="foot_rights"></span></div>
    </div>`;
    window.PuffI18n.apply(host);
  }

  const App = {
    Users, Cart, Orders, Scans, toast, renderNav, renderFooter, renderUser, read, write, KEY,
    updateCartBadge() {
      const b = document.getElementById("cartBadge");
      if (!b) return;
      const n = Cart.count();
      b.textContent = n; b.classList.toggle("hidden", n === 0);
    },
    money: n => "¥" + n,
  };
  window.PuffApp = App;

  // re-render on language change
  document.addEventListener("langchange", () => { renderUser(); });
})();
