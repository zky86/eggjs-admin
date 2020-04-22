'use strict';

const Controller = require('./base');
/**
 * @controller article 文章接口
 */
class ArticleController extends Controller {
  // async index() {
  //   const { ctx } = this;
  //   // const params = ctx.query;
  //   // console.log(params);
  //   // if (!params.page) {
  //   //   ctx.body = format.formatResponse(null, 0, '没有翻页');
  //   //   return false;
  //   // }
  //   try {
  //     const res = await ctx.service.article.getProjectById();
  //     ctx.body = format.formatResponse(res, 1, '获取成功');
  //   } catch (err) {
  //     ctx.body = JSON.stringify(err);
  //   }
  // }

  /**
   * @summary 获取文章列表
   * @description 分页获取文章信息
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
    const user_id = ctx.request.body.user_id || '';

    // 查找条件
    const condition = {
      user_id,
    };

    // 排序条件
    const sort = {
      updateTime: -1,
    };
    this.success(await service.article.list(pageIndex, pageSize, condition, sort));
  }

  /**
   * @summary 更新/创建
   * @description 更新传 _id 创建不传 _id
   * @router post /user/update
   * @request body user *body
   * @response 200 response 更新成功
   */
  async update() {
    this.success(await this.ctx.service.article.update(this.ctx.request.body));
  }
}
module.exports = ArticleController;
