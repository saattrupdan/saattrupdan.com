<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const platforms = [
  {
    id: "macos",
    name: "macOS",
    architecture: "Apple silicon · macOS 11+",
    description: "Native package for Apple silicon Macs.",
    file: "sniff-review-macos-arm64.pkg",
    href: "https://github.com/saattrupdan/sniff/releases/latest/download/sniff-review-macos-arm64.pkg",
    icon: "⌘",
    requiresAppleSilicon: true,
  },
  {
    id: "windows",
    name: "Windows",
    architecture: "x86-64",
    description: "Installer for current 64-bit Windows systems.",
    file: "sniff-review-windows-x86_64.msi",
    href: "https://github.com/saattrupdan/sniff/releases/latest/download/sniff-review-windows-x86_64.msi",
    icon: "⊞",
    requiresAppleSilicon: false,
  },
  {
    id: "linux",
    name: "Linux",
    architecture: "Installer in preparation",
    description: "Linux desktop packaging is being prepared.",
    file: "",
    href: "",
    icon: "◒",
    requiresAppleSilicon: false,
  },
] as const;

type Platform = (typeof platforms)[number];
type PlatformId = Platform["id"];
type MacArchitecture = "apple-silicon" | "intel" | "unknown";
type UserAgentData = {
  getHighEntropyValues?: (
    hints: string[],
  ) => Promise<{ architecture?: string }>;
};

const detectedPlatform = ref<PlatformId | null>(null);
const macosDetected = ref(false);
const macosArchitecture = ref<MacArchitecture>("unknown");
const recommendation = computed(() =>
  platforms.find((platform) => platform.id === detectedPlatform.value),
);
const isAvailable = (platform: Platform) =>
  Boolean(platform.href && platform.file);

onMounted(async () => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes("windows")) {
    detectedPlatform.value = "windows";
    return;
  }

  if (!userAgent.includes("macintosh") && !userAgent.includes("mac os x")) {
    return;
  }

  macosDetected.value = true;
  const userAgentData = (
    navigator as Navigator & { userAgentData?: UserAgentData }
  ).userAgentData;
  if (!userAgentData?.getHighEntropyValues) return;

  try {
    const { architecture } = await userAgentData.getHighEntropyValues([
      "architecture",
    ]);
    const normalizedArchitecture = architecture?.toLowerCase();
    if (
      normalizedArchitecture === "arm" ||
      normalizedArchitecture === "arm64"
    ) {
      macosArchitecture.value = "apple-silicon";
      detectedPlatform.value = "macos";
    } else if (normalizedArchitecture === "x86") {
      macosArchitecture.value = "intel";
    }
  } catch {
    // An unknown architecture must not receive an Apple-silicon recommendation.
  }
});
</script>

<template>
  <section class="downloads" id="download" aria-labelledby="download-title">
    <div class="section-heading">
      <p class="eyebrow">Downloads</p>
      <h2 id="download-title">Choose your platform.</h2>
      <p class="intro">
        Desktop installers include the runtime. Linux packaging is in
        preparation.
      </p>
    </div>

    <p v-if="recommendation" class="detected" role="status" aria-live="polite">
      <span class="detected-dot" aria-hidden="true"></span>
      Recommended for {{ recommendation.name }}.
    </p>
    <p
      v-else-if="macosDetected"
      class="detected architecture-warning"
      role="status"
      aria-live="polite"
    >
      <span class="detected-dot" aria-hidden="true"></span>
      <template v-if="macosArchitecture === 'intel'">
        This Mac is Intel; the macOS installer requires Apple silicon.
      </template>
      <template v-else>
        Confirm that this Mac is Apple silicon before downloading the macOS
        installer.
      </template>
    </p>

    <div class="platform-grid">
      <article
        v-for="platform in platforms"
        :key="platform.id"
        class="platform-card"
        :class="{ recommended: detectedPlatform === platform.id }"
      >
        <div class="platform-topline">
          <span class="platform-icon" aria-hidden="true">{{
            platform.icon
          }}</span>
          <span
            v-if="detectedPlatform === platform.id"
            class="recommended-label"
          >
            Recommended
          </span>
          <span v-else-if="isAvailable(platform)" class="status-label">
            Available
          </span>
          <span v-else class="status-label">Coming soon</span>
        </div>
        <h3>{{ platform.name }}</h3>
        <p class="architecture">{{ platform.architecture }}</p>
        <p class="platform-description">{{ platform.description }}</p>
        <p v-if="platform.requiresAppleSilicon" class="platform-requirement">
          Requires confirmed Apple silicon.
        </p>
        <a
          v-if="isAvailable(platform)"
          class="download-link"
          :href="platform.href"
          :download="platform.file"
          :aria-label="`Download Sniff for ${platform.name}`"
        >
          Download <span aria-hidden="true">↗</span>
        </a>
        <span v-else class="download-link unavailable" aria-disabled="true">
          In preparation
        </span>
      </article>
    </div>

    <p class="download-note">
      Installers are unsigned, so your OS may ask for confirmation. See the
      <a
        href="https://github.com/saattrupdan/sniff/blob/main/packaging/README.md"
        >packaging guidance</a
      >.
    </p>
  </section>
