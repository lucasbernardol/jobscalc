const DbConnection = require('../database/connection');

const ProfileModel = {
  async get(profileId) {
    if (!profileId) {
      throw new Error('Invalid unique identifier');
    }

    const Database = await DbConnection();

    const query = `SELECT * FROM profile WHERE id = ?`;

    const profileData = await Database.get(query, [profileId]);

    return profileData;
  },

  async update(profileId, data = {}) {
    if (!data || !Object.values(data).length) {
      throw new Error('Invalid values to update');
    }
    if (!profileId) {
      throw new Error('Invalid unique identifier');
    }

    const Database = await DbConnection();

    const values = Object.values(data);

    const query = `
      UPDATE profile SET 
        name = ?, 
        avatar = ?, 
        monthlyBudget = ?,
        hoursPerDay = ?,
        daysPerWeek = ?,
        vocationPerYear = ?,
        valuePerHour = ? 
      WHERE id = ?
    `;

    await Database.run(query, [...values, profileId]);
  },
};

module.exports = ProfileModel;
