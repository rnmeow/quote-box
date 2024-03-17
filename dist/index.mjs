import{join as n}from"path";import{writeFile as r}from"fs/promises";var e=await fetch("https://v0.elegant.tw/all").then(t=>t.json()),o=`${e.sentence}
 \u2014\u2014${e.author!==null?e.author:e.cite}

\u65BC ${new Date().toLocaleString("zh-TW",{timeZone:"Asia/Taipei",hourCycle:"h23"})} \u66F4\u65B0`;console.log(`
${o}
`);try{await r(n(process.cwd(),"quote.txt"),o)}catch(t){console.error(`FATAL: ${t}`),process.exit(1)}console.log(`INFO: \u6210\u529F\u5132\u5B58\u3002
`);
