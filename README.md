# hitokoto-box

將一則隨機的 [一言](https://github.com/hitokoto-osc/hitokoto-api) 顯示在「已置頂的 [GitHub Gist](https://gist.github.com)」，並使用 [opencc-js](https://github.com/nk2028/opencc-js) 轉換成正體中文。

> *PS. 若想了解更多置頂 Gist 專案，請參見*  
> *<https://github.com/matchai/awesome-pinned-gists>*

## 使用

1. [建立](https://gist.github.com/new) 一個公開的 GitHub Gist。

2. [新增一個 GitHub Token](https://github.com/settings/tokens/new)，勾選 `gist` 權限。在點擊「Generate token」按鈕後，複製產生出的 Token。

3. 使用這個儲存庫作為模板（點選 **Use this template** > **Create a new repository**）。

4. 進入 Generate 後的儲存庫的 **Settings** 分頁下的 **Secrets and variables** > **Actions** 選項卡。

5. 點選 **New repository secret** 並添加 `GH_TOKEN` 變數，內容為第二步複製的 Token。

6. 進入 **Actions** 分頁，啟用 **Update Gist** 作業流程。

7. 在 `.github/workflows/main.yml` 中編輯[環境變數](https://github.com/kuohuanhuan/hitokoto-box/blob/master/.github/workflows/main.yml#L16-L18)：
    - **CATEGORY**: 一言的類別，所有類別的選項清單在 [這裡](https://developer.hitokoto.cn/sentence/#%E5%8F%A5%E5%AD%90%E7%B1%BB%E5%9E%8B-%E5%8F%82%E6%95%B0)（預設為 `dik`，若希望取得所有類別，請刪除這個設定項目）。
    - **FILE_NAME**: 定義一言的名稱，可自行修改（預設為 *🌧 Hitokoto*）。
    - **GIST_ID:** 你的 Gist URL 的 ID（例如 `8277475f43f2054b4b7f8a51f24d41e7` 就代表 [這個 Gist](https://gist.github.com/rnmeow/8277475f43f2054b4b7f8a51f24d41e7)）。

8. 成功！

> ***Tip:***
>
> *`hitokoto-box` 預設**每小時**更新一次一言，如果你想更改更新頻率，需要在 `.github/workflows/main.yml` 中編輯 [`cron`](https://github.com/kuohuanhuan/hitokoto-box/blob/master/.github/workflows/main.yml#L8) 欄位。）*

## 授權

Copyright (c) 2023 [rnmeow](https://github.com/rnmeow), licensed under [MIT License](https://github.com/kuohuanhuan/hitokoto-box/blob/master/LICENSE).
