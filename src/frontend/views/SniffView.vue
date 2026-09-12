<script setup lang="ts">
import { useHead } from "@unhead/vue";
import SniffDownloads from "@/components/SniffDownloads.vue";
import sniffMarkUrl from "@/assets/img/sniff-mark.svg";
import { absoluteUrl } from "@/seo/site";

const title = "Sniff — PTR-MS analysis software";
const description =
  "Free, open-source local desktop software for PTR-MS and PTR-TOF analysis of IONICON ioniTOF .h5 files, with reviewed peaks and intervals exported to CSV.";

const comparisons = [
  {
    name: "IONICON PTR-MS Viewer",
    source: "https://www.ionicon.com/products-services/ptr-ms-viewer",
    sourceLabel: "IONICON's public PTR-MS Viewer description",
    text: "Sniff is a better fit when the scientist wants a free, MIT-licensed, open-source workflow that proposes stable sample/background intervals and peaks before expert-reviewed CSV export.",
  },
  {
    name: "PTRwid",
    source: "https://doi.org/10.5194/amt-8-3903-2015",
    sourceLabel: "the PTRwid paper (DOI)",
    text: "Sniff is a better fit for IONICON ioniTOF .h5, a desktop visual review, and scientist-approved CSV output rather than PTRwid's published autonomous IDL/IDL VM campaign workflow for Tofwerk HTOF.",
  },
];

const faqs = [
  {
    question: "What files does Sniff read?",
    answer:
      "Sniff reads IONICON ioniTOF PTR-MS and PTR-TOF .h5 files, including acquisition and calibration information present in the file.",
  },
  {
    question: "How does Sniff propose peaks?",
    answer:
      "It finds local maxima in the average mass spectrum above relative and robust noise thresholds, merges maxima within one instrument linewidth, and proposes candidates for review.",
  },
  {
    question: "How are sample and background intervals proposed?",
    answer:
      "Sniff builds a composite VOC signal from strong m/z 40-200 traces and finds stable plateaus in log space. Elevated plateaus are proposed as samples and lower ones as backgrounds; short same-class gaps may be joined.",
  },
  {
    question: "Does Sniff change my raw .h5 file?",
    answer:
      "No. Sniff reads the raw file and writes the review configuration beside it; accepted results are exported to a CSV without modifying the .h5.",
  },
  {
    question: "What do formula and compound candidates mean?",
    answer:
      "Sniff enumerates formula candidates offline and ranks them using exact-mass error, isotope patterns, chemical plausibility and optional library context. They remain candidates: structural isomers and overlapping signals can stay ambiguous, and scores are not probabilities. Names and isomer labels come from the bundled PTR Library mapping.",
  },
  {
    question: "How do background periods affect the output?",
    answer:
      "Background intervals are kept separate in the CSV and provide the baseline context for review and sample-vs-background checks. Review and correct the proposed classes before export because those labels affect the reported intervals.",
  },
  {
    question: "How are concentrations calculated?",
    answer:
      "Sniff transmission-corrects peak signals, normalises them by the primary-ion signal and applies K to report ppb and µg/m³, with optional measured kinetic corrections. K is not uniquely fixed by every raw file; use an appropriate calibration, and obtain an instrument-specific humidity calibration before treating humidity-sensitive compounds as absolute.",
  },
  {
    question: "What is saved for reproducibility?",
    answer:
      "The sidecar JSON retains your peaks, intervals and analysis settings, plus validated mass-axis calibration evidence and a fingerprint of the source H5. The raw spectra remain in the H5 rather than being duplicated in the config.",
  },
  {
    question: "Is Sniff really local?",
    answer:
      "Analysis and review run locally, and Sniff never uploads your measurement file. The app may check GitHub Releases for update metadata; if you explicitly configure an agent endpoint, review configuration and diagnostics are sent to that chosen service.",
  },
  {
    question: "Is Sniff an alternative to PTR-MS Viewer?",
    answer:
      "For supported IONICON ioniTOF .h5 to reviewed CSV workflows, it can be: Sniff is free and open source, and proposes peaks and stable sample/background intervals for expert review. It does not claim complete PTR-MS Viewer feature parity.",
  },
  {
    question: "Can I use Sniff without Python?",
    answer:
      "Yes. The macOS, Windows and Linux packages include the runtime and dependencies needed by the app. On Linux, use the .deb on Ubuntu 22.04+, Debian 12+ or compatible derivatives; the portable archive is best effort on other modern glibc-based x86-64 systems and does not support Alpine/musl or ARM.",
  },
];

const sniffSoftwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sniff",
  applicationCategory: "ScienceApplication",
  operatingSystem: "macOS, Windows, Linux",
  description,
  url: absoluteUrl("/sniff"),
  license: "https://opensource.org/license/mit/",
  isAccessibleForFree: true,
  codeRepository: "https://github.com/saattrupdan/sniff",
  sameAs: "https://github.com/saattrupdan/sniff",
  downloadUrl: "https://github.com/saattrupdan/sniff/releases/latest",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "PTR-MS and PTR-TOF .h5 (HDF5) review",
    "Proposed peak and sample/background interval review",
    "Local CSV export",
  ],
  softwareRequirements: "Desktop computer running macOS, Windows or Linux",
};

const sniffFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

useHead({
  title,
  meta: [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: absoluteUrl("/sniff") },
    { property: "og:type", content: "website" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(sniffSoftwareJsonLd),
    },
    { type: "application/ld+json", innerHTML: JSON.stringify(sniffFaqJsonLd) },
  ],
});
</script>

<template>
  <main class="sniff-page">
    <section class="hero" aria-labelledby="sniff-title">
      <div class="hero-copy">
        <p class="eyebrow">Free, open-source local PTR-MS analysis software</p>
        <h1 id="sniff-title">Raw PTR-MS data to a <span>spreadsheet.</span></h1>
        <p class="hero-lede">
          Sniff is local desktop analysis software for IONICON ioniTOF PTR-MS
          and PTR-TOF <code>.h5</code> (HDF5) files. It proposes peaks and
          sample/background intervals for scientist review, then exports
          accepted results to CSV. Your scientific judgement stays final.
        </p>
        <div class="hero-actions">
          <a class="primary-action" href="#download"
            >Choose a download <span aria-hidden="true">↓</span></a
          >
          <a
            class="secondary-action"
            href="https://github.com/saattrupdan/sniff"
          >
            Explore the source <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p class="hero-note">
          Packages for Apple silicon macOS, Windows x86-64 and Linux x86-64.
        </p>
      </div>

      <div
        class="hero-visual"
        aria-label="Illustration of a mass spectrum review"
        role="img"
      >
        <div class="visual-header">
          <div class="brand-lockup">
            <img :src="sniffMarkUrl" alt="" />
            <span>sniff <small>review</small></span>
          </div>
          <span class="live-status"><i></i> local</span>
        </div>
        <div class="spectrum-labels">
          <span>signal / a.u.</span><span>m/z</span>
        </div>
        <svg
          class="spectrum"
          viewBox="0 0 620 270"
          fill="none"
          aria-hidden="true"
        >
          <path class="grid-line" d="M0 48h620M0 102h620M0 156h620M0 210h620" />
          <path
            class="grid-line"
            d="M80 0v270M190 0v270M300 0v270M410 0v270M520 0v270"
          />
          <path
            class="spectrum-area"
            d="M0 220C25 221 33 220 54 219S74 220 82 218L96 214L110 217L123 213L136 215L150 210L164 213L176 211L188 213L198 207L207 203L218 205L229 196L238 200L249 195L260 198L270 191L277 198L286 183L295 196L304 178L313 194L322 188L332 195L342 179L352 190L361 174L369 195L378 192L386 198L396 181L404 194L415 187L423 194L432 183L441 191L452 188L462 191L474 184L486 188L497 185L508 188L520 181L530 186L542 182L555 185L567 179L580 184L592 179L620 181V270H0Z"
          />
          <path
            class="spectrum-line"
            d="M0 220C25 221 33 220 54 219S74 220 82 218L96 214L110 217L123 213L136 215L150 210L164 213L176 211L188 213L198 207L207 203L218 205L229 196L238 200L249 195L260 198L270 191L277 198L286 183L295 196L304 178L313 194L322 188L332 195L342 179L352 190L361 174L369 195L378 192L386 198L396 181L404 194L415 187L423 194L432 183L441 191L452 188L462 191L474 184L486 188L497 185L508 188L520 181L530 186L542 182L555 185L567 179L580 184L592 179L620 181"
          />
          <path
            class="peak"
            d="M286 183V120M304 178V92M342 179V133M361 174V72M396 181V116"
          />
          <circle cx="361" cy="174" r="5" class="peak-dot" />
        </svg>
        <div class="visual-readout">
          <div><span>interval</span><strong>sample_03</strong></div>
          <div><span>candidate</span><strong>C₈H₁₀O</strong></div>
          <div><span>review</span><strong>required</strong></div>
        </div>
      </div>
    </section>

    <section class="trust-strip" aria-label="Sniff principles">
      <strong>Free to use</strong>
      <strong>MIT-licensed open source</strong>
      <strong>No cloud analysis. No measurement upload.</strong>
      <span>Your .h5 stays on this machine.</span>
    </section>

    <section class="comparison-section" aria-labelledby="comparison-title">
      <p class="eyebrow">Supported ioniTOF-H5 to reviewed CSV workflows</p>
      <h2 id="comparison-title">An open-source PTR-MS Viewer alternative</h2>
      <div class="comparison-cards">
        <article v-for="tool in comparisons" :key="tool.name">
          <h3>{{ tool.name }}</h3>
          <p>{{ tool.text }}</p>
          <a :href="tool.source" target="_blank" rel="noopener noreferrer">
            {{ tool.sourceLabel }} <span aria-hidden="true">↗</span>
          </a>
        </article>
      </div>
    </section>

    <SniffDownloads />

    <section class="faq-section" aria-labelledby="faq-title">
      <p class="eyebrow">Questions, answered plainly</p>
      <h2 id="faq-title">FAQ</h2>
      <div class="faq-list">
        <details v-for="faq in faqs" :key="faq.question">
          <summary>{{ faq.question }}<span aria-hidden="true">+</span></summary>
          <p>{{ faq.answer }}</p>
        </details>
      </div>
    </section>
  </main>
