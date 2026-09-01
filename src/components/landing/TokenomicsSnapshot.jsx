import { motion } from "framer-motion";

const allocations = [
  { label: "Ecosystem & Infrastructure", pct: 30, color: "bg-silver-light" },
  { label: "Development & Operations", pct: 15, color: "bg-silver-mid" },
  { label: "Liquidity & Market Stability", pct: 15, color: "bg-silver-dark" },
  { label: "Community Programs", pct: 10, color: "bg-foreground/80" },
  { label: "Strategic Partnerships", pct: 10, color: "bg-muted-foreground/80" },
  { label: "Core Contributors (Team)", pct: 20, color: "bg-border" },
];

const TokenomicsSnapshot = () => {
  return (
    <section className="relative py-24 lg:py-32 section-bg-alternate">
      <div className="section-divider mb-24" />
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-silver-light uppercase">
            Tokenomics
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Supply &{" "}
            <span className="metal-gradient">Allocation</span>
          </h2>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          {/* Total Supply Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card mb-8 p-6 text-center lg:p-8"
          >
            <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Total Supply (Fixed)
            </div>
            <div className="mt-2 font-heading text-4xl font-bold text-foreground lg:text-5xl">
              500,000,000
            </div>
            <div className="mt-1 font-heading text-lg text-silver-light">$ZLN</div>
            <div className="mt-3 text-xs text-muted-foreground">
              Team and core contributor allocations follow long-term vesting
            </div>
          </motion.div>

          {/* Contract ownership disclosure. Every statement below is verified against
              the deployed runtime bytecode of the ZLN contract on BNB Smart Chain
              (chain 56): the dispatch table was enumerated in full — eleven PUSH4
              selectors, all resolved, none unknown — and scanned for proxy/destruct
              opcodes. Do not add a claim here the bytecode does not support. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card mb-8 p-6 lg:p-8"
          >
            <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Contract Ownership
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>
                <span className="text-foreground">The source is verified.</span> Sourcify
                reports an exact match against both the deployed creation and runtime
                bytecode — contract <span className="font-mono text-xs">ZELION</span>,
                solc 0.8.20 — verified 26 May 2026.
              </li>
              <li>
                <span className="text-foreground">
                  It implements the ERC-20 interface on BNB Smart Chain.
                </span>{" "}
                It is not fully BEP-20 conformant: BEP-20 additionally requires{" "}
                <span className="font-mono text-xs">getOwner()</span>, which this contract
                does not implement — it exposes{" "}
                <span className="font-mono text-xs">owner()</span> instead.
              </li>
              <li>
                <span className="text-foreground">Ownership is retained.</span>{" "}
                <span className="font-mono text-xs">owner()</span> returns an externally owned
                account, not the zero address.
              </li>
              <li>
                <span className="text-foreground">Ownership cannot be renounced.</span>{" "}
                <span className="font-mono text-xs">renounceOwnership()</span> is absent from the
                deployed bytecode, so ownership can be transferred but not given up.
              </li>
              <li>
                <span className="text-foreground">
                  The only owner-restricted function is{" "}
                  <span className="font-mono text-xs">transferOwnership(address)</span>.
                </span>{" "}
                The contract&apos;s complete external interface is eleven functions: the nine
                standard ERC-20 token methods plus <span className="font-mono text-xs">owner()</span>{" "}
                and <span className="font-mono text-xs">transferOwnership(address)</span>.
              </li>
              <li>
                <span className="text-foreground">
                  No mint, burn, pause, blacklist, fee or supply-cap function exists in the
                  bytecode.
                </span>{" "}
                The owner cannot issue or destroy tokens, halt transfers, block an address, or
                impose a transfer fee. Total supply is fixed at deployment.
              </li>
              <li>
                <span className="text-foreground">The contract is not upgradeable.</span> The
                bytecode contains no <span className="font-mono text-xs">DELEGATECALL</span> or{" "}
                <span className="font-mono text-xs">SELFDESTRUCT</span>, so its logic cannot be
                replaced or removed.
              </li>
            </ul>
            <a
              href="https://bscscan.com/address/0x9D9c5C7B7BfC398Ed446b7e53a8Ad8d62DCD0181#code"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block font-mono text-xs text-silver-light underline underline-offset-4 transition-colors hover:text-foreground"
            >
              View the contract on BscScan
            </a>
          </motion.div>

          {/* Allocation Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex h-4 overflow-hidden rounded-full shadow-inner">
              {allocations.map((alloc, i) => (
                <motion.div
                  key={alloc.label}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${alloc.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  className={`${alloc.color} ${i > 0 ? "border-l border-background" : ""}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Legend */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allocations.map((alloc, index) => (
              <motion.div
                key={alloc.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 px-4 py-3.5"
              >
                <div className={`h-3 w-3 flex-shrink-0 rounded-sm ${alloc.color}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{alloc.label}</div>
                </div>
                <div className="font-heading text-sm font-semibold text-foreground">
                  {alloc.pct}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSnapshot;
