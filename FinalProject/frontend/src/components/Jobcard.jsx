import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Jobcard({ job, onDelete, baseUrl }) {
  const imgUrl = job.image ? `${baseUrl}${job.image}` : "";

  return (
    <Card sx={{ borderRadius: 3, height: "100%", display: "flex", flexDirection: "column" }}>
      {imgUrl ? (
        <CardMedia component="img" height="150" image={imgUrl} alt={job.title} />
      ) : (
        <CardMedia
          component="div"
          sx={{
            height: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#e9ecf5",
            fontWeight: 800,
          }}
        >
          No Image
        </CardMedia>
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight={800} noWrap>
          {job.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {job.company} • {job.location}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
          <Chip size="small" label={`Salary: ${job.salary || 0}`} />
        </Stack>

        <Typography variant="body2" sx={{ mt: 1 }} noWrap>
          {job.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button
          color="error"
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(job._id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}