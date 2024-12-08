import { Box, Paper, Stack, Typography } from "@mui/material";
import IPackage from "../Types/Package"
import { useState } from "react";
import config from "../Styles/config";
import Version from "./Version";
import DownloadPackage from "./DownloadPackage";
import IVersion from "../Types/Version";
import Entry from "./Entry";

interface IPackageProps {
  Package: IPackage | any
}

function Package({ Package }: IPackageProps) {
    const pkg = Package as IPackage;
    const cur = pkg.current_version as unknown as IVersion[];
    const version = cur[0].name;
    const [elevation, setElevation] = useState<number>(4)
    const name = pkg.package_name.charAt(0).toUpperCase() + pkg.package_name.slice(1); 
    return (
      <Paper
        elevation={elevation}
        sx={{ 
          borderRadius: config.borderRadius,
          minWidth: {
            xs: "auto",
            sm: "auto",
            md: "40dvw",
            lg: "40dvw",
            xl: "40dvw",
          },
          padding: {
            xs: "0.5rem 0.5rem 0.5rem 0.5rem",
            sm: "0.5rem 0.5rem 0.5rem 0.5rem",
            md: "0.5rem 1.2rem 0.5rem 1.2rem",
            lg: "0.5rem 1.2rem 0.5rem 1.2rem",
            xl: "0.5rem 1.2rem 0.5rem 1.2rem",
          }
          
        }}
      >
        <Box>
          <Typography variant="h5">{name}</Typography>
        </Box>

        <Stack direction="column" gap={1}>
          <Version Current={pkg.current_version} Previous={pkg.previous_versions} />
          <Entry
            Left={<></>}
            Right={
              <DownloadPackage
                  Name={name}
                  Version={version}
                />
            }
          />
        </Stack>

      </Paper>
    )
}

export default Package;