import { environment as productionEnvironment } from './environment.prod';

export const environment = process.env.NODE_ENV === 'production' ? productionEnvironment : {
    production: false,
    port: 80,
    baseUri: 'http://localhost/'
};
