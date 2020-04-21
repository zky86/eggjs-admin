'use strict';
// const format = require('../public/format');
const Controller = require('./base');
/**
 * @controller user 用户接口
 */
class UserController extends Controller {

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

  /**
   * @summary 获取用户
   * @description 分页获取用户信息
   * @router get /user/query
   * @request query string keyword 模糊搜索name
   * @request query string 字段排序 默认空
   * @request query integer pageIndex 页码 默认 1
   * @request query integer pageSize 单页数量 默认 10
   * @response 200 userResponse 请求成功
   */
  async query() {
    const { ctx, service } = this;
    const pageIndex = Number(ctx.request.body.pageIndex || 1);
    const pageSize = Number(ctx.request.body.pageSize || 10);
    const keyword = ctx.request.body.username || '';
    const date = ctx.request.body.date || [];

    // 查找条件
    let condition = '';
    if (date[0]) {
      condition = {
        username: { $regex: new RegExp(keyword, 'i') },
        $and: [{ timestamp: { $gt: date[0] } }, { timestamp: { $lt: date[1] } }],
      };
    } else {
      condition = {
        username: { $regex: new RegExp(keyword, 'i') },
      };
    }

    // 排序条件
    const sort = {
      updateTime: -1,
    };

    this.success(await service.user.list(pageIndex, pageSize, condition, sort));
  }

  /**
     * @summary 更新/创建
     * @description 更新传 _id 创建不传 _id
     * @router post /user/update
     * @request body user *body
     * @response 200 response 更新成功
     */
  async update() {
    this.success(await this.ctx.service.user.update(this.ctx.request.body));
  }

  /**
   * @summary 删除
   * @description 删除
   * @router delete /user/destroy/{id}
   * @request path string *id
   * @response 200 response 删除成功
  */
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.query._id;
    this.success(await service.user.destroy(id));
  }
}
module.exports = UserController;
