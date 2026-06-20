const executionRepository = require(
  "./execution.repository"
);

const getExecutions = async (
  userId
) => {

  return executionRepository.getExecutions(
    userId
  );

};

const getExecutionById = async (
  executionId,
  userId
) => {

  return executionRepository.getExecutionById(

    executionId,

    userId

  );

};

module.exports = {

  getExecutions,

  getExecutionById,

};