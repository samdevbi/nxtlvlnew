/** PM2 — serverda: pm2 start ecosystem.config.cjs */
const path = require("path");

module.exports = {
  apps: [
    {
      name: "nxtlvl",
      cwd: path.join(__dirname),
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
