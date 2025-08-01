set_env: all
	export PATH="$PATH:$(go env GOPATH)/bin"

compile_proto: broler_grpc.proto
	protoc --go_out=broler_proto --go_opt=paths=source_relative \
    --go-grpc_out=broler_proto --go-grpc_opt=paths=source_relative \
		broler_grpc.proto
