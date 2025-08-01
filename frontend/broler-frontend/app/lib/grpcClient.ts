import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = '/home/aad1sh/go-programming/broler/rpc/broler_grpc.proto';
const packageDefinitions = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true, longs: String, enums: String, defaults: true, oneofs: true
});

const grpcObj = grpc.loadPackageDefinition(packageDefinitions) as any;

export const client = new grpcObj.broler.Broler(
    'localhost:50051',
    grpc.credentials.createInsecure()
);