</template>

<style scoped>
.downloads {
  --sniff-accent: color-mix(in srgb, #1f6f6b 45%, var(--text-color));
  margin-top: 5.5rem;
  padding-top: 5rem;
  border-top: 1px solid color-mix(in srgb, var(--text-color) 15%, transparent);
}
.section-heading {
  max-width: 710px;
}
.eyebrow {
  margin: 0 0 0.7rem;
  color: var(--sniff-accent);
  font:
    700 0.75rem/1.2 "Open Sans",
    sans-serif;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.section-heading h2 {
  margin: 0 0 0.8rem;
  font-size: clamp(2rem, 4vw, 3.3rem);
  line-height: 1;
  letter-spacing: -0.03em;
}
.intro {
  max-width: 620px;
  margin: 0;
  color: var(--text-color);
  font-size: 1rem;
  line-height: 1.5;
}
.detected {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  margin: 1.5rem 0 0;
  color: var(--text-color);
  font:
    700 0.88rem/1.4 "Open Sans",
    sans-serif;
}
.detected-dot {
  width: 0.55rem;
  height: 0.55rem;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #1f6f6b;
  box-shadow: 0 0 0 5px #eafaf6;
}
.platform-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}
.platform-card {
  display: flex;
  min-height: 215px;
  flex-direction: column;
  padding: 1.35rem;
  border: 1px solid color-mix(in srgb, var(--text-color) 16%, transparent);
  border-radius: 0.45rem;
  background: color-mix(in srgb, var(--bg-secondary) 70%, var(--bg-primary));
}
.platform-card.recommended {
  border-color: var(--sniff-accent);
  box-shadow: 0 0 0 2px color-mix(in srgb, #1f6f6b 22%, transparent);
}
.platform-topline {
  display: flex;
  min-height: 1.45rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.platform-icon {
  color: var(--sniff-accent);
  font:
    700 1.5rem/1 "Open Sans",
    sans-serif;
}
.status-label,
.recommended-label {
  color: var(--text-color);
  font:
    700 0.68rem/1.2 "Open Sans",
    sans-serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.recommended-label {
  color: var(--sniff-accent);
  text-align: right;
}
.platform-card h3 {
  margin: 1.6rem 0 0.25rem;
  font-size: 1.65rem;
}
.architecture {
  margin: 0;
  color: var(--sniff-accent);
  font:
    700 0.75rem/1.35 "Open Sans",
    sans-serif;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.platform-description {
  margin: 0.8rem 0 1.2rem;
  color: var(--text-color);
  font-size: 0.92rem;
  line-height: 1.45;
}
.platform-requirement {
  margin: -0.5rem 0 1.2rem;
  color: var(--text-color);
  font-size: 0.8rem;
  line-height: 1.4;
}
.download-link {
  display: inline-flex;
  width: fit-content;
  gap: 0.45rem;
  align-items: center;
  margin-top: auto;
  padding: 0.7rem 0.95rem;
  border-radius: 0.25rem;
  background: #1f6f6b;
  color: #eafaf6 !important;
  font:
    700 0.84rem/1 "Open Sans",
    sans-serif;
  text-decoration: none !important;
}
.download-link:hover {
  background: color-mix(in srgb, #1f6f6b 78%, var(--text-color));
}
.download-link.unavailable {
  background: color-mix(in srgb, var(--text-color) 10%, transparent);
  color: var(--text-color) !important;
  cursor: not-allowed;
}
.download-note {
  margin: 1.2rem 0 0;
  color: var(--text-color);
  font-size: 0.88rem;
  line-height: 1.5;
}
.download-note a {
  color: var(--text-color) !important;
  font-weight: 700;
  text-decoration: underline !important;
}
@media only screen and (max-width: 700px) {
  .platform-grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .platform-card {
    min-height: 0;
  }
}
</style>
