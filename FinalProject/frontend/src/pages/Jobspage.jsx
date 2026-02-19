import React, { useEffect, useState } from "react";
import axios from "axios";
import Jobform from "../components/Jobform";
import Joblist from "../components/Joblist";
import { Alert, Box, Snackbar } from "@mui/material";

const BASE_URL = "http://localhost:5500";

const Jobspage = () => {
  const [jobs, setJobs] = useState([]);
  const [toast, setToast] = useState({ open: false, msg: "", type: "success" });

  const showToast = (msg, type = "success") => setToast({ open: true, msg, type });
  const closeToast = () => setToast((p) => ({ ...p, open: false }));

  const fetchjobs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/jobs`);
      setJobs(res.data.jobs || []);
    } catch (e) {
      console.error(e);
      showToast(e?.response?.data?.msg || "Failed to load jobs", "error");
    }
  };

  useEffect(() => {
    fetchjobs();
  }, []);

  const addjob = async (formdata) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/jobs`, formdata);
      showToast(res.data.msg || "Job added");
      await fetchjobs();
      return true;
    } catch (e) {
      console.error(e);
      showToast(e?.response?.data?.msg || "Failed to add job", "error");
      return false;
    }
  };

  const deletejob = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/jobs/${id}`);
      showToast(res.data.msg || "Job deleted");
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (e) {
      console.error(e);
      showToast(e?.response?.data?.msg || "Failed to delete job", "error");
    }
  };

  return (
    <Box>
      <Jobform onAdd={addjob} />
      <Joblist jobs={jobs} onDelete={deletejob} baseUrl={BASE_URL} />

      <Snackbar open={toast.open} autoHideDuration={2500} onClose={closeToast}>
        <Alert onClose={closeToast} severity={toast.type} variant="filled" sx={{ width: "100%" }}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Jobspage;
