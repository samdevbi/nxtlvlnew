export const MEMBER_GRADIENTS: Record<string, string> = {
  "samandar-rakhmatillaev":
    "linear-gradient(165deg, #1a3358 0%, #0d1f3c 45%, #13294A 100%)",
  "azamov-bahovuddin":
    "linear-gradient(165deg, #0f2847 0%, #081426 50%, #1a3055 100%)",
  "ismoilov-akmal":
    "linear-gradient(165deg, #152d4f 0%, #0B1B33 40%, #1e3a62 100%)",
  "javohir-eraliyev":
    "linear-gradient(165deg, #122845 0%, #081426 55%, #163052 100%)",
  "rakhmonkulov-azizbek":
    "linear-gradient(165deg, #1c355c 0%, #0a1830 45%, #0f2544 100%)",
  "temirov-ilkhom":
    "linear-gradient(165deg, #0e2240 0%, #13294A 50%, #081426 100%)",
  "askarov-komiljon":
    "linear-gradient(165deg, #163050 0%, #0B1B33 40%, #1a3358 100%)",
  "qaxxarov-azizbek":
    "linear-gradient(165deg, #112640 0%, #081426 50%, #18355a 100%)",
};

export function memberGradient(slug: string) {
  return MEMBER_GRADIENTS[slug] ?? "linear-gradient(165deg, #13294A 0%, #081426 100%)";
}
