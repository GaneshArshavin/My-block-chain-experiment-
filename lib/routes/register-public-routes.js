'use strict';

const repoInfo = require('../../repo-info'),
  BlueprintRouteHandler = require('./blueprint-route-handler');


class RegisterPublicRoutes {
  constructor(dependencies, config) {
    this.config = config;
    this.dependencies = dependencies;
    this.blueprintRouteHandler = new BlueprintRouteHandler(dependencies, this.config);
    this.config.appId = repoInfo.name;
  }

  async init(server){
    server.log('Init done for Public Routes')
  }

  registerRoutes(server) {
    console.log('Registering public routes for Blueprint service');

    server.route({
      method: 'GET',
      path: '/v1/blueprint',
      config: {
        handler: (request, h) => this.blueprintRouteHandler.getBluePrintResponse(request, h),
        description: 'Sample Route',
        tags: ['api', 'blueprint', 'public'],
        state: {
          parse: false,
          failAction: 'log'
        }
      }
    });

    server.route({
      method: 'POST',
      path: '/transactions/new',
      config: {
        handler: (request, h) => this.blueprintRouteHandler.createNewChain(request, h),
        description: 'Sample Route',
        tags: ['api', 'blueprint', 'public'],
        state: {
          parse: false,
          failAction: 'log'
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/mine',
      config: {
        handler: (request, h) => this.blueprintRouteHandler.mineCoin(request, h),
        description: 'Sample Route',
        tags: ['api', 'blueprint', 'public'],
        state: {
          parse: false,
          failAction: 'log'
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/getChain',
      config: {
        handler: (request, h) => this.blueprintRouteHandler.getChain(request, h),
        description: 'Sample Route',
        tags: ['api', 'blueprint', 'public'],
        state: {
          parse: false,
          failAction: 'log'
        }
      }
    });
  }
}

module.exports = RegisterPublicRoutes;
