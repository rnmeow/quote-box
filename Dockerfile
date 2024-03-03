FROM node:18.19-alpine3.19
# tested environment

WORKDIR /app

LABEL "com.github.actions.name"="quote-box-zh_tw"
LABEL "com.github.actions.description"="Get a quote and store to local, API powered by Elegant TW."

LABEL "com.github.actions.icon"="file-text"
LABEL "com.github.actions.color"="yellow"

COPY . .
ENTRYPOINT ["node", "dist/index.js"]
