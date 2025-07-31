/*
-- Go client
-- sends links
-- send pages

-- Node server
- needs links
- request pages
*/

// package rpc;

package main;

import (
	"net"
	"log"
	"context"
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


func (*server) FoundLink(context.Context, *pb.FoundLinkArg) (*pb.Pages, error) {
	pages := pb.Pages {
		Root: map[string]*pb.Paths{
			"aavtic.dev": {
				IsEnd: false,
				Paths: map[string]*pb.Paths{
					"styles.css": { IsEnd: true, Paths: nil },
					"projects/ass_parser": {
						IsEnd: false,
						Paths: map[string]*pb.Paths{
							"scripts.js": { IsEnd: true, Paths: nil },
						},
					},
				},
			},
		},
	}

	return &pages, nil
}

func RunServer() {
	listener, err := net.Listen("tcp", ":8080")
	if err != nil { log.Fatalf("Could not Listen due to %v", err) }
	
	gRPC_server := grpc.NewServer()
	pb.RegisterBrolerServer(gRPC_server, &server{})
	
	if err := gRPC_server.Serve(listener); err != nil {
		log.Fatalf("Could not server due to %v", err);
	}
}

func main() {
	listener, err := net.Listen("tcp", ":8080")
	if err != nil { log.Fatalf("Could not Listen due to %v", err) }
	log.Println("[+] Server up and running...")
	
	gRPC_server := grpc.NewServer()
	pb.RegisterBrolerServer(gRPC_server, &server{})
	
	if err := gRPC_server.Serve(listener); err != nil {
		log.Fatalf("Could not server due to %v", err);
	}
}
