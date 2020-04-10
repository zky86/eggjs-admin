'use strict';
const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    const rule = {
      userName: { type: 'string', required: true, message: '必填项' },
      password: { type: 'string', required: true, message: '必填项' },
    };
    const loginMsg = ctx.request.body;
    await ctx.validate(rule, loginMsg); // 验证登陆信息是否合法
    const token = ctx.helper.loginToken({ corpid: ctx.request.body.userName, userid: ctx.request.body.password }, 7200); // token生成
    console.log(token);
    await app.redis.get('loginToken').set(ctx.request.body.userName + ctx.request.body.password, token, 'ex', 7200); // 保存到redis
    // ctx.body = { data: { token, expires: this.config.login_token_time }, code: 1, msg: '登录成功' };

    // 为当前输入的密码加密
    // loginMsg.password = ctx.helper.encrypt(loginMsg.password);
    // 从service文件中拿到返回结果
    // const result = await ctx.service.user.login(loginMsg);
    // ctx.body = result;
    // this.ctx.body = 'Hello world 123';
  }
}
module.exports = HomeController;
