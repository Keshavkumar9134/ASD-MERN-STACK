const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const jbtrl = require("../controllers/jobcontroller");

const uploadDir = path.join(__dirname, "..", "uploads", "jobs");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `job_${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

router.post("/", upload.single("image"), jbtrl.createjob);
router.get("/", jbtrl.getalljobs);
router.get("/:id", jbtrl.getbyjob);
router.delete("/:id", jbtrl.deletejob);

module.exports = router;
