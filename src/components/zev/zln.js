// ZLN token facts, shared by the Tokenomics page and the ZLN layer of the
// homepage stack so the two can never drift apart. Allocation figures live in
// TokenAllocation.jsx.

export const CONTRACT = "0x9D9c5C7B7BfC398Ed446b7e53a8Ad8d62DCD0181";
export const CONTRACT_URL = `https://bscscan.com/address/${CONTRACT}`;

export const PARAMETERS = [
  { label: "Network", value: "BNB Smart Chain" },
  { label: "Token standard", value: "BEP-20" },
  { label: "Maximum supply", value: "500,000,000 ZLN" },
  { label: "Decimals", value: "18" },
  { label: "Transaction tax", value: "0%" },
  { label: "Additional minting", value: "Disabled" },
];

// The four facts the homepage teaser shows; the page carries all six.
export const TEASER_PARAMETERS = PARAMETERS.filter((p) =>
  ["Network", "Token standard", "Maximum supply", "Transaction tax"].includes(p.label)
);

// The published whitepaper edition the site links to. Earlier editions stay
// in public/docs so links already shared keep working.
export const WHITEPAPER = {
  edition: "14 October 2026",
  file: "/docs/ZEV-ZLN_Whitepaper_2026-10.pdf",
};

// Private sale and strategic allocation terms, as decided by the founders on
// 14 October 2026 and recorded in the whitepaper (Token Distribution and
// Release Policies). The pool is shared; no split is stated. No price appears
// on the site, and neither do the wallet and identity-verification rules;
// the final sale documents carry those.
export const PRIVATE_SALE = {
  pool: "10% of supply, 50,000,000 ZLN, shared with strategic allocations",
  release:
    "15% of purchased tokens available at launch. The remaining 85% is locked for 6 months (the cliff), then released monthly over 24 months.",
  strategic: "Strategic allocations: fully locked for 6 months, then released monthly over 24 months.",
  participation: [
    { label: "Minimum", value: "USD 2,500 per verified person or entity" },
    { label: "Maximum", value: "USD 50,000 per verified person or entity, counted across all of that investor's wallets" },
    { label: "Locked tokens", value: "Held in an on-chain vesting contract; the address will be published before the sale opens" },
  ],
  notice:
    "Not an offer to sell. Participation is subject to the final sale terms, eligibility and jurisdiction restrictions. No launch date has been set.",
};
