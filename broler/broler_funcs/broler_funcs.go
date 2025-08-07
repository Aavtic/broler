package broler;

import (
	"log"
	"time"
	"github.com/aavtic/broler/networking/client"
	"github.com/aavtic/broler/parsing"
	proto "github.com/aavtic/broler/rpc/broler_proto"
	"github.com/aavtic/broler/utils/queue"
)


// [x]Get page 
// [x]push each page to the queue
// [x] update the global tree
// [x]send the queue data to the client
//   check if each page in the queue is reachable and 
//   send the reachable/unreachable page status to the client
// [x]push all the reachable pages to the queue
// []repeat this with pages via goroutines queue

func is_page_reachable(url string) bool {
	// TODO: cache the response for future use
	time.Sleep(time.Second * 3)
	_ , err := client.GetBody(url)
	if err != nil {
		log.Println("Could not GET ", url, " due to ", err)
		return false;
	}
	return true;
}

var url_queue *queue.Queue = queue.New();

func Procedure(url string, root map[string]*proto.Paths, data_channel chan *proto.Pages, global_tree *proto.Pages) {
	log.Println("INFO: ", "Processing url: ", url)
	log.Println("INFO: ", "Worker Queue:: ")
	url_queue.Print()

	// Get the page contents
	response, err := client.GetBody(url)
	if err != nil { 
		log.Println("PROC: Could not GET ", url, " due to ", err) 
		return
	}

	doc, err := parsing.ParseHTML(response)
	if err != nil {
		log.Println("Could not parse html of url: ", url , " due to : ", err)
		return
	}

	// Get the urls
	urls := parsing.TraverseNode(doc)


	// push each url to the queue and
	// update the global tree

	for _, url := range urls {
		url_queue.Enqueue(url)
		// Allocate path in the heap as it is required out of this scope
		// path := new(proto.Paths)
		// path.IsEnd = true
		// path.IsProcessed = "unprocessed"
		// path.Paths = make(map[string]*proto.Paths)
		// root[url] = path
		root[url] = &proto.Paths {
			IsEnd: true,
			IsProcessed: "unprocessed",
			Paths: make(map[string]*proto.Paths),
		}
	}

	// send the queue data to the client
	// check if each page in the queue is reachable and 
	// send the reachable/unreachable page status to the client

	data_channel <- global_tree;

	// check if each page in the queue is reachable and 
	queue_size := url_queue.Size()
	for range queue_size {
		url := url_queue.Dequeue().(string)
		if is_page_reachable(url) {
			root[url].IsEnd = false
			root[url].IsProcessed = "reachable"
			url_queue.Enqueue(url)
		} else {
			root[url].IsProcessed = "unreachable"
		}

		// send the data
		data_channel <- global_tree
	}

	// Recursively call each child
	valid_urls := url_queue.Size()
	for range valid_urls {
		url := url_queue.Dequeue().(string)

		if root[url] != nil && root[url].Paths != nil {
			Procedure(url, root[url].Paths, data_channel, global_tree)
		} else {
			log.Printf("WARN: root[%s] or root[%s].Paths is nil for url: %s", url, url, url)
		}
	}

}

func Broler(url string, data_channel chan *proto.Pages) {
	var global_tree *proto.Pages = &proto.Pages{}; 
	global_tree = &proto.Pages{
		Root: make(map[string] *proto.Paths),
	}

	Procedure(url, global_tree.Root, data_channel, global_tree);
}
