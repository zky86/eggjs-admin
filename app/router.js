'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.login.index);
  const jwt = app.middleware.jwt();
  router.post('/list', jwt, controller.list.index);
  router.post('/user', jwt, controller.user.index);
  router.get('/news', controller.news.list);
  router.get('/article', controller.article.index);
};
