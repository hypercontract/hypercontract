const { defaultTo } = require('lodash');

const newman = require('newman');

runTests(defaultTo(process.argv[2], process.env.NODE_ENV));

function runTests(environment = 'local') {
    return testCollection('json', environment)
        .then(() => testCollection('json-hal', environment))
        .then(() => testCollection('json-ld', environment));
}

function testCollection(collectionName, environment) {
    return new Promise((resolve, reject) => {
        newman.run(
            {
                collection: require(`./hypershop-${collectionName}.json`),
                globals: require(`./globals-${environment}.json`),
                reporters: 'cli',
            },
            error => {
                if (error) {
                    reject(error);
                }

                resolve();
            }
        );
    });
}
