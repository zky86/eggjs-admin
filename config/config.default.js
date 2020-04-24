/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1585736537957_2832';

  // 支持跨域
  　
  config.security = {　　　　
    csrf: {　　　　　　
      enable: false, // 前后端分离，post请求不方便携带_csrf
      ignoreJSON: true
    },
    domainWhiteList: ['*'] //配置白名单
  };
  config.cors = {
    // origin: '*', //允许所有跨域访问，注释掉则允许上面 白名单 访问
    credentials: true, // 允许跨域请求携带cookies
    // allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    allowMethods: 'GET,POST'
  };

  // add your middleware config here
  config.middleware = [];

  exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0,
    },
  }

  // 服务器表单验证
  exports.validate = {
    // convert: false,
    // validateRoot: false,
  };

  // 数据库配置
  exports.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/message_admin', // 你的数据库地址，egg_article是你数据库得名字
      options: {
        useNewUrlParser: true,
      },
    },
  };

  // 配置上传文件白名单
  config.multipart = {
    fileSize: '10mb',
    fileExtensions: ['.xlsx','.xls'], // 支持上传文件的扩展名
  };

  // add your user config here
  const userConfig = {
    mongodbUrl: 'mongodb://127.0.0.1:27017',
    mongodbName: 'message_admin'
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};