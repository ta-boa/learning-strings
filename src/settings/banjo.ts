import { Note, InstrumentSettings } from "../music/types";

//https://www.deeringbanjos.com/pages/how-to-tune-a-banjo#:~:text=5%2DString%20Banjo-,G%2C%20D%2C%20G%2C%20B%2C%20D,be%20playing%20a%20G%20chord.
export const tuningOptions: Record<string, Note[]> = {
  "Open G": ["D", "B", "G", "D"], // 5th G
  "Double C": ["C", "G", "C", "D"], // 5th G
  "Drop C": ["C", "G", "B", "D"], // 5th G
  "D tunning": ["D", "Fs", "A", "D"], // 5th F#
  "G modal": ["D", "G", "C", "D"], // 5th G
};

// • · ∙ ●
const bullet = "•";
export default {
  name: "Banjo",
  frets: 22,
  strings: 4,
  armBullets: {
    3: bullet,
    5: bullet,
    7: bullet,
    10: bullet,
    12: bullet.repeat(2),
    15: bullet,
    17: bullet,
  },
  tuning: tuningOptions["Open G"],
  tuningOptions,
} as InstrumentSettings;
