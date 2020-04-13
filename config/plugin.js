'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose'
  },
  // 支持跨域
  cors: {
    enable: true,
    package: 'egg-cors'
  },

  // 服务器表单验证
  validate: {
    enable: true,
    package: 'egg-validate',
  },

  redis: {
    enable: true,
    package: 'egg-redis',
  }
};