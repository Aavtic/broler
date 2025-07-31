package main;

import (
	"log"
	"time"
	"context"

	pb "github.com/aavtic/broler/rpc/broler_proto"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	conn, err := grpc.NewClient("localhost:8080", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil { log.Fatalf("Could not connect due to %v", err) }
	defer conn.Close()

	c := pb.NewBrolerClient(conn)	

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	response, err := c.FoundLink(ctx, &pb.FoundLinkArg{})
	log.Println("response: ", response)
}
