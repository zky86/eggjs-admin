'use strict';
const Service = require('egg').Service;
class ArticleService extends Service {
  /**
   * 根据ID获取单个项目
   */
  async getProjectById() {
    const { ctx } = this;
    // get 方式获取
    const page = parseInt(ctx.query.page) || 1;
    const pageSize = parseInt(ctx.query.pageSize) || 5;
    // 获取当前数据表的总数量
    const totalNum = await ctx.model.Article.find({}).count();
    // 分页结果
    const goodsResult = await ctx.model.Article.find({}).skip((page - 1) * pageSize).limit(pageSize);
    // const results = await ctx.model.Article.find({ // Article为modal/article.js里面命名的名字
    //   _id: app.mongoose.Types.ObjectId('5da034149b6e823ca2ea809d'),
    // });
    // const results = await ctx.model.Article.find({});
    const res = {
      list: goodsResult,
      total: totalNum,
    };
    return res;
  }
}
module.exports = ArticleService;
