# quote-box-zh_tw

[![GitHub Release](https://badgen.net/github/release/rnmeow/quote-box-zh_tw)](https://www.npmjs.com/package/sanso)

下載一則隨機的語錄，格式化後利用 GitHub Actions 推送到 [Gist](https://gist.github.com)。

語錄 API 由 [言雅 Elegent TW](https://elegant.tw) 提供。

> *PS. 若想了解更多「置頂 Gist」專案，請參見*  
> *<https://github.com/matchai/awesome-pinned-gists>*

## 使用

使用 GitHub Actions 作業流程來推送至 Gist，以下為一個範例：

```yaml
name: Get Quote

on:
  push:
    branches:
      - master
  schedule:
    - cron: 0 0 * * *                             # 每天執行

jobs:
  push:
    runs-on: ubuntu-22.04
    steps:
    - name: Download and Push
      uses: rnmeow/quote-box-zh_tw@1.0.0
      env:
        GH_TOKEN: ${{ secrets.GH_TOKEN }}         # 須自行產生
      with:
        gist_id: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx # 須設定
        gist_file_name: 🌧 Quote                  # 可設定，或使用預設值

# Authored by Yu-huan Kuo, licensed under MIT License.
```

## 授權

Copyright (C) 2023, 2024 [Yu-huan Kuo](https://github.com/rnmeow), licensed under [MIT License](https://github.com/rnmeow/quote-box-zh_tw/blob/master/LICENSE.txt).
