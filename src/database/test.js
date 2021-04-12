const Connection = require('./connection');

(async () => {
  const Database = await Connection();

  const profilesQuery = 'SELECT id, name from profile';
  const jobsQuery = 'SELECT * from jobs WHERE userId = ?';

  const profiles = await Database.all(profilesQuery);

  const jobs = await Database.all(jobsQuery, [1]);

  // await Database.run('DELETE FROM jobs WHERE id = ?', [3]);

  await Database.close();

  console.table(profiles);
  console.table(jobs);
})();
