const config = {
  dev: 'mongodb://localhost/restAPI',
  test: 'mongodb+srv://testUser:testUser@restapi-pfoao.mongodb.net/test?retryWrites=true',
  port: process.env.PORT || 3000,
  // 1 hour in minutes
  expireTime: "1h",
  secrets: {
    jwt: process.env.JWT || 'tokenSecret'
  }
};

module.exports = config;
