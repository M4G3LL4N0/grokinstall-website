export interface Verdict {
  readonly id: string;
  readonly tone: "signal" | "refuse" | "quiet";
  readonly title: string;
  readonly body: string;
  readonly detail: readonly string[];
}

export const REPO = "https://github.com/M4G3LL4N0/grokinstall" as const;
export const REPO_WEBSITE = "https://github.com/M4G3LL4N0/grokinstall-website" as const;
export const RELEASE = "v0.1.1" as const;

/** Byte-for-byte output of `grokinstall grokbot bat.review` from the published
 *  v0.1.1 darwin/arm64 binary. The trailing newline is excluded because the
 *  measurement is of the contract body. */
export const CONTRACT = `CAPABILITY
bat.review

USE WHEN
the user wants GrokBot to: Let GrokBot use bat to inspect text files

CALL
grokinstall run bat.review --input '<json>'

INPUT
input: object - JSON object passed to the capability on stdin

OUTPUT
result: object - the capability's JSON result

DO NOT
load the implementation repository or its documentation into GrokBot before invoking this capability

ON FAILURE
Run:
grokinstall diagnose bat.review`;

export const CONTRACT_BYTES = 432;
export const CONTRACT_CAP = 8192;

/** Verbatim from `grokinstall install https://github.com/pallets/click`. */
export const REFUSAL = `PROVISIONING BLOCKED

Executable:
click

Safest available method:
package manager: python (uv/pip)

Risk:
  - Python installation may execute the project's build backend
  - may resolve and run project-defined packaging code
  - the package declares lifecycle scripts that would execute

Required authorization:
  --allow-install-scripts`;

export const VERDICTS: readonly Verdict[] = [
  {
    id: "no-install",
    tone: "quiet",
    title: "Nothing needs installing",
    body: "When the goal is already satisfied, GrokInstall says so and stops. A receipt records the decision and why it was made.",
    detail: ["documentation only", "goal needs no runtime", "nothing registered"],
  },
  {
    id: "bridge",
    tone: "signal",
    title: "Provision and confine",
    body: "When a runtime is genuinely needed, it is fetched deterministically, verified against recorded hashes, and confined to a GrokInstall-owned directory.",
    detail: ["GitHub release assets", "per-capability isolation", "post-install verification"],
  },
  {
    id: "refuse",
    tone: "refuse",
    title: "Refuse, and change nothing",
    body: "When the safest route needs authorization beyond the safe policy, the install stops, names the blocker, and registers nothing.",
    detail: ["no system state changed", "no staging residue", "specific fix named"],
  },
];

export interface Verification {
  readonly label: string;
  readonly value: string;
  readonly note: string;
}

export const VERIFICATIONS: readonly Verification[] = [
  {
    label: "Tests",
    value: "403",
    note: "26 packages, all passing",
  },
  {
    label: "Race",
    value: "clean",
    note: "go test -race, every package",
  },
  {
    label: "Static",
    value: "clean",
    note: "go vet and gofmt, no findings",
  },
  {
    label: "AI calls at runtime",
    value: "0",
    note: "no network model calls, ever",
  },
];

export interface Platform {
  readonly target: string;
  readonly sha256: string;
}

export const PLATFORMS: readonly Platform[] = [
  {
    target: "darwin/arm64",
    sha256: "a274a891849f8f613c8d4d96fdb704adab3dc8668af050de55d726cb164d3735",
  },
  {
    target: "darwin/amd64",
    sha256: "5fff1af205e1c9bdd96a9d05efe05874a6fe8455810b4caf67f96a3a6096884e",
  },
  {
    target: "linux/amd64",
    sha256: "1652146110b01a2eb8c45639a32a57932ae35c2ee4543d091daa84e8e9d1c8a4",
  },
  {
    target: "linux/arm64",
    sha256: "95a74193c18fd71ae309f2d25f7fa185b1dec814e617b6679ef0fb7b2395c3fd",
  },
];