</template>

<style scoped>
.sniff-page {
  --sniff-teal: #1f6f6b;
  --sniff-mint: #eafaf6;
  --sniff-accent: color-mix(in srgb, var(--sniff-teal) 45%, var(--text-color));
  width: min(1120px, calc(100% - 3rem));
  margin: 0 auto;
  color: var(--text-color);
  font-family: "Open Sans", Arial, sans-serif;
}
.sniff-page h1,
.sniff-page h2,
.sniff-page h3 {
  font-family: "Source Sans Pro", "Arial Black", sans-serif;
}
.sniff-page h2 {
  margin: 0;
  font-size: clamp(2.1rem, 4vw, 3.5rem);
  line-height: 1;
  letter-spacing: -0.035em;
}
.sniff-page h3 {
  margin: 0;
  font-size: 1.35rem;
  line-height: 1.1;
}
.sniff-page p {
  line-height: 1.55;
}
.eyebrow {
  margin: 0 0 0.8rem;
  color: var(--sniff-accent);
  font:
    700 0.72rem/1.2 "Open Sans",
    sans-serif;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.03fr) minmax(400px, 0.97fr);
  gap: clamp(2rem, 6vw, 6.5rem);
  align-items: center;
  min-height: 620px;
  padding: 4rem 0 5rem;
}
.hero h1 {
  max-width: 690px;
  margin: 0;
  font-size: clamp(2.8rem, 5.4vw, 4.8rem);
  line-height: 0.91;
  letter-spacing: -0.065em;
}
.hero h1 span {
  color: var(--sniff-accent);
}
.hero-lede {
  max-width: 600px;
  margin: 1.8rem 0 0;
  font-size: clamp(1.05rem, 1.8vw, 1.3rem);
  line-height: 1.6 !important;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 2rem;
}
.primary-action,
.secondary-action {
  display: inline-flex;
  gap: 0.7rem;
  align-items: center;
  padding: 0.9rem 1.1rem;
  border-radius: 0.25rem;
  font-weight: 700;
  text-decoration: none !important;
}
.primary-action {
  background: var(--sniff-teal);
  color: var(--sniff-mint) !important;
}
.primary-action:hover {
  background: color-mix(in srgb, var(--sniff-teal) 78%, var(--text-color));
}
.secondary-action {
  border: 1px solid color-mix(in srgb, var(--text-color) 28%, transparent);
  color: var(--text-color) !important;
}
.secondary-action:hover {
  border-color: var(--sniff-accent);
  color: var(--sniff-accent) !important;
}
.hero-note {
  margin: 1.2rem 0 0;
  color: var(--text-color);
  font-size: 0.78rem;
}
.hero-visual {
  position: relative;
  overflow: hidden;
  padding: 1.25rem;
  border-radius: 1.1rem;
  background: var(--sniff-teal);
  color: var(--sniff-mint);
  box-shadow: 18px 20px 0 color-mix(in srgb, var(--sniff-teal) 15%, transparent);
}
.hero-visual::before {
  position: absolute;
  top: -120px;
  right: -100px;
  width: 300px;
  height: 300px;
  border: 1px solid rgb(234 250 246 / 20%);
  border-radius: 50%;
  box-shadow:
    0 0 0 30px rgb(234 250 246 / 5%),
    0 0 0 60px rgb(234 250 246 / 5%);
  content: "";
}
.visual-header,
.spectrum-labels,
.visual-readout {
  position: relative;
  z-index: 1;
}
.visual-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand-lockup {
  display: flex;
  gap: 0.55rem;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}
.brand-lockup img {
  width: 31px;
  height: 31px;
  border-radius: 8px;
}
.brand-lockup small {
  margin-left: 0.18rem;
  color: var(--sniff-mint);
  font-size: 0.62rem;
  font-weight: 400;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}
