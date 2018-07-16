'use strict'
let BaseAppLoader = require('').BaseAppLoader,
  ConfigSchema = require('./lib/schema/database/config-schema'),
  repoInfo = require('./repo-info'),
  EComInternalCredFilter = require('').Hapi.EComInternalCredFilter;

class AppLoader extends BaseAppLoader {
  constructor() {
    super(repoInfo);
    this.configSchema = ConfigSchema.ServiceConfigSchema;
  }

  fetchBaseRoutes() {
    this.applicationData.publicRoutePrefix = `/v1/${this.repoInfo.name}`;
    this.applicationData.privateRoutePrefix = `/v1/${this.repoInfo.name}`;
  }

  getSpecificPlugins(instanceConfig, config, dependencies) {
    return [
      {
        plugin: EComInternalCredFilter,
        options: { dependencies: dependencies, config: config }
      }
    ];
  }

  registerSpecificStrategies(server, dependencies, config) {
    server.auth.strategy('ecom-internal-cred', 'ecom-internal-cred', {
      dependencies: dependencies,
      config: config
    });
    server.auth.strategy('ecom-internal-cred-auth', 'ecom-internal-cred', {
      dependencies: dependencies,
      config: config,
      authenticated: true
    });
    server.auth.strategy('ecom-internal-auth-guest', 'ecom-internal-cred', {
      dependencies: dependencies,
      config: config,
      authenticated: false
    });
  }
}

module.exports = AppLoader;
