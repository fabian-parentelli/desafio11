import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './config/dotEnv.config.js';
import { faker } from '@faker-js/faker';

faker.locale = "es";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const generateToken = (user) => {
    const token = jwt.sign({ user }, config.privateKey, { expiresIn: '24h' });
    return token;
};

const generateProducts = () => {
    
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.random.alphaNumeric(10),
        price: faker.commerce.price(),
        stock: faker.random.numeric(1),
        category:  faker.commerce.department(),
        thumbnails: faker.image.image(),
        status: faker.datatype.boolean()
    };
};

export {
    __dirname,
    createHash,
    isValidPassword,
    generateToken,
    generateProducts
}; 