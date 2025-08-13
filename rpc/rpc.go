/*
-- Go client
-- sends links
-- send pages

-- Node server
- needs links
- request pages
*/

// package rpc;

package rpc

import (
	"context"
	"log"
	"net"

	broler "github.com/aavtic/broler/broler/broler_funcs"
	pb "github.com/aavtic/broler/rpc/broler_proto"
	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedBrolerServer
}

// {
//   "aavtic.dev": {
//     is_end: false
//     "styles.css": {is_end: true},
//     "projects/ass_parser": {is_end: false...}
//   },
// }

func (s *server) PageInfo(req *pb.PagesInfoReq, stream pb.Broler_PageInfoServer) error {
	log.Println("INFO: ", "URL:", req.Url)
	log.Println("INFO: ", "OnlySearchDomain:", req.OnlySearchDomain)
	log.Println("INFO: ", "IgnoreJSearch:", req.IgnoreJSearch)
	log.Println("INFO: ", "IgnoreCSSearch:", req.IgnoreCSSearch)
	log.Println("INFO: ", "UrlsData:", req.UrlsData)


	data_chan := make(chan *pb.Pages)
	// Url: req.Url,
	// OnlySearchDomain: req.OnlySearchDomain,
	// IgnoreJSearch: req.IgnoreJSearch,
	// IgnoreCSSearch: req.IgnoreCSSearch,
	
	go broler.Broler(broler.BrolerOptions{
		PagesInfoReq: req,
	}, data_chan)

	for page := range data_chan {
		log.Println(page)
		if err := stream.Send(page); err != nil {
			return err
		}
		log.Println("Sent stream")
	}
	return nil
}

func (*server) ClientRequests(_ context.Context, client_req *pb.ClientReq) (*pb.ServerResponse, error) {
	log.Println("INFO: ", "Client Request: ", client_req)

	// switch method := client_req.Method; method { case "broler":
	// 	url := client_req.Request
	// 	broler.Broler(url)
	// }

	return &pb.ServerResponse{
		Response: "Coming up!",
	}, nil
}

func RunServer() {
	listener, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Could not Listen due to %v", err)
	}
	log.Println("[+] Server up and running...")

	gRPC_server := grpc.NewServer()
	pb.RegisterBrolerServer(gRPC_server, &server{})

	if err := gRPC_server.Serve(listener); err != nil {
		log.Fatalf("Could not server due to %v", err)
	}
}

func main() {
	listener, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Could not Listen due to %v", err)
	}
	log.Println("[+] Server up and running...")

	gRPC_server := grpc.NewServer()
	pb.RegisterBrolerServer(gRPC_server, &server{})

	if err := gRPC_server.Serve(listener); err != nil {
		log.Fatalf("Could not server due to %v", err)
	}
}

// EXAMPLE DATA

// pages := *pb.Pages {
// 		Root: map[string]*pb.Paths{
// 			"aavtic.dev": {
// 				IsEnd: false,
// 				Paths: map[string]*pb.Paths{
// 					"styles.css": { IsEnd: true, Paths: nil },
// 					"projects/ass_parser": {
// 						IsEnd: false,
// 						Paths: map[string]*pb.Paths{
// 							"scripts.js": { IsEnd: true, Paths: nil },
// 						},
// 					},
// 				},
// 			},
// 		},
// 	},
