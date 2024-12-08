import { dark } from "@mui/material/styles/createPalette";
import { Variant } from "@mui/material/styles/createTypography";

interface IConfig {
    defaultPadding : string;
    fontFamily: string;
    borderRadius: string;
    packageStatTextType: Variant;
    letterSpacing: string;
    fontWeight: number;
    mode: {
        dark: {
            background: {
                default: string;
                paper: string;
            },
            typography: {
                primary: string;
                secondary: string;
                disabled: string;
            }
        }
    }
}

const config: IConfig = {
    defaultPadding : "1 rem",
    borderRadius: "10px",
    fontFamily: 'monospace',
    letterSpacing: '.3rem',
    packageStatTextType: "h6",
    fontWeight: 700,
    mode: {
        dark: {
            background: {
                default: "#282828",
                paper: "#141414",
            },
            typography: {
                primary: "#fff",
                secondary: "rgba(255, 255, 255, 0.7)",
                disabled: "rgba(255, 255, 255, 0.5)"
            }
        }
    }
}

export const metadata = {
    currentYear: 2024
} 

export default config;