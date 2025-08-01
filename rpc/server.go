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
	"io"
	"net"
	"log"
	"time"
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


func (*server) PageInfo(req *pb.PagesInfoReq, stream pb.Broler_PageInfoServer) error {
	pages := []*pb.Pages {{
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
		},
		{ 
			Root: map[string]*pb.Paths{
				"aavtic.dev/broler": {
					IsEnd: false,
					Paths: map[string]*pb.Paths{
						"styles.css": { IsEnd: true, Paths: nil },
						"projects/ass_parser": {
							IsEnd: false,
							Paths: map[string]*pb.Paths{
								"scripts.rs": { IsEnd: true, Paths: nil },
							},
						},
					},
				},
			},
		},

		{ 
			Root: map[string]*pb.Paths{
				"aavtic.dev/ttype": {
					IsEnd: false,
					Paths: map[string]*pb.Paths{
						"styles.css": { IsEnd: true, Paths: nil },
						"projects/ass_parser": {
							IsEnd: false,
							Paths: map[string]*pb.Paths{
								"scripts.py": { IsEnd: true, Paths: nil },
							},
						},
					},
				},
			},
		},

	}

	for i, page := range pages {
		_ = i;
		if err := stream.Send(page); err != nil {
			return err;
		}
		log.Println("Sent stream");
		time.Sleep(time.Second * 2)
	}
	return nil;
}


func (*server) ClientRequests(stream pb.Broler_ClientRequestsServer) error {
	for ;; {
		client_request, err := stream.Recv()

		if err == io.EOF {
			return nil;
		}

		if err != nil {
			return err
		}	

		log.Println("CLIENT REQUEST: ", client_request.Request)
		stream.Send(&pb.ServerResponse{
			Response: "Coming right up!",
		})
	}
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
	listener, err := net.Listen("tcp", ":50051")
	if err != nil { log.Fatalf("Could not Listen due to %v", err) }
	log.Println("[+] Server up and running...")
	
	gRPC_server := grpc.NewServer()
	pb.RegisterBrolerServer(gRPC_server, &server{})
	
	if err := gRPC_server.Serve(listener); err != nil {
		log.Fatalf("Could not server due to %v", err);
	}
}
