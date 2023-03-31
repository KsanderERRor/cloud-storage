module.exports = {
    PORT: process.env.PORT || 5200,
    MONGO_URL: process.env.MONGO_URL || 'mongodb+srv://serokurovmaksim91:serokurovmaksim91serokurovmaksim91@cloud.znu5rpf.mongodb.net/?retryWrites=true&w=majority',
    ACCESS_TOKEN_SECRET:  process.env.ACCESS_TOKEN_SECRET || 'access_secret',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh_secret'
};
