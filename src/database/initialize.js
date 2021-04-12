const Connection = require('./connection');
const { profile, jobs } = require('./static');

(async () => {
  const Database = await Connection();

  await Database.exec(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT,
      avatar TEXT,
      monthlyBudget INTEGER,
      daysPerWeek INTEGER,
      hoursPerDay INTEGER,
      vocationPerYear INTEGER,
      valuePerHour INTEGER
    );
  `);

  await Database.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT,
      dailyHours INTEGER,
      totalHours INTEGER,
      createdAt DATETIME,
      userId INTEGER,
      FOREIGN KEY(userId) REFERENCES porfile(id)
    );
  `);

  await Database.run(
    `
    INSERT INTO profile (
      name,
      avatar,
      monthlyBudget,
      daysPerWeek,
      hoursPerDay,
      vocationPerYear
    ) VALUES (?, ?, ?, ?, ?, ?);`,
    profile
  );

  await Database.run(
    `
    INSERT INTO jobs (
      name,
      dailyHours,
      totalHours,
      createdAt,
      userId
    ) VALUES (?, ?, ?, ?, ?);
  `,
    jobs[0]
  );

  await Database.run(
    `
    INSERT INTO jobs (
      name,
      dailyHours,
      totalHours,
      createdAt,
      userId
    ) VALUES (?, ?, ?, ?, ?);
  `,
    jobs[1]
  );
})();
