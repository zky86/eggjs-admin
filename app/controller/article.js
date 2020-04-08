'use strict';
const format = require('../public/format');
const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async index() {
    const { ctx } = this;
    // const params = ctx.query;
    // console.log(params);
    // if (!params.page) {
    //   ctx.body = format.formatResponse(null, 0, '没有翻页');
    //   return false;
    // }
    try {
      const res = await ctx.service.article.getProjectById();
      ctx.body = format.formatResponse(res, 1, '获取成功');
    } catch (err) {
      ctx.body = JSON.stringify(err);
    }
  }
}
module.exports = ArticleController;
