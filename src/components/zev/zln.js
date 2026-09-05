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
