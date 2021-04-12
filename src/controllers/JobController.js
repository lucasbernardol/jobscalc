const Job = require('../models/Job');
const Profile = require('../models/Profile');

const { calculateJobBudget } = require('../utils/JobUtilities');

const JobController = {
  index(req, res) {
    try {
      return res.render('job');
    } catch (err) {
      console.log(err);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const profile = await Profile.get(1);

      const job = await Job.getJobById(id);

      if (!job) {
        return res.render('404');
      }

      let budget = calculateJobBudget(profile.valuePerHour, job.totalHours);

      return res.render('job-edit', { job: { ...job, budget } });
    } catch (err) {
      console.log(err);
    }
  },

  async create(req, res) {
    try {
      const { name, dailyHours, totalHours } = req.body;

      const createdAt = Date.now();

      await Job.create(
        {
          name,
          dailyHours,
          totalHours,
          createdAt,
        },
        1
      );

      res.redirect('/');
    } catch (err) {
      console.log(err);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, dailyHours, totalHours } = req.body;

      await Job.update(id, {
        name,
        dailyHours,
        totalHours,
      });

      return res.redirect(`/job/${id}`);
    } catch (err) {
      console.log(err);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      await Job.delete(id);

      return res.redirect('/');
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = JobController;
