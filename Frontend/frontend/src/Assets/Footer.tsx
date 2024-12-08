import { Box, Typography } from "@mui/material";
import config, { metadata } from "../Styles/config"

function Footer() {
    const theme = config.mode.dark;
    return (
            <Box
                sx={{
                    backgroundColor: config.mode.dark.background.default,
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    gap: 1,
                    paddingTop: config.defaultPadding,
                    minHeight: "30 dvh"
                }}
            >
                <Typography 
                    fontFamily={config.fontFamily} 
                    fontWeight={config.fontWeight}
                    variant="h5"
                    color={theme.typography.primary}
                >
                    NPM Registery
                </Typography>
                <Typography 
                    color={theme.typography.primary}
                    variant="h6"
                >
                    © {metadata.currentYear}
                </Typography>
            </Box>
    );
}

export default Footer;