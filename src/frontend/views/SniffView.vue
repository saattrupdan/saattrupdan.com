<script setup lang="ts">
import { useHead } from "@unhead/vue";
import SniffDownloads from "@/components/SniffDownloads.vue";
import sniffMarkUrl from "@/assets/img/sniff-mark.svg";
import { absoluteUrl } from "@/seo/site";

const title = "Sniff — PTR-MS analysis";
const description =
  "A local, reviewable workflow for IONICON IoniTOF PTR-MS and PTR-TOF .h5 files.";

const workflow = [
  {
    number: "01",
    title: "Inspect",
    text: "Read metadata, calibration, concentration-K and molar-volume information from the file.",
  },
  {
    number: "02",
    title: "Detect",
    text: "Find credible peaks and stable sample/background plateaus with deterministic methods.",
  },
  {
    number: "03",
    title: "Review",
    text: "Open a visual review, adjust the evidence, and export a full-precision CSV when ready.",
  },
];

const capabilities = [
  {
    label: "Mass axis",
    title: "Calibrate before you interpret",
    text: "A conservative water/iodobenzene check validates the mass axis before detection or extraction.",
  },
  {
    label: "Formula candidates",
    title: "More than nearest-mass matching",
    text: "Exact-mass error, isotope patterns and chemical plausibility rank possible formulas, including near-isobars.",
  },
  {
    label: "Time structure",
    title: "See samples and backgrounds",
    text: "Log-space plateau detection separates stable intervals and preserves chronological labels for review.",
  },
  {
    label: "Quantification",
    title: "Keep calibration visible",
    text: "Raw, corrected, concentration and microgram views expose the constants and assumptions behind a number.",
  },
  {
    label: "Overlaps",
    title: "Flag what the spectrum cannot settle",
    text: "Overlapping signals are modelled, not hand-waved away; ambiguity stays in the result for an expert to assess.",
  },
  {
    label: "Output",
    title: "Work with ordinary files",
    text: "Export a Viewer-style CSV, save a review configuration beside the source, or produce a portable HTML review.",
  },
];

