import { globalStyle } from "@vanilla-extract/css";
import { roundedButton } from "@/components/basis/Button/RoundedButton/style.css";
import { themeVars } from "@/theme/theme.css";

globalStyle("table tbody tr:nth-child(odd)", {
  backgroundColor: themeVars.color.tileOdd,
});

globalStyle(`${roundedButton}`, {
  "@media": {
    print: {
      display: "none",
    },
  },
});
