const endpoint = 'https://api.digitalocean.com/v2';
const axios = require('axios');
require('dotenv').config()

class DOProvider {
  constructor(config={token, }) {
    this.config = config;
  }
  
  async listRegions() {
    // TODO 3: Get a list of regions
    try {
      const response = await axios.get(`${endpoint}/regions`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.token}`,
        }
      });

      // let myRegions = [];
      // for (let region of response.data.regions) {
      //   myRegions.push({
      //     slug: region.slug,
      //     name: region.name,
      //   });
      // }

      return response.data.regions.map(region => {
        return {
          slug: region.slug,
          name: region.name,
        }
      }); 
    }
    catch (error) {
      console.log('Failed to get regions', error.message);
    }
  }

  async listImages() {
    // TODO 4: Get a list of images
    try {
      const response = await axios.get(`${endpoint}/images`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.token}`,
        }
      });

      console.log(response)

      return response.data.images.map(image => {
        return {
          slug: image.slug,
          name: image.name,
          region: image.regions.join(', '),
        }
      });
    }
    catch (error) {
      console.log('Failed to get images', error.message);
    }
  }

  async listSizes() {
    // TODO 5: Get a list of sizes
    try {
      const response = await axios.get(`${endpoint}/sizes`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.token}`,
        }
      });

      return response.data.sizes.map(size => {
        return {
          slug: size.slug,
          memory: size.memory,
          vcpus: size.vcpus,
          disk: size.disk,
          region: size.regions.join(', '),
        }
      });
    }
    catch (error) {
      console.log('Failed to get images', error.message);
    }
  }

  async create(props) {
    const sshKeys = await this.getSSHKeys();

    // TODO 6: Create a droplet
    // TODO 5: Get a list of sizes
    try {
      const response = await axios.post(`${endpoint}/droplets`, {
        name: props.name,
        region: props.region,
        size: props.size,
        image: props.image,
        ssh_keys: sshKeys
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.token}`,
        }
      });

      return response.data.droplet.id;
      // .sizes.map(size => {
      //   return {
      //     slug: size.slug,
      //     memory: size.memory,
      //     vcpus: size.vcpus,
      //     disk: size.disk,
      //     region: size.regions.join(', '),
      //   }
      // });
    }
    catch (error) {
      console.log('Failed to get images', error.message);
    }

    // TODO 8: Update your implementation to set the ssh key for the droplet when it's created. Add all the ssh keys in your account to the droplet.

  }

  async getSSHInfo(id) {
    // Get SSH info for a droplet
    // Print IP for SSH
    // TODO 7: Wait for droplet to be ready, then get its IP and print it

    let response;
    do {
      try {
        
        console.log('Waiting for droplet to be ready...')
        response = (await axios.get(`${endpoint}/droplets/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.token}`
          }
        })).data;

        await (new Promise((resolve) => setTimeout(resolve, 1000)));
  
      } catch (error) {
        console.log('Failed to get droplet', error.message);
      }
    } while (response.droplet.networks.v4.length === 0);

    return response.droplet.networks.v4[0].ip_address;
  }

  async getSSHKeys() {
    try {
      const response = await axios.get(`${endpoint}/account/keys`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.token}`
        }
      })

      const keysArray = response.data.ssh_keys.map(key => {
        return key.id
      })

      console.log('my ssh keys', keysArray);

      return keysArray;

    } catch (error) {
      console.log('Failed to get SSH keys', error.message);
    }


  }

  async delete() {
    // Destroy a droplet
    // TODO: 9: delete the droplet
  }

}

module.exports = DOProvider;
