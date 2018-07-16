'use strict'

const BaseHelper = require('').BaseHelper,
  repoInfo = require('../../repo-info'),
  dotaCoinManager = require('../manager/dota-coin-manager'),
  BlueprintService = require('../service/blueprint-service');

class BlueprintRouteHandler extends BaseHelper {
  constructor(dependencies, config) {
    super(dependencies, config);
    this.config = config;
    this.config.appId = repoInfo.name;
    this.service = new dotaCoinManager();
  }

  async getBluePrintResponse(request, h) {
    try {
      let service = new BlueprintService(this.dependencies, this.config, request);
      let result = service.getSampleData();
      return this.replySuccess(h, result);
    } catch (error) {
      return this.replyError(h, error);
    }
  }

  async createNewChain(request, h){
    try {
      
      let result = this.service.newTransaction(request);
      return this.replySuccess(h, result);
    } catch (error) {
      return this.replyError(h, error);
    }
  }

  async mineCoin(request, h){
    try {
      
      let result = this.service.mine();
      return this.replySuccess(h, result);
    } catch (error) {
      return this.replyError(h, error);
    }
  }

  async getChain(request, h){
    try {
    
      let result = this.service.getChain(request);
      return this.replySuccess(h, result);
    } catch (error) {
      return this.replyError(h, error);
    }
  }
}

module.exports = BlueprintRouteHandler;
