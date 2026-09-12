<script setup lang="ts">
import { useHead } from "@unhead/vue";
import SniffDownloads from "@/components/SniffDownloads.vue";
import sniffMarkUrl from "@/assets/img/sniff-mark.svg";
import { absoluteUrl } from "@/seo/site";

const title = "Sniff - PTR-MS analysis";
const description =
  "Free, MIT-licensed local analysis for IONICON IoniTOF PTR-MS and PTR-TOF .h5 files.";

const workflow = [
  {
    number: "01",
    title: "Inspect",
    text: "Read the acquisition file, calibration and metadata.",
  },
  {
    number: "02",
    title: "Detect",
    text: "Find peaks and stable sample/background intervals deterministically.",
  },
  {
    number: "03",
    title: "Review",
    text: "Check the evidence visually, then export a configured result.",
  },
];

const capabilities = [
  {
    label: "Analysis",
    title: "Deterministic evidence",
    text: "Mass-axis checks, peak detection and segment detection leave decisions inspectable.",
  },
  {
    label: "Review",
    title: "Expert in the loop",
    text: "Review peaks and intervals in the desktop app before accepting an analysis.",
  },
  {
    label: "Automation",
    title: "Desktop or JSON CLI",
    text: "Use the app for visual review or the command line for repeatable pipelines.",
  },
  {
    label: "Output",
    title: "Portable results",
    text: "Keep a sidecar configuration, export Viewer-style CSV, or share portable HTML.",
  },
];

const comparisons = [
  {
    name: "Sniff",
    source: "https://github.com/saattrupdan/sniff",
    input: "IONICON IoniTOF PTR-MS / PTR-TOF .h5",
    analysis:
      "Deterministic peak and segment analysis, with explicit expert visual review.",
    interface:
      "Desktop app + JSON CLI; sidecar config, Viewer-style CSV and portable HTML.",
    access: "Free, MIT-licensed open source.",
  },
  {
    name: "IONICON PTR-MS Viewer",
    source: "https://www.ionicon.com/products-services/ptr-ms-viewer",
    input: "Supports all IONICON PTR-MS instruments (per IONICON)",
    analysis:
      "Peak tables with automated/adapted tables, multi-peak fitting, multiple-file processing, automatic sampling-period detection and export.",
    interface: "Official IONICON customer software.",
    access:
      "Complimentary component for IONICON customers; licence terms apply.",
  },
  {
    name: "PTRwid",
    source: "https://doi.org/10.5194/amt-8-3903-2015",
    input: "PTR-TOF-MS instruments using Tofwerk HTOF mass spectrometers",
    analysis:
      "Autonomous campaign-scale processing, autonomous mass calibration and unified mass lists.",
    interface: "Runs under IDL or the free IDL Virtual Machine.",
    access:
      "2015 published tool; the paper states that full source was available.",
  },
];

const faqs = [
  {
    question: "What files does Sniff read?",
    answer:
      "Sniff reads IONICON IoniTOF PTR-MS and PTR-TOF .h5 files, including acquisition and calibration information present in the file.",
  },
  {
    question: "Is Sniff really local?",
    answer:
      "Normal desktop analysis runs locally: there is no Sniff cloud service and your .h5 stays on this machine. The optional CLI --agent URL integration sends review configuration and diagnostics only to an endpoint you explicitly choose.",
  },
  {
    question: "Are matches and concentrations definitive?",
    answer:
      "No. Formula and library matches are candidates; isomers and overlapping signals can remain ambiguous. Concentrations require appropriate calibration, and humidity-sensitive compounds need supported calibration.",
  },
  {
    question: "Can I use Sniff without Python?",
    answer:
      "Yes. The macOS and Windows installers include the runtime. Linux desktop packaging is in preparation; running from source requires Python 3.9+ and uv.",
  },
];

const sniffSoftwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sniff",
  applicationCategory: "ScienceApplication",
  operatingSystem: "macOS, Windows, Linux",
  description,
  license: "https://opensource.org/license/mit/",
  isAccessibleForFree: true,
  codeRepository: "https://github.com/saattrupdan/sniff",
  downloadUrl: absoluteUrl("/sniff#download"),
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
        <p class="eyebrow">Free, open-source PTR-MS workbench</p>
        <h1 id="sniff-title">
          From <span>.h5</span> to a result you can review.
        </h1>
        <p class="hero-lede">
          Sniff is MIT-licensed software for analysing IONICON IoniTOF PTR-MS /
          PTR-TOF data locally. No cloud. No upload. Your .h5 stays on this
          machine.
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
          Desktop installers for Apple silicon macOS and Windows x86-64. Linux
          installer in preparation.
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
      <strong>No cloud. No upload.</strong>
      <span>Your .h5 stays on this machine.</span>
    </section>

    <section class="workflow-section" aria-labelledby="workflow-title">
      <div class="section-title-row">
        <div>
          <p class="eyebrow">A short path to review</p>
          <h2 id="workflow-title">Inspect. Detect. Review.</h2>
        </div>
        <p>Automate repeatable work. Keep scientific judgement visible.</p>
      </div>
      <div class="workflow-grid">
        <article
          v-for="step in workflow"
          :key="step.number"
          class="workflow-card"
        >
          <span class="step-number">{{ step.number }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </article>
      </div>
    </section>

    <section class="capabilities-section" aria-labelledby="capabilities-title">
      <div class="section-title-row">
        <div>
          <p class="eyebrow">What it keeps visible</p>
          <h2 id="capabilities-title">Evidence, not a black box.</h2>
        </div>
      </div>
      <div class="capabilities-grid">
        <article
          v-for="capability in capabilities"
          :key="capability.label"
          class="capability-card"
        >
          <span class="capability-label">{{ capability.label }}</span>
          <h3>{{ capability.title }}</h3>
          <p>{{ capability.text }}</p>
        </article>
      </div>
    </section>

    <section class="comparison-section" aria-labelledby="comparison-title">
      <div class="section-title-row">
        <div>
          <p class="eyebrow">A neutral view</p>
          <h2 id="comparison-title">Different tools, different trade-offs.</h2>
        </div>
        <p>Descriptions link to the original project or publisher.</p>
      </div>
      <div class="comparison-scroll" tabindex="0" aria-label="Comparison table">
        <p class="scroll-note">
          Comparison table - scroll horizontally on small screens.
        </p>
        <table>
          <caption class="visually-hidden">
            Comparison of Sniff, IONICON PTR-MS Viewer and PTRwid
          </caption>
          <thead>
            <tr>
              <th scope="col">Tool</th>
              <th scope="col">Input</th>
              <th scope="col">Analysis</th>
              <th scope="col">Interface and output</th>
              <th scope="col">Access</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tool in comparisons" :key="tool.name">
              <th scope="row">
                <a :href="tool.source">{{ tool.name }}</a>
              </th>
              <td>{{ tool.input }}</td>
              <td>{{ tool.analysis }}</td>
              <td>{{ tool.interface }}</td>
              <td>{{ tool.access }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="limits-section" aria-labelledby="limits-title">
      <div>
        <p class="eyebrow">Scientific limits</p>
        <h2 id="limits-title">A candidate is not proof.</h2>
      </div>
      <p>
        Formula and library matches are candidates. Isomers and overlapping
        signals can remain ambiguous. Concentrations require appropriate
        calibration, and humidity-sensitive compounds need supported
        calibration.
      </p>
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
  font-size: clamp(3.4rem, 7vw, 6.3rem);
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
.workflow-section,
.capabilities-section,
.comparison-section,
.limits-section,
.faq-section {
  padding-top: 6.5rem;
}
.section-title-row {
  display: flex;
  gap: 2rem;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.section-title-row > p {
  max-width: 315px;
  margin: 0;
  color: var(--text-color);
  font-size: 0.95rem;
  text-align: right;
}
.workflow-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.workflow-card {
  min-height: 165px;
  padding: 1.5rem;
  border-top: 3px solid var(--sniff-teal);
  background: color-mix(in srgb, var(--bg-secondary) 65%, var(--bg-primary));
}
.step-number {
  display: block;
  margin-bottom: 2.2rem;
  color: var(--sniff-accent);
  font:
    700 0.75rem/1 "Open Sans",
    sans-serif;
  letter-spacing: 0.13em;
}
.workflow-card p,
.capability-card p {
  color: var(--text-color);
  font-size: 0.92rem;
  line-height: 1.5;
}
.workflow-card p {
  max-width: 275px;
  margin: 0.7rem 0 0;
}
.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid color-mix(in srgb, var(--text-color) 15%, transparent);
}
.capability-card {
  min-height: 190px;
  padding: 1.3rem 1.3rem 1.3rem 0;
  border-bottom: 1px solid
    color-mix(in srgb, var(--text-color) 15%, transparent);
}
.capability-card:not(:first-child) {
  padding-left: 1.3rem;
  border-left: 1px solid color-mix(in srgb, var(--text-color) 15%, transparent);
}
.capability-label {
  display: block;
  margin-bottom: 1.4rem;
  color: var(--sniff-accent);
  font:
    700 0.68rem/1.2 "Open Sans",
    sans-serif;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.capability-card p {
  margin: 0.7rem 0 0;
}
.comparison-scroll {
  max-width: 100%;
  overflow-x: auto;
  border: 1px solid color-mix(in srgb, var(--text-color) 15%, transparent);
}
.scroll-note {
  margin: 0;
  padding: 0.65rem 0.9rem;
  color: var(--text-color);
  font-size: 0.75rem;
}
.comparison-scroll table {
  width: 100%;
  min-width: 850px;
  border-collapse: collapse;
  font-size: 0.82rem;
  line-height: 1.45;
}
.comparison-scroll th,
.comparison-scroll td {
  padding: 0.9rem;
  border-top: 1px solid color-mix(in srgb, var(--text-color) 13%, transparent);
  vertical-align: top;
  text-align: left;
}
.comparison-scroll thead th {
  color: var(--sniff-accent);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.comparison-scroll tbody th {
  min-width: 130px;
  font-size: 0.95rem;
}
.comparison-scroll a,
.faq-list a {
  color: var(--sniff-accent) !important;
  font-weight: 700;
}
.limits-section {
  display: grid;
  grid-template-columns: minmax(230px, 0.8fr) minmax(0, 1.2fr);
  gap: 4rem;
  padding-bottom: 0.5rem;
}
.limits-section h2 {
  color: var(--sniff-accent);
}
.limits-section > p {
  margin: 0;
  padding: 1.2rem 1.4rem;
  border-left: 3px solid var(--sniff-teal);
  background: color-mix(in srgb, var(--sniff-teal) 9%, transparent);
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
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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
  .capabilities-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .capability-card:nth-child(odd) {
    padding-left: 0;
  }
  .capability-card:nth-child(even) {
    padding-left: 1.3rem;
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
    font-size: clamp(3rem, 15vw, 4.6rem);
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
  .workflow-section,
  .capabilities-section,
  .comparison-section,
  .limits-section,
  .faq-section {
    padding-top: 5rem;
  }
  .section-title-row {
    display: block;
  }
  .section-title-row > p {
    margin-top: 1rem;
    text-align: left;
  }
  .workflow-grid,
  .capabilities-grid,
  .limits-section {
    grid-template-columns: 1fr;
  }
  .workflow-card {
    min-height: 0;
  }
  .step-number {
    margin-bottom: 1.5rem;
  }
  .capability-card,
  .capability-card:not(:first-child),
  .capability-card:nth-child(odd),
  .capability-card:nth-child(even) {
    min-height: 0;
    padding: 1.2rem 0;
    border-left: 0;
  }
  .capability-label {
    margin-bottom: 0.9rem;
  }
  .limits-section {
    gap: 1.5rem;
  }
  .comparison-scroll {
    margin-right: -0.5rem;
  }
  .faq-section {
    padding-bottom: 5rem;
  }
}
</style>
