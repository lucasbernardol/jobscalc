const Profile = require('../models/Profile');
const { calculateValuePerDay } = require('../utils/JobUtilities');

const ProfileControler = {
  async index(req, res) {
    try {
      const data = await Profile.get(1);

      return res.render('profile', { profile: data });
    } catch (err) {
      console.log(err);
    }
  },

  async update(req, res) {
    try {
      const data = req.body;
      const valuePerHour = calculateValuePerDay(data);

      await Profile.update(1, {
        ...data,
        valuePerHour,
      });

      return res.redirect('/profile');
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = ProfileControler;
