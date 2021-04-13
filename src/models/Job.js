const DbConnection = require('../database/connection');

const JobModel = {
  async get(userId = null) {
    if (!userId) {
      throw new Error('Invalid unique identifier');
    }

    const Database = await DbConnection();

    const query = `SELECT * FROM jobs WHERE userId = ? ORDER BY id DESC`;

    const jobs = await Database.all(query, [userId]);

    await Database.close();

    return jobs;
  },

  async getJobById(jobId = null) {
    if (!jobId) {
      throw new Error('Invalid unique identifier');
    }

    const Database = await DbConnection();

    const query = `SELECT * FROM jobs WHERE id = ?`;

    const job = await Database.get(query, [jobId]);

    await Database.close();

    return job;
  },

  async create(data = {}, userId) {
    const { name, dailyHours, totalHours, createdAt } = data;

    const query = `
      INSERT INTO jobs (
        name,
        dailyHours,
        totalHours,
        createdAt,
        userId
      ) VALUES (?, ?, ?, ?, ?);
    `;

    const Database = await DbConnection();

    await Database.run(query, [
      name,
      dailyHours,
      totalHours,
      createdAt,
      userId,
    ]);

    await Database.close();
  },

  async update(jobId = null, data = {}) {
    if (!data || !Object.values(data).length) {
      throw new Error('Invalid values to update');
    }

    if (!jobId) {
      throw new Error('Invalid unique identifier');
    }

    const { name, dailyHours, totalHours } = data;

    const Database = await DbConnection();

    const query = `
      UPDATE jobs SET 
        name = ?, 
        dailyHours = ?, 
        totalHours = ? 
      WHERE id = ?
    `;

    await Database.run(query, [name, dailyHours, totalHours, jobId]);

    await Database.close();
  },

  async delete(jobId = null) {
    if (!jobId) {
      throw new Error('Invalid unique identifier');
    }

    const Database = await DbConnection();

    const query = 'DELETE FROM jobs WHERE id = ?';

    await Database.run(query, [jobId]);

    await Database.close();
  },
};

module.exports = JobModel;
