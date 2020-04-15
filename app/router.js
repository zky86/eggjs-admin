'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt();

  router.get('/', controller.home.index);
  router.post('/login', controller.login.index);

  // common router
  router.post('/common/upload', jwt, controller.common.upload);

  // 用户接口
  router.get('/user/query', jwt, controller.user.query);
  router.get('/user/destroy', jwt, controller.user.destroy);

  router.post('/list', jwt, controller.list.index);
  router.get('/news', controller.news.list);
  router.get('/article', controller.article.index);
};
