const calculateRemainingDays = (job) => {
  const remaining = (job.totalHours / job.dailyHours).toFixed();

  const createdDate = new Date(job.createdAt);
  const dueDay = createdDate.getDate() + Number(remaining);
  const dueDate = createdDate.setDate(dueDay);

  const timeDiffInMs = dueDate - Date.now();

  const dayInMs = 1000 * 60 * 60 * 24;
  const dayDiff = Math.floor(timeDiffInMs / dayInMs);

  return dayDiff;
};

const calculateValuePerDay = (data) => {
  const weeksPerYear = 52;

  const weeksPerMonth = (weeksPerYear - data.vocationPerYear) / 12;

  const weekTotalHours = data.hoursPerDay * data.daysPerWeek;

  const monthlyTotalHours = weeksPerMonth * weekTotalHours;

  const valuePerHour = data.monthlyBudget / monthlyTotalHours;

  return valuePerHour;
};

const calculateJobBudget = (valuePerHour, totalHours) => {
  return Number(valuePerHour) * Number(totalHours);
};

const getJobStatus = (remainingDays) => {
  return remainingDays <= 0 ? 'done' : 'progress';
};

module.exports = {
  calculateRemainingDays,
  calculateValuePerDay,
  calculateJobBudget,
  getJobStatus,
};
