const Counter = require('../models/counter');
const Category = require('../models/membersModel');

const generateUserId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { _id: 'userId' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return `A${String(counter.seq).padStart(4, '0')}`;
};

module.exports = generateUserId;