.live-status {
  display: flex;
  gap: 0.4rem;
  align-items: center;
  color: var(--sniff-mint);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.live-status i {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: #b9f36f;
}
.spectrum-labels {
  display: flex;
  justify-content: space-between;
  margin: 4rem 0 -2rem;
  color: var(--sniff-mint);
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.spectrum {
  display: block;
  width: 100%;
  margin-top: 0.8rem;
}
.grid-line {
  stroke: rgb(234 250 246 / 16%);
  stroke-width: 1;
}
.spectrum-area {
  fill: rgb(234 250 246 / 9%);
}
.spectrum-line {
  stroke: var(--sniff-mint);
  stroke-linecap: round;
  stroke-width: 3;
}
.peak {
  stroke: #b9f36f;
  stroke-dasharray: 4 6;
  stroke-width: 1.5;
}
.peak-dot {
  fill: #b9f36f;
}
.visual-readout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  margin-top: -0.3rem;
}
.visual-readout div {
  padding: 0.65rem 0.7rem;
  border: 1px solid rgb(234 250 246 / 18%);
  border-radius: 0.25rem;
  background: rgb(0 0 0 / 8%);
}
.visual-readout span,
.visual-readout strong {
  display: block;
}
.visual-readout span {
  margin-bottom: 0.22rem;
  color: var(--sniff-mint);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.visual-readout strong {
  overflow: hidden;
  font-size: 0.77rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.trust-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  align-items: center;
  justify-content: center;
  padding: 1.15rem;
  border-top: 1px solid color-mix(in srgb, var(--text-color) 13%, transparent);
  border-bottom: 1px solid
    color-mix(in srgb, var(--text-color) 13%, transparent);
  font-size: 0.82rem;
}
.trust-strip strong:first-child,
.trust-strip strong:nth-child(2) {
  color: var(--sniff-accent);
}
.trust-strip span {
  color: var(--text-color);
}
.comparison-section,
.faq-section {
  padding-top: 5.5rem;
}
.comparison-section h2 {
  margin: 0;
}
.comparison-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}
.comparison-cards article {
  padding: 1.3rem;
  border: 1px solid color-mix(in srgb, var(--text-color) 15%, transparent);
  border-top: 3px solid var(--sniff-teal);
  background: color-mix(in srgb, var(--bg-secondary) 65%, var(--bg-primary));
}
.comparison-cards h3 {
  font-size: 1.2rem;
}
.comparison-cards p {
  margin: 0.8rem 0 1rem;
  color: var(--text-color);
  font-size: 0.92rem;
  line-height: 1.5;
}
.comparison-cards a,
.faq-list a {
  color: color-mix(
    in srgb,
    var(--sniff-teal) 20%,
    var(--text-color)
  ) !important;
  font-size: 0.88rem;
  font-weight: 700;
}
.faq-section {
  max-width: 850px;
  margin: 0 auto;
  padding-bottom: 6.5rem;
}
.faq-section h2 {
  margin-bottom: 2rem;
}
.faq-list {
  border-top: 1px solid color-mix(in srgb, var(--text-color) 15%, transparent);
}
.faq-list details {
  border-bottom: 1px solid
    color-mix(in srgb, var(--text-color) 15%, transparent);
}
.faq-list summary {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 0;
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 700;
  list-style: none;
}
.faq-list summary::-webkit-details-marker {
  display: none;
}
.faq-list summary span {
  color: var(--sniff-accent);
  font-size: 1.5rem;
  font-weight: 400;
}
.faq-list details[open] summary span {
  transform: rotate(45deg);
}
.faq-list details p {
  max-width: 740px;
  margin: 0 2rem 1.2rem 0;
  color: var(--text-color);
  font-size: 0.94rem;
}
@media only screen and (max-width: 850px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 3rem;
    min-height: 0;
  }
  .hero-visual {
    max-width: 620px;
  }
}
@media only screen and (max-width: 600px) {
  .sniff-page {
    width: min(100% - 2rem, 1120px);
  }
  .hero {
    padding-top: 2.5rem;
    padding-bottom: 3.5rem;
  }
  .hero h1 {
    font-size: clamp(2.35rem, 11vw, 3rem);
  }
  .hero-visual {
    padding: 0.85rem;
    border-radius: 0.7rem;
    box-shadow: 8px 10px 0
      color-mix(in srgb, var(--sniff-teal) 15%, transparent);
  }
  .spectrum-labels {
    margin-top: 2.5rem;
  }
  .visual-readout {
    gap: 0.35rem;
  }
  .visual-readout div {
    padding: 0.5rem 0.45rem;
  }
  .visual-readout strong {
    font-size: 0.65rem;
  }
  .trust-strip {
    justify-content: flex-start;
    padding: 1rem 0;
    font-size: 0.75rem;
  }
  .comparison-section,
  .faq-section {
    padding-top: 4.5rem;
  }
  .comparison-cards {
    grid-template-columns: 1fr;
  }
  .faq-section {
    padding-bottom: 5rem;
  }
}
</style>
