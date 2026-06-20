const executionService = require(
  "./execution.service"
);

const getExecutions = async (
  req,
  res
) => {

  const executions =

    await executionService.getExecutions(

      req.user.userId

    );

  return res.json({

    success:true,

    data: executions,

  });

};

const getExecutionById = async (
  req,
  res
) => {

  const execution =

    await executionService.getExecutionById(

      req.params.id,

      req.user.userId

    );

  if (!execution) {

    return res.status(404).json({

      success:false,

      message:"Execution not found",

    });

  }

  return res.json({

    success:true,

    data: execution,

  });

};

module.exports = {

  getExecutions,

  getExecutionById,

};