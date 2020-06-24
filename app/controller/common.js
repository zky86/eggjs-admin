
'use strict';
const XLSX = require('xlsx');
const Controller = require('./base');
/**
 * @controller common 公用接口
 */
class CommonController extends Controller {
  /**
     * @summary 上传文件
     * @description 上传文件
     * @router post /common/upload
     * @request formData file *file
     * @response 200 response 上传成功
     */
  async upload() {
    const { ctx, service } = this;
    const stream = await ctx.getFileStream();
    // const id = stream.fields.id;
    const origin = ctx.origin;
    this.success(await service.base.uploadImg(origin, stream));
  }

  async uploadExcel() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    // 存储获取到的数据
    let exceldata = [];
    stream.on('data', function(chunk) {
      // 读取内容
      const workbook = XLSX.read(chunk, { type: 'buffer' });
      // 遍历每张工作表进行读取（这里默认只读取第一张表）
      for (const sheet in workbook.Sheets) {
        if (workbook.Sheets.hasOwnProperty(sheet)) {
          // 利用 sheet_to_json 方法将 excel 转成 json 数据
          console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          exceldata = exceldata.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          // 打印解析出来的Excel 内容
          // break; // 如果只取第一张表，就取消注释这行
        }
      }
      // console.log(exceldata);
      exceldata.forEach(async (item, index) => {
        // 通用方法写入数据库表excel
        await ctx.service.base._update('excel', item);
        // this.success(await ctx.service.base._update('excel', exceldata));
      });
    });
    this.success('上传成功');
    // const { ctx, service } = this;
    // const stream = await ctx.getFileStream();
    // // const id = stream.fields.id;
    // const origin = ctx.origin;
    // this.success(await service.base.uploadImg(origin, stream));
  }
}

module.exports = CommonController;
