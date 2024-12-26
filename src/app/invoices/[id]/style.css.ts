import { globalStyle } from "@vanilla-extract/css";
import { roundedButton } from "@/components/basis/Button/RoundedButton/style.css";
import { themeVars } from "@/theme/theme.css";

globalStyle("table", {
  borderCollapse: "collapse",
  border: "1px solid",
});

globalStyle("table tr:not(thead tr)", {
  borderBottom: "1px solid",
});
globalStyle("table tbody tr:nth-child(odd)", {
  backgroundColor: themeVars.color.tileOdd,
});

// Apply alternating background color to even rows in the table body
globalStyle("table tbody tr:nth-child(even)", {
  backgroundColor: themeVars.color.tileEven,
});

globalStyle("tr", {
    height: "4rem"
})

globalStyle("table tfoot td", {
  "@media": {
    "print": { 
      borderTop: "1px solid black"
    }
  }
})

globalStyle(`${roundedButton}`, {
  "@media": {
    "print": {
      display: "none"
    }
  }  
})
