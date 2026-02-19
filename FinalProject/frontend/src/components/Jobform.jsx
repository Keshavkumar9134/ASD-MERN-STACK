import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function Jobform({ onAdd }) {
  const [data, setData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    setImage(file || null);
  };

  const reset = () => {
    setData({ title: "", company: "", location: "", salary: "", description: "" });
    setImage(null);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!data.title || !data.company || !data.location || !data.description) return;

    const fd = new FormData();
    fd.append("title", data.title);
    fd.append("company", data.company);
    fd.append("location", data.location);
    fd.append("salary", data.salary || "0");
    fd.append("description", data.description);
    if (image) fd.append("image", image);

    setSubmitting(true);
    const ok = await onAdd(fd);
    setSubmitting(false);

    if (ok) reset();
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
          Add New Job
        </Typography>

        <Box component="form" onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField label="Job Title *" name="title" value={data.title} onChange={handleChange} fullWidth required />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Company *" name="company" value={data.company} onChange={handleChange} fullWidth required />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Location *" name="location" value={data.location} onChange={handleChange} fullWidth required />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Salary" name="salary" value={data.salary} onChange={handleChange} fullWidth type="number" />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description *"
                name="description"
                value={data.description}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={3}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button variant="outlined" component="label" fullWidth startIcon={<CloudUploadIcon />} sx={{ py: 1.2 }}>
                {image ? "Image selected" : "Upload Job Image"}
                <input hidden type="file" accept="image/*" onChange={handleFile} />
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={submitting || !data.title || !data.company || !data.location || !data.description}
                sx={{ py: 1.2, fontWeight: 700 }}
              >
                {submitting ? "Saving..." : "Add Job"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
