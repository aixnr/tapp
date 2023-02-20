package main

import (
	"fmt"
	"embed"
	"net/http"
	"log"
	"io/fs"
)

//go:embed src
var srcdir embed.FS

func handler() http.Handler {
	stripped, err := fs.Sub(srcdir, "src")
	if err != nil {
		log.Fatalln(err)
	}

	return http.FileServer(http.FS(stripped))
}

func main() {
	mux := http.NewServeMux()
	mux.Handle("/", handler())

	fmt.Println("Now serving at http://localhost:8339")
	http.ListenAndServe("127.0.0.1:8339", mux)
}
