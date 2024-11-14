# quote-box

![GitHub Release](https://badgen.net/github/release/rnmeow/quote-box)

Receive a random quote, and pushes to [Gist](https://gist.github.com) with GitHub Actions.

> [!TIP]
> *For more “pinned gists” projects, visit*  
> *<https://github.com/matchai/awesome-pinned-gists>.*

## Usage

Use a GitHub Actions workflow to execute `quote-box`. Here's an example:

```yaml
name: Get Quote

on:
  workflow_dispatch:
  schedule:
    - cron: 0 0 * * *                             # execution frequency and time

jobs:
  push:
    runs-on: ubuntu-22.04
    steps:
    - name: Download and Push
      uses: rnmeow/quote-box-zh_tw@2.0.1
      env:
        GH_TOKEN: ${{ secrets.GH_TOKEN }}         # *
      # Settings
      with:
        confFile: conf.json
```

## License

(C) 2023, 2024, Connor Kuo. [MIT License](https://github.com/rnmeow/quote-box/blob/master/LICENSE.txt).
