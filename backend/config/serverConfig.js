import 'dotenv/config'

const serverConfig = {
    PORT: process.env.SERVER_PORT,
    jwtSecretKey: "yrugfjfjgfg7r783746963493934___&&^",
    jwtRefreshSecretKey: "hfgdgfhgdhf^^#$(*&#$(???",
    dbURI: process.env.MONGODB_URL,
    gmail_app_password: process.env.GMAIL_APP_PASSWORD,
    gmail_user_mail: process.env.GMAIL_USER_MAIL,
    node_env: process.env.NODE_ENV
}

export default serverConfig