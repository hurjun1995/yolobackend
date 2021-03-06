require('dotenv').config(); // instatiate environment variables

const CONFIG = {}; // Make this global to use all over the application

CONFIG.app = process.env.APP || 'dev';
CONFIG.port = process.env.PORT || '3000';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '8080';
CONFIG.db_name = process.env.DB_NAME || 'test';
CONFIG.db_user = process.env.DB_USER || 'test';
CONFIG.db_password = process.env.DB_PASSWORD || 'test';

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'test';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000';

module.exports = CONFIG;
