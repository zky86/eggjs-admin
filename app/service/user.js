'use strict';
const Service = require('egg').Service;
class currentService extends Service {
  /**
   * 根据ID获取单个项目
   */
  async getUser() {
    const { ctx } = this;
    // post json获取
    const page = this.ctx.request.body.page || 1;
    const pageSize = this.ctx.request.body.pageSize || 5;
    // 获取当前数据表的总数量
    const totalNum = await ctx.model.User.find({}).count();
    // 分页结果
    const goodsResult = await ctx.model.User.find({}).skip((page - 1) * pageSize).limit(pageSize);
    const res = {
      list: goodsResult,
      total: totalNum,
    };
    return res;
  }
}
module.exports = currentService;