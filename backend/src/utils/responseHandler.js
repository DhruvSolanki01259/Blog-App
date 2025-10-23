export const errorHandler = (res, statusCode, errorMessage) => {
  res.status(statusCode).json({
    success: false,
    error: true,
    statusCode,
    message: errorMessage,
  });
  return;
};

export const successHandler = (
  res,
  statusCode,
  successMessage,
  user,
  token
) => {
  const { password, ...safeUser } = user._doc;
  res.status(statusCode).json({
    success: true,
    error: false,
    statusCode,
    message: successMessage,
    user: safeUser,
    token,
  });
  return;
};

export const serverError = (res, statusCode, errorMessage) => {
  const message = errorMessage || "Internal Server Error";
  const status = statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: true,
    status,
    message,
  });
  return;
};
