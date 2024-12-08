import { Box, Chip, Stack, Typography } from "@mui/material";
import config from "../Styles/config";
import Entry from "./Entry";
import IVersion from "../Types/Version";
import Metrics from "./Metrics";

interface IVersionProps {
    Current: any,
    Previous: any
}

function Version({ Current, Previous }: IVersionProps) {

  const cur = Current[0] as IVersion;
  const hasPreviousVersions = Previous?.length > 0 || false;
  const prev = hasPreviousVersions? Previous as IVersion[] : undefined;
  
  const size = Number(cur.size) / 1e6;
  const start = 0;
  const stop = 0;
  const prevVersions = hasPreviousVersions && prev?.map(v => (
    <Chip 
      label={v.name}
      color="success"
      variant="outlined"
    />
  ))

  return (
      <>
        <Stack direction={"column"} spacing={1}>
          <Entry 
            Left={<Typography variant={config.packageStatTextType}>Current Version:</Typography>}
            Right={<Typography variant={config.packageStatTextType}>{cur.name}</Typography>}
          />
          <Entry 
            Left={<Typography variant={config.packageStatTextType}>Previous Versions:</Typography>}
            Right={<Box>{prevVersions}</Box>}
          />

          <Entry 
            Left={<Typography variant={config.packageStatTextType}>Size:</Typography>}
            Right={<Typography variant={config.packageStatTextType}>{size} mb</Typography>}
          />

          
          <Entry 
            Left={<Typography variant={config.packageStatTextType}>Rating:</Typography>}
            Right={<Typography variant={config.packageStatTextType}>{cur.rating.net_score}</Typography>}
          />

          <Entry 
            Left={<Typography variant={config.packageStatTextType}>Scores:</Typography>}
            Right={<Metrics Metrics={cur.rating}/>}
          />
        </Stack>
      </>
  );
}

export default Version;