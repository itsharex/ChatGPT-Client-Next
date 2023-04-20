/**
 * 判断字符串是否全是空格
 * @param str 需要判断的字符串
 * @returns boolean 如果匹配成功，返回 true，否则返回 false。
 * 示例
 * ```ts
   // 示例
   console.log(isAllWhitespace('  ')); // true
   console.log(isAllWhitespace('  \n ')); // true
   console.log(isAllWhitespace('  a ')); // false
   console.log(isAllWhitespace('')); // true
   ```
 */
// export const isAllWhitespace = (str: string) => /^\s*$/.test(str)
export const isAllWhitespace = (str: string) => /^[\s\n\r]*$/.test(str)
