
# Running a dev server

`docker build -t pp-server .`
`docker run -p 8080:8080 -v .:/pretty-prism -t pp-server`