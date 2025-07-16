package main

import (
	"fmt"
	"log"
	"github.com/aavtic/broler/networking/client"
	"github.com/aavtic/broler/parsing"
)

func main1() {
	url := "http://127.0.0.1:8000"
	response, err := client.GetBody(url)
	if err != nil { log.Fatal("Could not GET ", url, " due to ", err) }
	fmt.Println(response)
}

func main() {
	s := `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HTML 5 Boilerplate</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <script src="index.js"></script>
  </body>
</html>
	`

	doc, err := parsing.ParseHTML(s)
	if err != nil {
		log.Fatal(err)
	}
	parsing.TraverseNode(doc)
}
