export default  {
  PORT: process.env.PORT || 5200,
  MONGO_URL: process.env.MONGO_URL || 'mongodb+srv://serokurovmaksim91:serokurovmaksim91serokurovmaksim91@cloud.znu5rpf.mongodb.net/?retryWrites=true&w=majority',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'access_secret',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh_secret',
  PATH_TO_STORAGE_FILES: process.env.PATH_TO_STORAGE_FILES || '/Users/ha-user/Documents/hebron/sub-project'
};
