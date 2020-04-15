'use strict';
// const format = require('../public/format');
const Controller = require('./base');
/**
 * @controller user 用户接口
 */
class UserController extends Controller {
  /**
   * @summary 获取用户
   * @description 分页获取用户信息
   * @router get /user/query
   * @request query string keyword 模糊搜索name
   * @request query integer pageIndex 页码 默认 1
   * @request query integer pageSize 单页数量 默认 10
   * @response 200 userResponse 请求成功
   */
  // async query() {
  //   const {
  //     ctx,
  //   } = this;
  //   // const params = ctx.query;
  //   // console.log(params);
  //   // if (!params.page) {
  //   //   ctx.body = format.formatResponse(null, 0, '没有翻页');
  //   //   return false;
  //   // }
  //   try {
  //     const res = await ctx.service.user.getUser();
  //     ctx.body = format.formatResponse(res, 1, '获取成功');
  //   } catch (err) {
  //     ctx.body = JSON.stringify(err);
  //   }
  // }
  async query() {
    const { ctx, service } = this;
    const pageIndex = Number(ctx.query.pageIndex || 1);
    const pageSize = Number(ctx.query.pageSize || 10);
    const keyword = ctx.query.keyword || '';
    this.success(await service.user.list(pageIndex, pageSize, { username: { $regex: new RegExp(keyword, 'i') } }));
  }
}
module.exports = UserController;
