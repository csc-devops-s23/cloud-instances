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

      return response.data.regions; 
    }
    catch (error) {
      console.log('Failed to get regions', error.message);
    }
  }

  async listImages() {
    // TODO 4: Get a list of images
  }

  async listSizes() {
    // TODO 5: Get a list of sizes
  }

  async create() {
    // TODO 6: Create a droplet

    // TODO 8: Update your implementation to set the ssh key for the droplet when it's created. Add all the ssh keys in your account to the droplet.

  }

  async getSSHInfo() {
    // Get SSH info for a droplet
    // Print IP for SSH
    // TODO 7: Wait for droplet to be ready, then get its IP and print it
  }

  async delete() {
    // Destroy a droplet
    // TODO: 9: delete the droplet
  }

}

module.exports = DOProvider;
