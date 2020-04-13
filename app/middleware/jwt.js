'use strict';
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken'); // 引入jsonwebtoken
module.exports = (options, app) => {
  return async function userInterceptor(ctx, next) {
    const authToken = ctx.header.authorization; // 获取header里的Authorization
    if (authToken) {
      // authToken = authToken.substring(7);
      const res = verifyToken(authToken); // 解密获取的Token
      console.log(res);
      if (res.userName) {
        // 如果需要限制单端登陆或者使用过程中废止某个token，或者更改token的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效
        // 此处使用redis进行保存
        console.log(res.userName);
        const redis_token = await ctx.app.redis.get(res.userName); // 获取保存的token
        // console.log(redis_token);
        if (authToken === redis_token) {
          // ctx.locals.userName = res.userName;
          await next();
        } else {
          ctx.body = { code: 480, message: '您的账号已在其他地方登录' };
        }
      } else {
        ctx.body = { code: 481, message: '登录状态已过期' };
      }
    } else {
      ctx.body = { code: 482, message: '请登陆后再进行操作' };
    }
  };
};

// 解密，验证
function verifyToken(token) {
  const cert = fs.readFileSync(path.join(__dirname, '../public/rsa_public_key.pem')); // 公钥，看后面生成方法
  let res = '';
  try {
    const result = jwt.verify(token, cert, { algorithms: [ 'RS256' ] }) || {};
    const { exp } = result,
      current = Math.floor(Date.now() / 1000);
    if (current <= exp) res = result.data || {};
  } catch (e) {
    console.log(e);
  }
  return res;
}
