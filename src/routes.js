const express = require("express");
const { JobsService } = require("./services/JobsService.js");
const router = express.Router();

router.get("/", (request, response) => {
  return response.json({
    Mensage: "Hello World",
  });
});

router.get("/jobs", async (request, response) => {
  const jobsService = new JobsService();

  const jobs = await jobsService.findAll();

  return response.json(jobs);
});

router.post("/jobs", async (request, response) => {
  const jobsService = new JobsService();

  const job = request.body;

  if (
    !job ||
    !job.title ||
    !job.nameCompany ||
    !job.location ||
    !job.description ||
    !job.imageURL ||
    !job.link
  ) {
    return response.status(400).json({
      message: "required is falied because missing data",
    });
  }

  const newJob = await jobsService.createJobs(job);

  if (newJob) {
    return response.json(newJob);
  }

  return response.status(500).json({ message: "internal error" });
});

router.delete("/jobs", async (request, response) => {
  const jobsService = new JobsService();

  const body = request.body;

  if (!body || !body.id) {
    return response.status(400).json({ message: "id is not find" });
  }

  const result = await jobsService.deleteJob(body.id);

  return response.json(result);
});

module.exports = router;
