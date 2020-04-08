module.exports = {
  formatResponse: function (data, code, message) {
    return {
      code,
      data,
      message
    }
  }
};
