const scope_flag = 'data-fd-scope';

module.exports = function (originStr){
  if ( !originStr || !originStr.trim() ) { return ''; }
  
  originStr = originStr.trim();
  let rgep = /^\s*?\/\*.*?scope\s*?:\s*(.*?);?\s*\*\//s;
  let rst01 = rgep.exec(originStr) || [];
  let scopeName = rst01[1];
  
  // 不启用命名空间 
  if ( !scopeName ) { return originStr; }
  
  rgep = /\/\*.*?\*\//gms;
  originStr = originStr.replace(rgep, '');
  let scope_attr_selector = `[${scope_flag}="${scopeName}"]`;
  // 所有属性选择器增加命名空间  
  rgep = /([^:])(\s+?)(\[.+?\])(\s+?)([^:])/gms;
  originStr = originStr.replace(rgep, `$1$2${scope_attr_selector}$3$4$5`);
  // 所有标签选择器增加命名空间  
  rgep = /([^:])(\s+?)([a-zA-Z\-\_]+?)(\s+?)([^:])/gms;
  originStr = originStr.replace(rgep, `$1$2${scope_attr_selector}$3$4$5`);
  // 所有class选择器增加命名空间 
  rgep = /([^:])(\s+?)(\.[a-zA-Z0-9\-\_]+?\s+?)([^:])/gms;
  originStr = originStr.replace(rgep, `$1$2${scope_attr_selector}$3$4`);
  // 多次 查漏补缺 待优化 
  originStr = originStr.replace(rgep, `$1$2${scope_attr_selector}$3$4`); 
  // * 选择器替换 
  rgep = /\*/gms;
  originStr = originStr.replace(rgep, `${scope_attr_selector}`);
  
  return originStr;
} 