const faqs = [
  {
    question: "What files does Sniff read?",
    answer:
      "Sniff is built for IONICON IoniTOF PTR-MS and PTR-TOF .h5 files. It reads the acquisition data and calibration information already present in the file; it does not repair missing scientific evidence with guesses.",
  },
  {
    question: "Does Sniff identify compounds automatically?",
    answer:
      "It proposes formula and library matches using exact mass, isotope patterns and plausibility checks. A candidate is not proof of identity, and structural isomers may remain indistinguishable. Unknowns, overlap and background signals are kept visible for expert review.",
  },
  {
    question: "Can I trust the reported concentrations?",
    answer:
      "Concentration depends on the file or project calibration constant K. A file-derived scale is not the same as a standards or project calibration. Humidity-sensitive compounds need supported humidity calibration; otherwise their values should be treated as indicative.",
  },
  {
    question: "Do I need to install Python?",
    answer:
      "No, not for the macOS or Windows desktop installers: they include the runtime and required data. If you run Sniff from a source checkout, Python 3.9 or newer and uv are required.",
  },
  {
    question: "Where does my data go?",
    answer:
      "The desktop app processes files locally and talks only to a localhost service at 127.0.0.1. Your .h5 files are not uploaded to Sniff or an external analysis service.",
  },
  {
    question: "Why does my operating system warn about the installer?",
    answer:
      "The current macOS package and Windows installer are unsigned. macOS may require the terminal installer command or Open Anyway in Privacy & Security; Windows SmartScreen requires More info and Run anyway. See the first-run guidance for the exact steps.",
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
        <p class="eyebrow">Open-source PTR-MS workbench</p>
        <h1 id="sniff-title">
          From <span>.h5</span> to a result you can review.
        </h1>
        <p class="hero-lede">
          Sniff is a local analysis workflow for IONICON IoniTOF PTR-MS /
          PTR-TOF data. It turns a large acquisition file into inspectable
          evidence, not a black-box answer.
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

    <section class="signal-strip" aria-label="Sniff workflow">
      <span>IONICON .h5</span><b>→</b><span>inspect</span><b>→</b
      ><span>peaks + segments</span><b>→</b><span>expert review</span><b>→</b
      ><span>CSV</span>
    </section>

    <section class="intro-section" aria-labelledby="why-sniff">
      <div class="section-kicker">A careful path through complex data</div>
      <div class="intro-layout">
        <h2 id="why-sniff">Analysis should leave a trail.</h2>
        <div>
          <p class="large-copy">
            Sniff replaces a proprietary viewer with a transparent, reproducible
            path from raw acquisition to export. It reads the file's own
            evidence, applies deterministic checks, and gives a scientist the
            final say.
          </p>
          <p>
            That means a useful result is not just a table of names. It is a set
            of decisions you can inspect: where the mass axis was calibrated,
            which peaks were selected, how samples and backgrounds were
            separated, and which quantities can actually be calibrated.
          </p>
        </div>
      </div>
    </section>

    <section class="workflow-section" aria-labelledby="workflow-title">
      <div class="section-title-row">
        <div>
          <p class="eyebrow">One analysis core</p>
          <h2 id="workflow-title">A workflow built for hand-off.</h2>
        </div>
        <p>
          Automate the repeatable parts. Keep the judgement where it belongs.
        </p>
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
          <p class="eyebrow">Under the hood</p>
          <h2 id="capabilities-title">Signals, context, caveats.</h2>
        </div>
        <p>
          Designed for people who would rather understand a method than trust a
          slogan.
        </p>
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

    <section class="privacy-section" aria-labelledby="privacy-title">
      <div class="privacy-mark" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <div>
        <p class="eyebrow">Local by design</p>
        <h2 id="privacy-title">Your acquisition stays on your machine.</h2>
        <p>
          The desktop app starts a small local service and communicates with
          <code>127.0.0.1</code>. Your HDF5 file is read locally; nothing is
          sent to an external analysis API. Review configurations are saved
          beside the source file so the decisions remain part of the project.
        </p>
      </div>
    </section>

    <section class="interfaces-section" aria-labelledby="interfaces-title">
      <div class="section-title-row">
        <div>
          <p class="eyebrow">Use it your way</p>
          <h2 id="interfaces-title">CLI for pipelines. App for review.</h2>
        </div>
      </div>
      <div class="interface-grid">
        <article class="interface-card cli-card">
          <div class="card-icon" aria-hidden="true">$_</div>
          <h3>Command line</h3>
          <p>
            Inspect files, discover peaks and segments, run curated analysis,
            calibrate against a reference, or compare exports. Every discovery
            command returns JSON, ready for a script or an agent to curate.
          </p>
          <pre><code>sniff inspect FILE.h5
sniff peaks FILE.h5
sniff analyze FILE.h5 --config cfg.json</code></pre>
        </article>
        <article class="interface-card">
          <div class="card-icon" aria-hidden="true">⌁</div>
          <h3>Desktop review</h3>
          <p>
            Open a file from a native file dialog, watch the read progress,
            inspect the spectrum and intervals, edit the evidence, and export
            without leaving the review. The app is the same Sniff workflow in
            its own window.
          </p>
          <div class="mini-points">
            <span>live-saved config</span><span>raw / corrected / conc</span
            ><span>portable HTML</span>
          </div>
        </article>
      </div>
    </section>

    <section class="honesty-section" aria-labelledby="honesty-title">
      <div class="honesty-heading">
        <p class="eyebrow">Before you interpret</p>
        <h2 id="honesty-title">A proposal is not proof.</h2>
      </div>
      <div class="honesty-content">
        <p>
          Sniff is deterministic software, not an oracle. Formula and
          bundled-library matches are candidate proposals. They do not prove a
          chemical identity, and structural isomers, overlapping signals,
          unknowns and contamination can remain unresolved.
        </p>
        <p>
          Concentrations depend on the file or project calibration.
          Humidity-sensitive compounds need a supported calibration and humidity
          correction; without that evidence, report them as indicative. The
          intended result is deterministic tools plus expert review, not a
          magical one-click scientific conclusion.
        </p>
      </div>
    </section>

    <SniffDownloads />

    <section class="requirements-section" aria-labelledby="requirements-title">
      <div>
        <p class="eyebrow">Requirements & installation</p>
        <h2 id="requirements-title">Start with the file you already have.</h2>
      </div>
      <div class="requirements-grid">
        <div>
          <h3>Desktop</h3>
          <p>
            Download an installer above. macOS support currently means Apple
            silicon and macOS 11 or newer; Windows support is x86-64. The
            installers include Python and scientific dependencies, so no
            separate Python installation is needed.
          </p>
        </div>
        <div>
          <h3>From source</h3>
          <p>
            For development or Linux today, use Python 3.9+ with
            <a href="https://docs.astral.sh/uv/">uv</a>:
          </p>
          <pre><code>uv sync
uv run sniff --help
uv run sniff app</code></pre>
        </div>
      </div>
    </section>

    <section
      class="first-run-section"
      id="first-run"
      aria-labelledby="first-run-title"
    >
      <div class="section-title-row">
        <div>
          <p class="eyebrow">First run</p>
          <h2 id="first-run-title">A short note about unsigned installers.</h2>
        </div>
        <a
          class="text-link"
          href="https://github.com/saattrupdan/sniff/blob/main/packaging/README.md#first-run-on-a-clean-machine"
        >
          Full packaging guidance <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div class="first-run-grid">
        <div>
          <strong>macOS</strong>
          <p>
            Gatekeeper may say the package cannot be verified. Install from
            Terminal with
            <code
              >sudo installer -pkg sniff-review-macos-arm64.pkg -target /</code
            >, or use Settings → Privacy & Security → Open Anyway.
          </p>
        </div>
        <div>
          <strong>Windows</strong>
          <p>
            SmartScreen may say Windows protected your PC. Choose
            <em>More info</em>, then <em>Run anyway</em> to proceed with the
            unsigned MSI.
          </p>
        </div>
      </div>
    </section>

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

    <section class="closing-section" aria-labelledby="closing-title">
      <img :src="sniffMarkUrl" alt="Sniff" />
      <div>
        <p class="eyebrow">Open, inspect, understand</p>
        <h2 id="closing-title">
          Bring a little more method to your mass spectra.
        </h2>
        <p>Sniff is MIT-licensed and built in the open.</p>
        <div class="closing-links">
          <a href="#download"
            >Download Sniff <span aria-hidden="true">↓</span></a
          >
          <a href="https://github.com/saattrupdan/sniff"
            >GitHub source <span aria-hidden="true">↗</span></a
          >
          <a href="https://github.com/saattrupdan/sniff#readme"
            >Documentation <span aria-hidden="true">↗</span></a
          >
        </div>
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
  line-height: 1.65;
}
.eyebrow,
.section-kicker {
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
.signal-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 1.2rem;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  border-top: 1px solid color-mix(in srgb, var(--text-color) 13%, transparent);
  border-bottom: 1px solid
    color-mix(in srgb, var(--text-color) 13%, transparent);
  color: var(--text-color);
  font:
    700 0.68rem/1.3 "Open Sans",
    sans-serif;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.signal-strip span:first-child,
.signal-strip span:last-child {
  color: var(--sniff-accent);
}
.signal-strip b {
  color: color-mix(in srgb, var(--text-color) 35%, transparent);
  font-size: 1rem;
}
.intro-section,
.workflow-section,
.capabilities-section,
.privacy-section,
.interfaces-section,
.honesty-section,
.requirements-section,
.first-run-section,
.faq-section,
.closing-section {
  padding-top: 8rem;
}
.intro-layout {
  display: grid;
  grid-template-columns: minmax(240px, 0.85fr) minmax(0, 1.15fr);
  gap: 5rem;
}
.intro-layout h2 {
  max-width: 330px;
}
.intro-layout p {
  max-width: 650px;
  margin: 0 0 1.2rem;
  color: var(--text-color);
}
.intro-layout .large-copy {
  color: var(--text-color);
  font-size: 1.3rem;
  line-height: 1.55;
}
.section-title-row {
  display: flex;
  gap: 2rem;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 2.2rem;
}
.section-title-row > p {
  max-width: 315px;
  margin: 0;
  color: var(--text-color);
  font-size: 0.95rem;
  line-height: 1.5;
  text-align: right;
}
.workflow-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.workflow-card {
  position: relative;
  min-height: 220px;
  padding: 1.5rem;
  border-top: 3px solid var(--sniff-teal);
  background: color-mix(in srgb, var(--bg-secondary) 65%, var(--bg-primary));
}
.step-number {
  display: block;
  margin-bottom: 3rem;
  color: var(--sniff-accent);
  font:
    700 0.75rem/1 "Open Sans",
    sans-serif;
  letter-spacing: 0.13em;
}
.workflow-card p,
.capability-card p,
.interface-card p,
.requirements-grid p,
.first-run-grid p,
.closing-section p {
  color: var(--text-color);
  font-size: 0.92rem;
  line-height: 1.55;
}
.workflow-card p {
  max-width: 275px;
  margin: 0.8rem 0 0;
}
.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid color-mix(in srgb, var(--text-color) 15%, transparent);
}
.capability-card {
  min-height: 210px;
  padding: 1.5rem 1.5rem 1.5rem 0;
  border-bottom: 1px solid
    color-mix(in srgb, var(--text-color) 15%, transparent);
}
.capability-card:not(:nth-child(3n + 1)) {
  padding-left: 1.5rem;
  border-left: 1px solid color-mix(in srgb, var(--text-color) 15%, transparent);
}
.capability-label {
  display: block;
  margin-bottom: 1.8rem;
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
.privacy-section {
  display: grid;
  grid-template-columns: 110px minmax(0, 660px);
  gap: 2.5rem;
  align-items: start;
  max-width: 930px;
  margin-left: auto;
  margin-right: auto;
}
.privacy-section h2 {
  margin-bottom: 1.2rem;
}
.privacy-section p:not(.eyebrow) {
  max-width: 630px;
  margin: 0;
  color: var(--text-color);
}
.privacy-section code,
.first-run-section code {
  padding: 0.08rem 0.3rem;
  border-radius: 0.15rem;
  background: color-mix(in srgb, var(--text-color) 9%, transparent);
  font-size: 0.88em;
}
.privacy-mark {
  display: flex;
  height: 110px;
  align-items: end;
  gap: 0.35rem;
  padding: 1.1rem;
  border-radius: 0.3rem;
  background: var(--sniff-teal);
}
.privacy-mark span {
  width: 11px;
  height: 35%;
  background: var(--sniff-mint);
}
.privacy-mark span:nth-child(2) {
  height: 65%;
}
.privacy-mark span:nth-child(3) {
  height: 100%;
}
.privacy-mark span:nth-child(4) {
  height: 52%;
}
.privacy-mark span:nth-child(5) {
  height: 78%;
}
.interface-grid {
  display: grid;
  min-width: 0;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
.interface-card {
  min-width: 0;
  padding: 1.6rem;
  border: 1px solid color-mix(in srgb, var(--text-color) 15%, transparent);
  border-radius: 0.4rem;
}
.interface-card p {
  max-width: 440px;
  margin: 1rem 0 1.4rem;
}
.cli-card {
  border-color: var(--sniff-accent);
}
.card-icon {
  margin-bottom: 2.5rem;
  color: var(--sniff-accent);
  font:
    700 1.5rem/1 "Open Sans",
    sans-serif;
}
.interface-card pre,
.requirements-grid pre {
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  overflow-x: auto;
  margin: 0;
  padding: 0.95rem;
  border-radius: 0.25rem;
  background: var(--bg-code-1);
  color: var(--text-color);
  font:
    0.78rem/1.65 ui-monospace,
    SFMono-Regular,
    Menlo,
    monospace;
}
.mini-points {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.mini-points span {
  padding: 0.4rem 0.55rem;
  border-radius: 0.2rem;
  background: color-mix(in srgb, var(--sniff-teal) 12%, transparent);
  color: var(--sniff-accent);
  font-size: 0.7rem;
  font-weight: 700;
}
.honesty-section {
  display: grid;
  grid-template-columns: minmax(230px, 0.8fr) minmax(0, 1.2fr);
  gap: 5rem;
  padding-bottom: 0.5rem;
}
.honesty-section h2 {
  color: var(--sniff-accent);
}
.honesty-content {
  padding: 1.5rem 1.7rem;
  border-left: 3px solid var(--sniff-teal);
  background: color-mix(in srgb, var(--sniff-teal) 9%, transparent);
}
.honesty-content p {
  margin: 0 0 1rem;
  line-height: 1.65;
}
.honesty-content p:last-child {
  margin-bottom: 0;
}
.requirements-section {
  display: grid;
  grid-template-columns: minmax(250px, 0.85fr) minmax(0, 1.15fr);
  gap: 5rem;
}
.requirements-section h2 {
  max-width: 340px;
}
.requirements-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
.requirements-grid h3 {
  color: var(--sniff-accent);
}
.requirements-grid p {
  margin: 0.7rem 0 1rem;
}
.requirements-grid a {
  color: var(--text-color) !important;
  font-weight: 700;
  text-decoration: underline !important;
}
.first-run-section a {
  font-weight: 700;
}
.first-run-section {
  padding-bottom: 0.5rem;
}
.text-link {
  color: var(--sniff-accent) !important;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none !important;
}
.first-run-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.first-run-grid > div {
  padding: 1.4rem;
  border: 1px solid color-mix(in srgb, var(--text-color) 15%, transparent);
  border-radius: 0.3rem;
}
.first-run-grid strong {
  color: var(--sniff-accent);
  font:
    700 0.76rem/1.2 "Open Sans",
    sans-serif;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.first-run-grid p {
  margin: 0.8rem 0 0;
}
.faq-section {
  max-width: 850px;
  margin: 0 auto;
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
  padding: 1.2rem 0;
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
.closing-section {
  display: grid;
  grid-template-columns: 88px minmax(0, 650px);
  gap: 1.7rem;
  align-items: start;
  padding-bottom: 8rem;
}
.closing-section img {
  width: 88px;
  height: 88px;
  border-radius: 20px;
}
.closing-section h2 {
  max-width: 590px;
}
.closing-section p:not(.eyebrow) {
  margin: 1rem 0;
}
.closing-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
}
.closing-links a {
  color: var(--sniff-accent) !important;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none !important;
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
  .intro-layout,
  .honesty-section,
  .requirements-section {
    gap: 2.5rem;
  }
  .capabilities-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .capability-card:not(:nth-child(3n + 1)) {
    padding-left: 0;
    border-left: 0;
  }
  .capability-card:nth-child(odd) {
    padding-right: 1rem;
  }
  .capability-card:nth-child(even) {
    padding-left: 1rem;
    border-left: 1px solid
      color-mix(in srgb, var(--text-color) 15%, transparent);
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
  .signal-strip {
    justify-content: flex-start;
    gap: 0.5rem 0.7rem;
    padding: 1rem 0;
    font-size: 0.58rem;
  }
  .signal-strip b {
    font-size: 0.8rem;
  }
  .intro-section,
  .workflow-section,
  .capabilities-section,
  .privacy-section,
  .interfaces-section,
  .honesty-section,
  .requirements-section,
  .first-run-section,
  .faq-section,
  .closing-section {
    padding-top: 5.5rem;
  }
  .intro-layout,
  .honesty-section,
  .requirements-section,
  .privacy-section {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .intro-layout h2,
  .requirements-section h2 {
    max-width: none;
  }
  .section-title-row {
    display: block;
  }
  .section-title-row > p {
    margin-top: 1rem;
    text-align: left;
  }
  .workflow-grid,
  .interface-grid,
  .requirements-grid,
  .first-run-grid {
    grid-template-columns: 1fr;
  }
  .workflow-card {
    min-height: 0;
  }
  .step-number {
    margin-bottom: 2rem;
  }
  .capabilities-grid {
    grid-template-columns: 1fr;
  }
  .capability-card,
  .capability-card:nth-child(odd),
  .capability-card:nth-child(even) {
    min-height: 0;
    padding: 1.3rem 0;
    border-left: 0;
  }
  .capability-label {
    margin-bottom: 1rem;
  }
  .privacy-mark {
    width: 110px;
  }
  .honesty-content {
    padding: 1.2rem;
  }
  .first-run-section .section-title-row .text-link {
    display: inline-block;
    margin-top: 1.2rem;
  }
  .closing-section {
    grid-template-columns: 58px minmax(0, 1fr);
    gap: 1rem;
    padding-bottom: 5rem;
  }
  .closing-section img {
    width: 58px;
    height: 58px;
    border-radius: 13px;
  }
}
</style>
