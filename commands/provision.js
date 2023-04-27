const DOProvider = require('../providers/do');

exports.command = ['provision'];
exports.desc = 'list the regions available to you';

exports.builder = yargs => {
    yargs.example('$0 provision --provider do --name myvm --region nyc1 --size s-1vcpu-1gb --image ubuntu-18-04-x64');
    yargs.example('$0 provision --provider aws --name myvm --region us-east-1 --size t2.micro --image ami-0c55b159cbfafe1f0');

    yargs.options({
        provider: {
            describe: 'Set the cloud-instance provider to use',
            demand: false,
            type: 'string',
            default: 'do'
        },
        name: {
            describe: 'The name of the VM to create',
            demand: false,
            type: 'string',
            default: 'default'
        },
        region: {
            describe: 'The region to create the VM in',
            demand: false,
            type: 'string',
            default: 'nyc1'
        },
        size: {
            describe: 'The size of the VM to create',
            demand: false,
            type: 'string',
            default: 's-1vcpu-1gb'
        },
        image: {
            describe: 'The image to use for the VM',
            demand: false,
            type: 'string',
            default: 'ubuntu-18-04-x64'
        }
    });
};

exports.handler = async argv => {
    let { provider, name, region, size, image } = argv;

    try {
        if (provider !== 'do') {
            throw new Error(`The provider ${provider} is not supported yet.`);
        }

        // TODO 5: create a new VM using the DigitalOcean provider, and give it a name, region, size, and image
        const doProvider = new DOProvider({ token: process.env.DO_TOKEN });
        console.log('Provisioning...');
        const dropletId = await doProvider.create({
            'name': name,
            'region': region,
            'size': size,
            'image': image
        });

        const dropletInfo = await doProvider.getSSHInfo(dropletId);
        console.log('dropletInfo', dropletInfo);

        // TODO 6: next wait for the VM to be ready and then get and print its IP address
    
        
        console.log('Done!');
    } catch (error) {
        console.log(error.message);
    }
};
