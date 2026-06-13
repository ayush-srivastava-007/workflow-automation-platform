const authService = require("./auth.service");
const { signupSchema, loginSchema } = require("./auth.validation");

const signup = async (req, res) => {
  try {
    const validatedData = signupSchema.parse(req.body);

    const result = await authService.signup(validatedData);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token: result.token,
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
        },
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await authService.login(validatedData);

    return res.status(200).json({
      success: true,
      data: {
        token: result.token,
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
        },
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const me = async (req, res) => {
  const user = await authService.getCurrentUser(
    req.user.userId
  );

  return res.json({
    success: true,
    data: user,
  });
};

module.exports = {
  signup,
  login,
  me,
};