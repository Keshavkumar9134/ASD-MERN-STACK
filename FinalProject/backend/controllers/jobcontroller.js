const Job = require("../models/job");
const fs = require("fs");
const path = require("path");

function deleteFileIfExists(filePathFromRoot) {
  try {
    if (!filePathFromRoot) return;

    // Avoid absolute-path join issues if stored path starts with "/"
    const safeRelativePath = filePathFromRoot.replace(/^[/\\]+/, "");
    const fullPath = path.join(__dirname, "..", safeRelativePath);

    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  } catch (e) {
    console.error(e);
  }
}

exports.createjob = async (req, res) => {
  try {
    const { title, company, location, salary, description } = req.body;
    const image = req.file ? `/uploads/jobs/${req.file.filename}` : "";

    const newJob = await Job.create({
      title,
      company,
      location,
      salary: salary ? Number(salary) : 0,
      description,
      image,
    });

    res.status(201).json({ success: true, msg: "Job created", job: newJob });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, msg: "Failed to create job" });
  }
};

exports.getalljobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, total: jobs.length, jobs });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, msg: "Failed to fetch jobs" });
  }
};

exports.getbyjob = async (req, res) => {
  try {
    const found = await Job.findById(req.params.id);
    if (!found) return res.status(404).json({ success: false, msg: "Job not found" });

    res.status(200).json({ success: true, job: found });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, msg: "Failed to fetch job" });
  }
};

exports.deletejob = async (req, res) => {
  try {
    const found = await Job.findById(req.params.id);
    if (!found) return res.status(404).json({ success: false, msg: "Job not found" });

    deleteFileIfExists(found.image);
    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, msg: "Job deleted" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, msg: "Failed to delete job" });
  }
};
