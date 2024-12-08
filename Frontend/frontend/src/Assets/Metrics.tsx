import { Chip, Grid2, Typography } from "@mui/material"
import { Variant } from "@mui/material/styles/createTypography";
import Entry from "./Entry";
import { Label } from "@mui/icons-material";

interface IMetrics {
  license: number;
  ramp_up: number;
  bus_factor: number;
  net_score: number;
  correctness: number;
  responsive_maintainer: number;
  create_package_json_field: number;
  create_pull_requests_field: number;

  license_latency: number;
  ramp_up_latency: number;
  net_score_latency: number;
  bus_factor_latency: number;
  correctness_latency: number;
  responsive_maintainer_latency: number;
  create_package_json_field_latency: number;
  create_pull_requests_field_latency: number;
}

interface IMetricsProps {
    Metrics: any
}


interface IScoreProps {
  Criteria: string; 
  Score: number
}

function Score({ Criteria, Score }: IScoreProps) {
  
  const content = `${Criteria}: ${Score}`
  if (Score > 0.8) {
    return <Chip label={content} color="success" variant="outlined" />
  }

  if (Score > 0.4) {
    return <Chip label={content} color="warning" variant="outlined" />
  }

  return <Chip label={content} color="error" variant="outlined" />
}
function Metrics({ Metrics }: IMetricsProps) {

  const spacing = {
    md: 3,
    lg: 2
  }


  const metric = Metrics as IMetrics;
  const ver: Variant = "subtitle1";

  return (
    <>
      <Grid2 container spacing={1}>
        
        <Grid2 spacing={spacing}>
          <Score
            Criteria="license"
            Score={metric.license}
          />
        </Grid2>

        <Grid2 spacing={spacing}>
          <Score 
            Criteria="Ramp Up" 
            Score={metric.ramp_up} 
          />
        </Grid2>

        <Grid2 spacing={spacing}>
          <Score 
            Criteria="Bus Factor" 
            Score={metric.bus_factor} 
          />
        </Grid2>

        <Grid2 spacing={spacing}>
          <Score 
            Criteria="Correctness" 
            Score={metric.correctness} 
          />
        </Grid2>

        <Grid2 spacing={spacing}>
          <Score 
            Criteria="Responsive Maintainer" 
            Score={metric.responsive_maintainer} 
          />
        </Grid2>

        <Grid2 spacing={spacing}>
          <Score 
            Criteria="Create Package Json" 
            Score={metric.create_package_json_field} 
          />
        </Grid2>

        <Grid2 spacing={spacing}>
          <Score 
            Criteria="Create Pull Requests" 
            Score={metric.create_pull_requests_field} 
          />
        </Grid2>
      </Grid2>
    </>
  )
}

export default Metrics;