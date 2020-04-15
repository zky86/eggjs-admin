'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.login.index);
  const jwt = app.middleware.jwt();

  // 用户接口
  router.get('/user/query', jwt, controller.user.query);

  router.post('/list', jwt, controller.list.index);
  router.get('/news', controller.news.list);
  router.get('/article', controller.article.index);
};
