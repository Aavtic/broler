package broler;

import (
	"log"
	"time"
	"github.com/aavtic/broler/networking/client"
	"github.com/aavtic/broler/parsing"
	rpcServer "github.com/aavtic/broler/rpc"
	proto "github.com/aavtic/broler/rpc/broler_proto"
)

// func is_url_valid(url string) bool {
// 	// TOOD:
// 	// check if url is valid
// 	return true;
// }
//
// func is_url_end(url string) bool {
// 	// TODO:
// 	// check if url is end
// 	return true;
// }

func Run(url string) {
	response, err := client.GetBody(url)
	if err != nil { log.Fatal("Could not GET ", url, " due to ", err) }

	doc, err := parsing.ParseHTML(response)
	if err != nil {
		log.Fatal(err)
	}
	urls := parsing.TraverseNode(doc)

	page := &proto.Paths {
		IsEnd: false,
		Paths: make(map[string]*proto.Paths),
	}

	pages := proto.Pages {
		Root: map[string]*proto.Paths {
			url: page,
		},
	}

	for _, path := range urls {
		page.Paths[path] = &proto.Paths {
			IsEnd: true,
			Paths: nil,
		} 
	}

	data_channel := make(chan *proto.Pages)
	go rpcServer.RunServer(data_channel)
	data_channel <- &pages
	time.Sleep(time.Second * 100)
}
