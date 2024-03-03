var c=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var l=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var p=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of l(t))!h.call(e,n)&&n!==o&&c(e,n,{get:()=>t[n],enumerable:!(r=a(t,n))||r.enumerable});return e};var g=e=>p(c({},"__esModule",{value:!0}),e);var u={};module.exports=g(u);var i=require("path"),s=require("fs/promises");(async()=>{let e=await fetch("https://v0.elegant.tw/all").then(o=>o.json()),t=`${e.sentence}
 \u2014\u2014${e.author!==null?e.author:e.cite}

\u65BC ${new Date().toLocaleString("zh-TW",{timeZone:"Asia/Taipei",hourCycle:"h23"})} \u66F4\u65B0`;console.log(`
${t}
`);try{await(0,s.writeFile)((0,i.join)(process.cwd(),"quote.txt"),t)}catch(o){console.error(`FATAL: ${o}`),process.exit(1)}console.log(`INFO: \u6210\u529F\u5132\u5B58\u3002
`)})();
