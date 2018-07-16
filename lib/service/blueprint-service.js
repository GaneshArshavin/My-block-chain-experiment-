'use strict'

const BaseHelper = require('').BaseHelper;

class BlueprintService extends BaseHelper {
  constructor(dependencies, config, requestContext) {
    super(dependencies, config, requestContext);
  }

  getSampleData() {
    try {
      this.logv2('Blueprintservice', 'getSampleData', "getting sample data from blueprint service");
      return { 'Success': 'Blueprint Service' }
    }
    catch (err) {
      this.errorv2("BlueprintService", "getSampleData", err);
      throw err;
    }
  }
}

module.exports = BlueprintService;
