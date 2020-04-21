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
  router.post('/user/query', jwt, controller.user.query);
  router.get('/user/destroy', jwt, controller.user.destroy);
  router.post('/user/update', controller.user.update);

  // 文章接口
  router.post('/article/query', jwt, controller.article.query);
  router.post('/article/update', controller.article.update);

  // router.post('/list', jwt, controller.list.index);
  // router.get('/news', controller.news.list);
  // router.get('/article', controller.article.index);
};
