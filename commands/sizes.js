// TODO 5: implement the size command, which should list the sizes available to you.
//         If you're not sure how to get started, take a look at regions command in commands/regions.js.


const DOProvider = require('../providers/do');

exports.command = ['sizes'];
exports.desc = 'list the sizes available to you';

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
        console.table(await doProvider.listSizes());
    } catch (error) {
        console.log(error.message);
    }
};
