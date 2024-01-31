import { Architects_Daughter } from "next/font/google";
import { Dancing_Script } from "next/font/google";

// define your variable fonts
const architects_daughter = Architects_Daughter({
  subsets: ["latin"],
  weight: "400",
});
const dancing_script = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
});

export { architects_daughter, dancing_script };
