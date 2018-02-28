# PrettyPrism

Progressive Web App: [Preact](https://preactjs.com/) + [Apollo](https://www.apollographql.com/docs/react/)

![PrettyPrism preview](https://meenkme.nyc3.digitaloceanspaces.com/riacarmin.com/PrettyPrism%20Preact%20PWA.png)

## Running a dev server /w Docker

`docker build -t pp-server .`
`docker run -p 8080:8080 -v .:/pretty-prism -t pp-server`
