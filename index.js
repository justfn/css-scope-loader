const scope_flag = 'data-fd-scope';

module.exports = function (originStr=""){
  originStr = originStr.trim();
  if ( !originStr ) { return ''; }
  
  let rgep = /^\s*?\/\*.*?scope\s*?:\s*(.*?);?\s*\*\//s;
  let rst01 = rgep.exec(originStr) || [];
  let scopeName = rst01[1];
  // 不启用命名空间 
  if ( !scopeName ) { return originStr; }
  
  let scope_attr_selector = `[${scope_flag}="${scopeName}"]`;
  // 去掉注释
  rgep = /\/\*.*?\*\//gms;
  originStr = originStr.replace(rgep, `\n`);
  // 格式化 
  rgep = /(\})/gms;
  originStr = originStr.replace(rgep, `$1\n`);
  // 属性选择器 增加命名空间  
  rgep = /(\n\s*?)(\[.+?\])([^\{\}]*?\{.*?\})/gms;
  originStr = originStr.replace(rgep, `$1${scope_attr_selector}$2$3`);
  // 标签选择器 增加命名空间  
  rgep = /(\n\s*?)([a-zA-Z\-\_]+?)([^\{\}]*?\{.*?\})/gms;
  originStr = originStr.replace(rgep, `$1${scope_attr_selector}$2$3`);
  // class选择器 增加命名空间 
  rgep = /(\n\s*?)(\.[a-zA-Z0-9\-\_]+?)([^\{\}]*?\{.*?\})/gms;
  originStr = originStr.replace(rgep, `$1${scope_attr_selector}$2$3`);
  // * 选择器替换 
  rgep = /\*/gms;
  originStr = originStr.replace(rgep, `${scope_attr_selector}`);
  
  return `/* ${scopeName} scoped */ \n ${originStr}`;
} 
