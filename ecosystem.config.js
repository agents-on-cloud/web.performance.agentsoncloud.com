module.exports = {
    apps: [
      {
        name: 'performance.agentsoncloud.com', // change to your subdomain name
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start',
      },
    ],
  }