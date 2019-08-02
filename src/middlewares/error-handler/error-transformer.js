const boom = require('boom');

const errorTransformer = (error) => {
  if (boom.isBoom(error)) {
    const { statusCode, payload } = error.output;
    return {
      statusCode,
      payload,
    };
  }

  return {
    statusCode: 500,
    payload: {
      statusCode: 500,
      message: 'Internal Server Error',
      error: error.message,
    },
  };
};

module.exports = errorTransformer;
