/* ============================================================
   PUFF-CHAIN — Product Database (16 products) + shared SVG icons
   Shared by store.html and scan.html. Categories: disposable / pod / refill / juice
   ============================================================ */
(function () {

  // Inline SVG device icons keyed by a visual "shape" — reused across products.
  const SVG = {
    bar: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="24" y="6" width="16" height="52" rx="7" stroke="#00fff9" stroke-width="2.5"/><rect x="28" y="2" width="8" height="8" rx="3" fill="#ff00ff"/><circle cx="32" cy="46" r="4" fill="#00fff9"/><path d="M32 14v18" stroke="#ff00ff" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    pod: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="10" width="20" height="44" rx="9" stroke="#00fff9" stroke-width="2.5"/><rect x="28" y="4" width="8" height="10" rx="3" fill="#ff00ff"/><rect x="27" y="22" width="10" height="14" rx="3" fill="#00fff9" opacity="0.5"/><circle cx="32" cy="46" r="3" fill="#00fff9"/></svg>`,
    mod: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="14" width="22" height="44" rx="6" stroke="#00fff9" stroke-width="2.5"/><rect x="34" y="6" width="14" height="22" rx="5" stroke="#ff00ff" stroke-width="2.5"/><rect x="21" y="20" width="12" height="8" rx="2" fill="#00fff9" opacity="0.6"/><circle cx="27" cy="44" r="3.5" fill="#ff00ff"/></svg>`,
    tank: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 18h20l-2 30a4 4 0 01-4 4h-8a4 4 0 01-4-4l-2-30z" stroke="#00fff9" stroke-width="2.5"/><rect x="24" y="8" width="16" height="10" rx="3" stroke="#ff00ff" stroke-width="2.5"/><path d="M26 30h12" stroke="#00fff9" stroke-width="2" opacity="0.6"/><path d="M27 38h10" stroke="#00fff9" stroke-width="2" opacity="0.6"/></svg>`,
    juice: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 24h20v28a4 4 0 01-4 4H26a4 4 0 01-4-4V24z" stroke="#00fff9" stroke-width="2.5"/><rect x="26" y="8" width="12" height="16" rx="3" stroke="#ff00ff" stroke-width="2.5"/><path d="M22 40h20" stroke="#00fff9" stroke-width="2"/><circle cx="32" cy="48" r="4" fill="#ff00ff" opacity="0.7"/></svg>`,
  };

  // category key -> i18n key used for filter labels
  const CATS = { disposable: "f_disposable", pod: "f_pod", refill: "f_refill", juice: "f_juice" };

  const PRODUCTS = [
    { id: 1,  code: "PUFF-0001", name: "ELFBAR BC5000",         cat: "disposable", brand: "ELFBAR",    price: 129, reward: 30, svg: "bar",   batch: "EB-2026-A01" },
    { id: 2,  code: "PUFF-0002", name: "ELFBAR CR600",          cat: "disposable", brand: "ELFBAR",    price: 89,  reward: 20, svg: "bar",   batch: "EB-2026-A02" },
    { id: 3,  code: "PUFF-0003", name: "SMOK NOVO 5",           cat: "pod",        brand: "SMOK",      price: 199, reward: 45, svg: "pod",   batch: "SM-2026-N05" },
    { id: 4,  code: "PUFF-0004", name: "SMOK RPM 5 PRO",        cat: "pod",        brand: "SMOK",      price: 299, reward: 65, svg: "pod",   batch: "SM-2026-R5P" },
    { id: 5,  code: "PUFF-0005", name: "Vaporesso XROS 4",      cat: "pod",        brand: "Vaporesso", price: 179, reward: 40, svg: "pod",   batch: "VP-2026-X04" },
    { id: 6,  code: "PUFF-0006", name: "Vaporesso LUXE XR MAX", cat: "pod",        brand: "Vaporesso", price: 269, reward: 60, svg: "pod",   batch: "VP-2026-LXM" },
    { id: 7,  code: "PUFF-0007", name: "GeekVape S100",         cat: "pod",        brand: "GeekVape",  price: 249, reward: 55, svg: "mod",   batch: "GV-2026-S100" },
    { id: 8,  code: "PUFF-0008", name: "GeekVape T200",         cat: "refill",     brand: "GeekVape",  price: 329, reward: 75, svg: "mod",   batch: "GV-2026-T200" },
    { id: 9,  code: "PUFF-0009", name: "UWELL CALIBURN GK3",    cat: "pod",        brand: "UWELL",     price: 159, reward: 35, svg: "pod",   batch: "UW-2026-GK3" },
    { id: 10, code: "PUFF-0010", name: "UWELL KOKO PRIME",      cat: "pod",        brand: "UWELL",     price: 139, reward: 30, svg: "pod",   batch: "UW-2026-KKP" },
    { id: 11, code: "PUFF-0011", name: "VOOPOO ARGUS G2",       cat: "pod",        brand: "VOOPOO",    price: 219, reward: 50, svg: "mod",   batch: "VO-2026-AG2" },
    { id: 12, code: "PUFF-0012", name: "VOOPOO DRAG 5",         cat: "refill",     brand: "VOOPOO",    price: 399, reward: 85, svg: "mod",   batch: "VO-2026-DR5" },
    { id: 13, code: "PUFF-0013", name: "LOST VAPE CENTAURUS B80",cat: "refill",    brand: "LOST VAPE", price: 449, reward: 95, svg: "mod",   batch: "LV-2026-CB80" },
    { id: 14, code: "PUFF-0014", name: "LOST VAPE THELEMA QUEST",cat: "refill",    brand: "LOST VAPE", price: 379, reward: 80, svg: "mod",   batch: "LV-2026-TQ" },
    { id: 15, code: "PUFF-0015", name: "ELFBAR ELFA PRO",       cat: "pod",        brand: "ELFBAR",    price: 169, reward: 40, svg: "pod",   batch: "EB-2026-EFP" },
    { id: 16, code: "PUFF-0016", name: "SMOK TFV18",            cat: "juice",      brand: "SMOK",      price: 299, reward: 65, svg: "tank",  batch: "SM-2026-T18" },
  ];

  const BRANDS = ["ELFBAR", "SMOK", "Vaporesso", "GeekVape", "UWELL", "VOOPOO", "LOST VAPE"];

  // Build a simple trace timeline for a product (for scan.html on-chain trace display)
  function traceFor(p) {
    return [
      { action: "PRODUCE",   location: "Shenzhen Factory #3", meta: "批次 " + p.batch },
      { action: "INSPECT",   location: "QC Lab",              meta: "质检合格 PASS" },
      { action: "LOGISTICS", location: "Guangzhou Hub",       meta: "已出库 / Shipped" },
      { action: "ACTIVATE",  location: "On-chain",            meta: "等待激活 / Pending" },
    ];
  }

  window.PuffData = {
    SVG, CATS, PRODUCTS, BRANDS, traceFor,
    byId: id => PRODUCTS.find(p => p.id === Number(id)),
    byCode: code => PRODUCTS.find(p => p.code.toLowerCase() === String(code).trim().toLowerCase()),
    icon: key => SVG[key] || SVG.pod,
  };
})();
