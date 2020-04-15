'use strict';
const Service = require('./base');
const collection = 'user';
class UserService extends Service {
  /**
   * 根据ID获取单个项目
   */
  // async getUser() {
  //   const { ctx } = this;
  //   // post json获取
  //   const page = parseInt(this.ctx.request.body.page) || 1;
  //   const pageSize = parseInt(this.ctx.request.body.pageSize) || 5;
  //   // 获取当前数据表的总数量
  //   const totalNum = await ctx.model.User.find({}).count();
  //   // 分页结果
  //   const goodsResult = await ctx.model.User.find({}).skip((page - 1) * pageSize).limit(pageSize);
  //   const res = {
  //     list: goodsResult,
  //     total: totalNum,
  //   };
  //   return res;
  // }
  async list(pageIndex, pageSize, condition) {
    return await this._list(collection, pageIndex, pageSize, condition);
  }

  async destroy(id) {
    return await this._destroy(collection, id);
  }
}
module.exports = UserService;
