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

  /**
   *
   * http请求
   *
   */
  request(param) {
    // const ctx = this.ctx;
    const {
      ctx,
    } = this;
    const url = param.url || '';
    const type = param.type || 'POST';
    const data = param.data || {};
    return new Promise(async (resolve, reject) => {
      try {
        const result = await ctx.curl(url, {
          // 必须指定 method，支持 POST，PUT 和 DELETE
          method: type,
          // 不需要设置 contentType，HttpClient 会默认以 application/x-www-form-urlencoded 格式发送请求
          data,
          // 明确告诉 HttpClient 以 JSON 格式处理响应 body
          dataType: 'json',
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
    // ctx.body = result.data.form;
    // 响应最终会是类似以下的结果：
    // {
    //   "foo": "bar",
    //   "now": "1483864184348"
    // }
  }
}

module.exports = BaseController;
