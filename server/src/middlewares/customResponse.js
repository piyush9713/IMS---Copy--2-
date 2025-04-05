const customResponse = (req, res, next) => {
  res.success = (message, data = null, statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
      statusCode,
    });
  };

  res.error = (message, statusCode = 400, error) => {
    console.log("res.error called");
    res.status(statusCode).json({
      success: false,
      message,
      error,
      statusCode,
    });
  };

  next();
};

export default customResponse;
