const { prisma } = require("../dataBase/connection.js");

class JobsService {
  async findAll() {
    const jobs = await prisma.job.findMany();
    if (!jobs || !jobs.length) {
      return [];
    }
    return jobs;
  }

  async createJobs(job) {
    const newJob = await prisma.job.create({
      data: {
        title: job.title,
        nameCompany: job.nameCompany,
        location: job.location,
        description: job.description,
        imageURL: job.imageURL,
        link: job.link,
      },
    });

    return newJob;
  }

  async deleteJob(jobId) {
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      return { message: "Cannot find this job" };
    }

    await prisma.job.delete({
      where: {
        id: jobId,
      },
    });

    return { message: "delete success" };
  }
}

module.exports = { JobsService };
