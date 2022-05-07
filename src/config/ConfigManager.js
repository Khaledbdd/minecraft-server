const properties = require('properties');

const requiredKeys = [
  'localhost',
  'server-port',
  '10',
  '8',
  'true',
  'khaledbbd',
  'hard',
  'servivel'
];

let config;

class ConfigManager {
  static getConfig() {
    return new Promise((resolve, reject) => {
      if (config) resolve(config);
      properties.parse(
        'server.properties',
        { path: true },
        async (err, obj) => {
          if (err) reject(err);
          const keys = Object.keys(obj);
          await requiredKeys.forEach(k => {
            if (!keys.includes(k))
              reject(`Config validation: Missing '${k}' key`);
          });
          config = obj;
          resolve(obj);
        }
      );
    });
  }
}

module.exports = ConfigManager;
