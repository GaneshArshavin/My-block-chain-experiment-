'use strict'

const BlueprintService = require('../lib/service/blueprint-service'),
  expect = require('chai').expect;

const dependencies = {
  logger: console
}

describe('Testing Blue Print Service', function () {

  it('getSampleData should succeed', async function () {
    const config = {};
    const requestContext = {};
    try {
      const blueprintService = new BlueprintService(dependencies, config, requestContext);
      let result = blueprintService.getSampleData();
      dependencies.logger.log(result);
      expect(result).to.have.property('Success');
    } catch (err) {
      dependencies.logger.log(err);
      throw (new Error(err));
    }
  });

});