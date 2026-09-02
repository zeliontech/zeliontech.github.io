import { describe, it, expect } from "vitest";
import { faqs } from "@/components/landing/FAQSection";

// The FAQ is prose the owner's partners and investors will read closely, so
// it gets the strictest wording check: no bare company "Zelion", no
// investment language, and the carbon answer must say no.
const FORBIDDEN = /\bprice|\breturns?\b|appreciat|listing|guarantee|certif|IP67|IEC 61557|\bSLA\b|trustless|mining|byzantine|deterministic/i;

describe("FAQ copy (brief §24)", () => {
  it("answers the ZEV questions and keeps every answer inside the rules", () => {
    const questions = faqs.map((f) => f.q);
    expect(questions).toContain("What is ZEV?");
    expect(questions).toContain("What has actually been demonstrated?");
    expect(questions).toContain("Does ZEV generate carbon credits? Is ZLN a carbon credit?");
    expect(questions).toContain("Is ZelionTech an investment?");
    for (const f of faqs) {
      expect(f.a).not.toMatch(FORBIDDEN);
      expect(f.a).not.toMatch(/\bZelion\b(?! Energy Validator)/);
    }
    const carbon = faqs.find((f) => f.q.startsWith("Does ZEV generate carbon credits"));
    expect(carbon.a).toMatch(/^No, and no\./);
    const investment = faqs.find((f) => f.q === "Is ZelionTech an investment?");
    expect(investment.a).toMatch(/^No\./);
  });
});
