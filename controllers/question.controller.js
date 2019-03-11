const { to, ReE, ReS } = require('../services/util.service');

module.exports.create = async (req, res) => {
  const { body } = res;

  if (!body.question) {
    return ReE(res, 'Please provide question');
  }

  const [err, question] = await to();
};
