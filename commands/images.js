// TODO 4: implement the images command, which should list the images available to you.
//         If you're not sure how to get started, take a look at regions command in commands/regions.js.

const DOProvider = require('../providers/do');

exports.command = ['images'];
exports.desc = 'list the images available to you';

exports.builder = yargs => {
    yargs.options({
        provider: {
            describe: 'Set the cloud-instance provider to use',
            demand: false,
            type: 'string',
            default: 'do'
        }
    });
};

exports.handler = async argv => {
    let { provider } = argv;

    try {
        if (provider !== 'do') {
            throw new Error(`The provider ${provider} is not supported yet.`);
        }
        const doProvider = new DOProvider({ token: process.env.DO_TOKEN });
        console.log('Listing regions...');
        console.table(await doProvider.listImages());
    } catch (error) {
        console.log(error.message);
    }
};
