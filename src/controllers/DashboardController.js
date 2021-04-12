const Job = require('../models/Job');
const Profile = require('../models/Profile');

const {
  calculateJobBudget,
  calculateRemainingDays,
  getJobStatus,
} = require('../utils/JobUtilities');

const DashBoardController = {
  async index(req, res) {
    try {
      const jobs = await Job.get(1);
      const profile = await Profile.get(1);

      let jobTotalHours = 0;

      const jobsStatusCount = {
        total: jobs.length,
        progress: 0,
        done: 0,
      };

      const updateJobs = (job) => {
        const remaining = calculateRemainingDays(job);
        const status = getJobStatus(remaining);

        let budget = calculateJobBudget(profile.valuePerHour, job.totalHours);

        jobsStatusCount[status]++;

        if (status !== 'done') {
          jobTotalHours += job.dailyHours;
        }

        return {
          ...job,
          remaining,
          status,
          budget,
        };
      };

      const updatedJobs = jobs.map(updateJobs);

      const freeHours = profile.hoursPerDay - jobTotalHours;

      return res.render('index', {
        jobs: updatedJobs,
        profile: {
          name: profile.name,
          avatar: profile.avatar,
        },
        jobsStatusCount,
        freeHours,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = DashBoardController;
