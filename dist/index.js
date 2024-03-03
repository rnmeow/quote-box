var c=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var l=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var p=(t,e,o,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of l(e))!h.call(t,n)&&n!==o&&c(t,n,{get:()=>e[n],enumerable:!(r=a(e,n))||r.enumerable});return t};var g=t=>p(c({},"__esModule",{value:!0}),t);var u={};module.exports=g(u);var i=require("path"),s=require("fs/promises");(async()=>{let t=await fetch("https://v0.elegant.tw/all").then(o=>o.json()),e=`${t.sentence}
 \u2014\u2014${t.author!==null?t.author:t.cite}

\u65BC ${new Date().toLocaleString("zh-TW",{timeZone:"Asia/Taipei",hourCycle:"h23"})} \u66F4\u65B0`;console.log(`
${e}
`);try{await(0,s.writeFile)((0,i.join)(process.cwd(),"dist/quote.txt"),e)}catch(o){console.error(`FATAL: ${o}`),process.exit(1)}console.log(`INFO: \u6210\u529F\u5132\u5B58\u3002
`)})();
