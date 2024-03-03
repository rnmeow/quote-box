# quote-box-zh_tw

下載一則隨機的語錄，格式化後存檔至 `quote.txt`。你可以利用 [Deploy to Gist](https://github.com/marketplace/actions/deploy-to-gist) 等 Actions 來定時推送到 [GitHub Gist](https://gist.github.com) 並釘選至個人檔案，以增添其豐富度。

語錄 API 由 [言雅 Elegent TW](https://elegant.tw) 提供。

> *PS. 若想了解更多「置頂 Gist」專案，請參見*  
> *<https://github.com/matchai/awesome-pinned-gists>*

## 使用

1. 新增一個 GitHub Actions 作業流程。

2. 添加 [`schedule`](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule) 欄位，並設定定時執行。

3. 在 Marketplace 中選擇 [此 Action](https://github.com/marketplace/actions/quote-box-zh_tw)。

4. 使用 [Deploy to Gist](https://github.com/marketplace/actions/deploy-to-gist) 並填入必要參數（`token`、`gist_id` 和 `file_path: quote.txt`）。

5. 成功！

## 授權

Copyright (C) 2023, 2024 [Yu-huan Kuo](https://github.com/rnmeow), licensed under [MIT License](https://github.com/kuohuanhuan/quote-box-zh_tw/blob/master/LICENSE).
