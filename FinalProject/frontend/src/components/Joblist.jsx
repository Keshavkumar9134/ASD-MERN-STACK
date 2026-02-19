import { Grid, Typography } from "@mui/material";
import Jobcard from "./Jobcard";

export default function Joblist({ jobs, onDelete, baseUrl }) {
  if (!jobs.length) {
    return <Typography>No jobs found. Add your first job.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {jobs.map((job) => (
        <Grid key={job._id} item xs={12} sm={6} md={4}>
          <Jobcard job={job} onDelete={onDelete} baseUrl={baseUrl} />
        </Grid>
      ))}
    </Grid>
  );
}
