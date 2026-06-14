const executeLogAction = async (
  action,
  payload
) => {
  console.log(
    "========== LOG ACTION =========="
  );

  console.log(payload);

  console.log(
    "================================"
  );
};

module.exports = executeLogAction;
