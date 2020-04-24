'use strict';

const Service = require('egg').Service;
const ObjectId = require('mongodb').ObjectId;
// 故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞
const sendToWormhole = require('stream-wormhole');
const fs = require('fs');
const path = require('path');
class BaseService extends Service {
  async getConllection(collection) {
    return new Promise((resolve, reject) => {
      this.app.getMongodb().then(({
        db,
        client,
      }) => {
        // get the documents collection
        resolve({
          collection: db.collection(collection),
          client,
        });
      });
    });
  }
  // 按条件获取结果总数
  async getConllectionCount(collection, condition) {
    return new Promise((resolve, reject) => {
      collection.find(condition).toArray(function(err, result) {
        if (err) throw reject(err);
        resolve(result.length);
      });
    });
  }
  async _list(col, pageIndex = 1, pageSize = 10, condition = {}, sort = {}) {
    const {
      collection,
      client,
    } = await this.getConllection(col);
    const total = await this.getConllectionCount(collection, condition);
    return new Promise((resolve, reject) => {
      collection
        .find(condition)
        .sort(sort)
        .skip((pageIndex - 1) * pageSize)
        .limit(pageSize)
        .toArray(function(err, result) {
          if (err) throw reject(err);
          client.close();
          resolve({
            list: result,
            pageIndex,
            pageSize,
            total,
            hasNextPage: pageIndex * pageSize < total,
          });
        });
    });
  }
  async _update(col, params) {
    const {
      collection,
      client,
    } = await this.getConllection(col);
    return new Promise((resolve, reject) => {
      params.updateTime = new Date();
      if (params._id) {
        const _id = ObjectId(params._id);
        delete params._id;
        // Update document
        collection.updateOne({
          _id,
        }, {
          $set: params,
        }, function(err, result) {
          if (err) throw reject(err);
          client.close();
          resolve(true);
        });
      } else {
        delete params._id;
        // Insert some documents
        collection.insertMany([ params ], function(err, result) {
          if (err) throw reject(err);
          client.close();
          resolve(true);
        });
      }
    });
  }
  async _destroy(col, id) {
    // 禁止删除线上数据，开发者下载源码后 可自行修改, 此处模拟删除成功
    // return new Promise((resolve, reject) => {
    //   resolve(true);
    // });
    const {
      collection,
      client,
    } = await this.getConllection(col);
    return new Promise((resolve, reject) => {
      // Delete document
      collection.deleteOne({
        _id: ObjectId(id),
      }, function(err, result) {
        if (err) throw reject(err);
        client.close();
        resolve(true);
      });
    });
  }
  async _visit(col, id) {
    const {
      collection,
      client,
    } = await this.getConllection(col);
    return new Promise((resolve, reject) => {
      const _id = ObjectId(id);
      // Update document
      collection.find({
        _id,
      }).toArray(function(err, result) {
        let count = result[0].count || 0;
        count += 1;
        collection.updateOne({
          _id,
        }, {
          $set: {
            count,
          },
        }, function(
          err,
          result
        ) {
          if (err) throw reject(err);
          client.close();
          resolve(count);
        });
      });
    });
  }
  async uploadImg(origin, stream) {
    // const index = stream.filename.lastIndexOf('.');
    // const filename = this.getRadomNum(8) + stream.filename.substring(index);
    const filename = stream.filename;
    const writerStream = fs.createWriteStream(
      path.join(this.config.baseDir, `app/public/resources/${filename}`)
    );
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writerStream));
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      throw err;
    }
    return `/public/resources/${filename}`;
  }
  // 随机数生成
  getRadomNum(capacity) {
    const chars = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    let res = '';
    for (let i = 0; i < capacity; i++) {
      const id = Math.ceil(Math.random() * chars.length);
      res += chars[id];
    }
    return res;
  }
}

module.exports = BaseService;
