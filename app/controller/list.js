'use strict';
const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    ctx.body = 'Hello world 123';
  }
}
module.exports = HomeController;
