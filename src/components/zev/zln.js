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
  edition: "27 October 2026",
  file: "/docs/ZEV-ZLN_Whitepaper_2026-10-27.pdf",
};

// Private sale terms, as set out in the founders' project updates of October
// 2026 (the community and investor editions): ten equal releases, the first
// at launch. No price and no fundraising target appear on the site. The limit
// is stated per person or entity; the final sale documents carry everything
// else.
export const PRIVATE_SALE = {
  pool: "10% of supply, 50,000,000 ZLN",
  release:
    "10% of purchased tokens available at launch, then 10% of the original purchase each month for nine months. Everything is released by month 9, with no waiting period (cliff).",
  // Cumulative share released at launch and at the end of months 1 to 9.
  schedule: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  example: "For every 1,000 ZLN purchased: 100 at launch, then 100 a month in months 1 to 9.",
  monthNote: "Month 1 is the first monthly anniversary of launch.",
  participation: [
    { label: "Maximum", value: "USD 50,000 per person or entity, across all wallets" },
    {
      label: "Locked tokens",
      value: "Held in a prepared vesting wallet. Multi-signature custody and an independent security review come next.",
    },
  ],
  notice:
    "Not an offer to sell. Participation is subject to the final sale terms. Token values can be volatile, and scheduled releases do not guarantee market liquidity. No launch date has been set.",
};

// Contribution rewards: the planned reward model for ZEV operators, as the
// community edition of the project update describes it. The site says
// "contribution rewards"; it never pitches the model as mining.
export const REWARDS = {
  gate: "98%",
  gateLabel: "Minimum verified renewable-energy share for reward eligibility",
  steps: [
    { title: "Capture and sign", body: "The device records energy data and signs it at the source." },
    { title: "Verify contribution", body: "Eligible activity earns contribution points." },
    { title: "Allocate rewards", body: "Points set each operator's share of a funded ZLN reward budget." },
    { title: "Claim ZLN", body: "The operator claims to their own wallet and pays the BNB network fee." },
  ],
  note: "Reward model in development. Rewards distribute existing ZLN; no new tokens are created. Buying or holding ZLN alone does not earn device rewards.",
};
