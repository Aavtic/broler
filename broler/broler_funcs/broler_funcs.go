package broler;

import (
	"log"
	"time"
	"github.com/aavtic/broler/networking/client"
	"github.com/aavtic/broler/parsing"
	proto "github.com/aavtic/broler/rpc/broler_proto"
	"github.com/aavtic/broler/utils/queue"

	"net/url"
	"path"
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

func get_domain(input_url string) (string, error) {
	parsed, err := url.Parse(input_url)
	if err != nil {
		return "", err
	}
	return parsed.Hostname(), nil
}

func is_urls_same_domain(a_url, b_url string) bool {
	a_domain, err := get_domain(a_url)
	if err != nil {
		log.Printf("Could not parse URL: %s due to %s", a_url, err)
		return false
	}
	b_domain, err := get_domain(b_url)
	if err != nil {
		log.Printf("Could not parse URL: %s due to %s", b_url, err)
		return false
	}
	if a_domain == b_domain {
		return true
	}

	return false
}

var url_queue *queue.Queue = queue.New();

func Procedure(url string, root map[string]*proto.Paths, data_channel chan *proto.Pages, global_tree *proto.Pages, opts BrolerOptions) {
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
		if opts.OnlySearchDomain {
			// TODO:
			// calling this multiple times may be expensive
			// opts.Urls is constant
			if !is_urls_same_domain(url, opts.Url) {
				log.Printf("INFO: Skipping %s because they have the same domain", url)
				continue
			}
		}

		if opts.IgnoreJSearch || opts.IgnoreCSSearch {
			ext := path.Ext(url)
			if opts.IgnoreJSearch && ext == ".js" {
				continue
			}
			if opts.IgnoreCSSearch && ext == ".css" {
				continue
			}
		}

		url_queue.Enqueue(url)
		// Allocate path in the heap as it is required out of this scope
		// path := new(proto.Paths)
		// path.IsEnd = true
		// path.IsProcessed = "unprocessed"
		// path.Paths = make(map[string]*proto.Paths)
		// root[url] = path
		if _, exists := root[url]; !exists {
			root[url] = &proto.Paths {
				IsEnd: true,
				IsProcessed: "unprocessed",
				Paths: make(map[string]*proto.Paths),
			}
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
			if entry := root[url]; entry != nil {
				root[url].IsEnd = false
				root[url].IsProcessed = "reachable"
				url_queue.Enqueue(url)
			} else {
				log.Printf("Skipping %s because it is already nil", url)
			}
		} else {
			if entry := root[url]; entry != nil {
				root[url].IsProcessed = "unreachable"
			} else {
				log.Printf("Skipping %s because it is already nil", url)
			}
		}

		// send the data
		data_channel <- global_tree
	}

	// Recursively call each child
	valid_urls := url_queue.Size()
	for range valid_urls {
		url := url_queue.Dequeue().(string)

		if root[url] != nil && root[url].Paths != nil {
			Procedure(url, root[url].Paths, data_channel, global_tree, opts)
		} else {
			log.Printf("WARN: root[%s] or root[%s].Paths is nil for url: %s", url, url, url)
		}
	}
}

type BrolerOptions struct {
	Url string
  OnlySearchDomain bool
  IgnoreJSearch bool
  IgnoreCSSearch bool
}

func Broler(opts BrolerOptions, data_channel chan *proto.Pages) {
	var global_tree *proto.Pages = &proto.Pages{}; 
	global_tree = &proto.Pages{
		Root: make(map[string] *proto.Paths),
	}

	Procedure(opts.Url, global_tree.Root, data_channel, global_tree, opts);
}
