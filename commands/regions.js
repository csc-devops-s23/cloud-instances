const DOProvider = require('../providers/do');

exports.command = ['regions'];
exports.desc = 'list the regions available to you';

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
        console.table(await doProvider.listRegions());
    } catch (error) {
        console.log(error.message);
    }
};
