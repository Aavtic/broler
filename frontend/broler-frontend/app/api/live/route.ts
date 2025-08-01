// app/api/live/route.ts
import { NextRequest } from 'next/server';
import { client } from '@/app/lib/grpcClient';

export async function GET(req: NextRequest) {
    const stream = new ReadableStream({
        start(controller) {
            const grpcStream = client.PageInfo({}); // your gRPC stream

            grpcStream.on('data', (data: any) => {
                const message = `data: ${JSON.stringify(data)}\n\n`;
                controller.enqueue(new TextEncoder().encode(message));
            });

            grpcStream.on('end', () => {
                controller.close();
            });

            grpcStream.on('error', (err: any) => {
                console.error('Stream error:', err);
                controller.close();
            });

            req.signal.addEventListener('abort', () => {
                grpcStream.cancel();
                controller.close();
            });
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        },
    });
}

