import { globalStyle, style } from "@vanilla-extract/css";

export const hideInPrint = style({
    
})

globalStyle(`${hideInPrint}`, {
    "@media": {
        print: {
            display: "none"
        }
    }
})