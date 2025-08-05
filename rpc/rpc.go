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
	pb "github.com/aavtic/broler/rpc/broler_proto"
	"google.golang.org/grpc"
	"io"
	"log"
	"net"
)

type server struct {
	pb.UnimplementedBrolerServer
	data_chan chan *pb.Pages
}

// {
//   "aavtic.dev": {
//     is_end: false
//     "styles.css": {is_end: true},
//     "projects/ass_parser": {is_end: false...}
//   },
// }

func (s *server) PageInfo(req *pb.PagesInfoReq, stream pb.Broler_PageInfoServer) error {
	log.Println("Connection came")
	for page := range s.data_chan {
		log.Println(page)
		if err := stream.Send(page); err != nil {
			return err
		}
		log.Println("Sent stream")
	}
	return nil
}

func (*server) ClientRequests(stream pb.Broler_ClientRequestsServer) error {
	for {
		client_request, err := stream.Recv()

		if err == io.EOF {
			return nil
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

func RunServer(data_channel chan *pb.Pages) {
	listener, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Could not Listen due to %v", err)
	}
	log.Println("[+] Server up and running...")

	gRPC_server := grpc.NewServer()
	pb.RegisterBrolerServer(gRPC_server, &server{data_chan: data_channel})

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
