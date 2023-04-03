import { join } from "https://deno.land/std@0.182.0/path/mod.ts";
import * as OpenCC from "https://cdn.jsdelivr.net/npm/opencc-js@1.0.5/+esm";

export interface Response {
  hitokoto: string;
  from: string;
  from_who: string;
}

const data: Response = await fetch(
  `https://international.v1.hitokoto.cn?c=${
    Deno.env.get("CATEGORY")?.split("").join("&c=") || "d"
  }&encode=json&charset=utf-8`,
).then((res) => res.json());

const converter = OpenCC.Converter({ from: "cn", to: "tw" });

let from: string;

if (data.from === "" && data.from_who === "") from = "佚名";
else if (data.from !== "") from = converter(data.from);
else if (data.from_who !== "") from = converter(data.from_who);
else {
  console.error("Unexpected error");
  Deno.exit(1);
}

const content = `${converter(data.hitokoto)}
 ——${from}

於 ${
  new Date().toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
    hourCycle: "h23",
  })
} 更新`;

try {
  await Deno.mkdir(join(Deno.cwd(), "dist"), { recursive: true });
  await Deno.writeTextFile(join(Deno.cwd(), "dist/hitokoto.txt"), content);
} catch (err) {
  console.error(`FATAL: ${err}`);
  Deno.exit(1);
}

console.log("Successfully saved as plaintext to `dist/hitokoto.txt`.");
