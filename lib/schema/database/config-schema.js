const joi = require('joi');

const RabbitmqConfigSchema = joi.object({
  host: joi.string().required(),
  login: joi.string().required(),
  password: joi.string().required(),
  port: joi.number().required(),
  protocol: joi.string().required()
});

const RethinkdbConfigSchema = joi.object({
  db: joi.string().required(),
  host: joi.string().required(),
  max: joi.number(),
  min: joi.number(),
  port: joi.number().required(),
  protocol: joi.string(),
  tables: joi.object().optional()
});

const RedisConfigSchema = joi.object({
  host: joi.string().required(),
  port: joi.number().required(),
  totalRetryTimeInSeconds: joi.number().required(),
  maxReconnectWaitTime: joi.number().optional()
});

const RethinkdbLoadBalancerConfigSchema = joi.object({
  db: joi.string().required(),
  max: joi.number(),
  min: joi.number(),
  protocol: joi.string(),
  tables: joi.object().optional(),
  servers: joi.array().items(
    joi.object({
      host: joi.string().required(),
      port: joi.number().required()
    }))
});


const ServiceConfigSchema = joi.object({
  keysAuthSecret: joi.string().optional(),
  rethinkdb: joi.alternatives(RethinkdbConfigSchema, RethinkdbLoadBalancerConfigSchema),
  redis: RedisConfigSchema.optional(),
  elasticsearch: joi.object({
    host: joi.string().required(),
    port: joi.number().required()
  }).optional(),
  rabbitmq: RabbitmqConfigSchema.optional()
}).unknown(true);

module.exports = {
  ServiceConfigSchema
}