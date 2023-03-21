const Model = require('./models/details');

const getDetailsByUserId = async (id) => {
  const userId = id ?? 0;
  const details = await Model.findAll({
    raw: true,
    where: { user_id: userId },
  });

  if (details && details.length > 0) {
    return {
      status: 200,
      success: true,
      message: 'details found.',
      data: details,
    };
  }

  return {
    status: 404,
    success: false,
    message: 'details not found',
    data: [],
  };
};

module.exports = { getDetailsByUserId };
