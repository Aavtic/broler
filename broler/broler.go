package broler;

import (
	"log"
	"github.com/aavtic/broler/networking/client"
	"github.com/aavtic/broler/parsing"
)

func Run(url string) {
	response, err := client.GetBody(url)
	if err != nil { log.Fatal("Could not GET ", url, " due to ", err) }

	doc, err := parsing.ParseHTML(response)
	if err != nil {
		log.Fatal(err)
	}
	parsing.TraverseNode(doc)
}
