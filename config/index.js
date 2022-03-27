const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const config = {
    db: process.env.MONGO_URL,
    port: process.env.PORT || 3001,
    jwtPrivateKey: process.env.JWT_SECRET,
}

module.exports = { config };
