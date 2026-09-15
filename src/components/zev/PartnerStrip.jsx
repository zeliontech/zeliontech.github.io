import { ArrowRight } from "lucide-react";

// One line at the seam between the hero and the six steps: who the project
// is built with, and a jump to the section that explains it. Typographic
// and muted on purpose, so it reads as a fact under the hero rather than as
// a second headline. The Expofin name is set in type until a vector wordmark
// arrives from Expofin.
const PartnerStrip = () => (
  <div className="border-y border-border bg-background">
    <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 lg:px-8">
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted-foreground">
        <span className="inline-flex items-center gap-2 font-semibold text-foreground">
          <img src="/logo.svg" alt="" width="20" height="20" className="h-5 w-5" />
          ZelionTech
        </span>
        <span aria-hidden="true" className="h-4 w-px bg-border" />
        <span>In joint venture with</span>
        <span className="font-semibold text-foreground">Expofin S.R.L.</span>
      </p>
      <a
        href="#joint-venture"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground transition-colors hover:text-primary"
      >
        About the joint venture
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  </div>
);

export default PartnerStrip;
