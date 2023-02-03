const endpoint = 'https://api.digitalocean.com/v2';
const axios = require('axios');

class DOProvider {
  constructor(config={token, }) {
    this.config = config;
  }
  
  async listRegions() {
    // Get a list of regions
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
      console.log(error.message);
    }
  }

  async listImages() {
    // Get a list of images
  }

  async listSizes() {
    // Get a list of sizes
  }

  async listDroplets() {
    // Get a list of droplets
  }

  async create() {
    // Create a droplet
  }

  async getSSHInfo() {
    // Get SSH info for a droplet
    // Print IP for SSH
  }

  async destroy() {
    // Destroy a droplet
  }

}

module.exports = DOProvider;
