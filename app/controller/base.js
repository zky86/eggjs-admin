'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      success: true,
      data,
      code: 1,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
  /**
   *
   * @param {*} errmsg 错误信息提示
   * @param {*} status 200 成功 201失效
   */
  error(errmsg, status = 200) {
    this.ctx.body = {
      status,
      success: false,
      errorMsg: errmsg,
    };
  }
}

module.exports = BaseController;
