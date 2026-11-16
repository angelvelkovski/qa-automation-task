// Creates .env from .env.example on first run so `npm test` works out of the box.
const fs = require('fs');
if (!fs.existsSync('.env')) {
  fs.copyFileSync('.env.example', '.env');
  console.log('Created .env from .env.example');
}
