# quote-box-zh_tw

下載一則隨機的語錄，格式化後存檔至 `quote.txt`。你可以利用 GitHub Actions 來定時推送到 [Gist](https://gist.github.com) 並釘選至個人檔案，以增添其豐富度。

語錄 API 由 [言雅 Elegent TW](https://elegant.tw) 提供。

> *PS. 若想了解更多「置頂 Gist」專案，請參見*  
> *<https://github.com/matchai/awesome-pinned-gists>*

## 使用

你可以使用 GitHub Actions 作業流程來執行操作，以下為一個範例，使用 [Deploy to Gist](https://github.com/marketplace/actions/deploy-to-gist)：

```yaml
name: Push to Gist

on:
  push:
    branches:
      - master
  schedule:
    - cron: 0 0 * * * # 每天執行

jobs:
  push:
    runs-on: ubuntu-22.04
    env:
      FILE_NAME: 🌧 Quote
      GIST_ID: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    steps:
    - name: Download
      uses: rnmeow/quote-box-zh_tw@0.1.1
    - name: Push
      uses: exuanbo/actions-deploy-gist@v1.1.4
      with:
        token: ${{ secrets.GH_TOKEN }} # 需要自行產生
        gist_id: ${{ env.GIST_ID }} # 上述 `env` 設定
        gist_file_name: ${{ env.FILE_NAME }} # 上述 `env` 設定
        file_path: quote.txt
        file_type: text

# Authored by Yu-huan Kuo, licensed under MIT License.
```

## 授權

Copyright (C) 2023, 2024 [Yu-huan Kuo](https://github.com/rnmeow), licensed under [MIT License](https://github.com/rnmeow/quote-box-zh_tw/blob/master/LICENSE.txt).
