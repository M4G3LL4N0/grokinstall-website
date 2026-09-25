import "./styles.css";
import {
  CONTRACT,
  PLATFORMS,
  REFUSAL,
  VERDICTS,
  VERIFICATIONS,
  type Verdict,
} from "./content";

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className !== undefined) {
    node.className = className;
  }
  if (text !== undefined) {
    node.textContent = text;
  }
  return node;
}

function renderContract(): void {
  const target = document.getElementById("contract-text");
  if (target !== null) {
    target.textContent = CONTRACT;
  }
}

function renderRefusal(): void {
  const target = document.getElementById("refusal-text");
  if (target !== null) {
    target.textContent = REFUSAL;
  }
}

function renderVerdicts(): void {
  const host = document.getElementById("verdicts");
  if (host === null) {
    return;
  }
  for (const verdict of VERDICTS) {
    host.append(buildVerdict(verdict));
  }
}

function buildVerdict(verdict: Verdict): HTMLElement {
  const card = el("article", `verdict verdict--${verdict.tone}`);
  card.append(el("span", "verdict__id", verdict.id));
  card.append(el("h3", "verdict__title", verdict.title));
  card.append(el("p", "verdict__body", verdict.body));

  const list = el("ul", "verdict__details");
  for (const item of verdict.detail) {
    list.append(el("li", undefined, item));
  }
  card.append(list);
  return card;
}

function renderPlatforms(): void {
  const host = document.getElementById("platforms");
  if (host === null) {
    return;
  }
  for (const platform of PLATFORMS) {
    const item = el("li", "platforms__item");
    item.append(el("span", "platforms__target", platform.target));
    item.append(el("code", "platforms__hash", platform.sha256));
    host.append(item);
  }
}

function renderProof(): void {
  const host = document.getElementById("proof");
  if (host === null) {
    return;
  }
  for (const item of VERIFICATIONS) {
    const row = el("div", "proof__row");
    row.append(el("dt", "proof__label", item.label));
    row.append(el("dd", "proof__value", item.value));
    row.append(el("dd", "proof__note", item.note));
    host.append(row);
  }
}

function countBytes(): void {
  const nodes = document.querySelectorAll<HTMLElement>("[data-bytes]");
  nodes.forEach((node) => {
    node.textContent = "432 B";
  });
}

function markActiveRail(): void {
  const sections = document.querySelectorAll<HTMLElement>("main section[id]");
  const rails = document.querySelectorAll<HTMLElement>(".rail");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }
        const id = (entry.target as HTMLElement).id;
        rails.forEach((rail) => {
          const label = rail.querySelector("span");
          if (label === null) {
            return;
          }
          const matches = rail.parentElement?.id === id;
          rail.dataset["active"] = matches ? "true" : "false";
        });
      }
    },
    { rootMargin: "-45% 0px -45% 0px" },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

function init(): void {
  renderContract();
  renderRefusal();
  renderVerdicts();
  renderPlatforms();
  renderProof();
  countBytes();
  markActiveRail();
}

init();
