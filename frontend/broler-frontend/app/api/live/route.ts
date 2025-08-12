// app/api/live/route.ts
import {NextRequest, NextResponse } from 'next/server';
import { client } from '@/app/lib/grpcClient';

export async function GET(req: NextRequest) {
// /api/live?url=${encodeURIComponent(settings.url)}?onlySearchDomain=${encodeURIComponent(settings.onlySearchDomain)}?ignoreJSearch=${encodeURIComponent(settings.ignoreJSearch)}?ignoreCSSearch=${encodeURIComponent(settings.ignoreCSSearch)}
    const { searchParams } = new URL(req.url);

    const url = searchParams.get('url')
    const onlySearchDomain = searchParams.get('onlySearchDomain')
    const ignoreJSearch = searchParams.get('ignoreJSearch')
    const ignoreCSSearch = searchParams.get('ignoreCSSearch')

    console.log(
            {
                url: url,
                onlySearchDomain: onlySearchDomain === 'true' ? true : false,
                ignoreJSearch: ignoreJSearch === 'true' ? true : false,
                ignoreCSSearch: ignoreCSSearch === 'true' ? true : false,
            }
    )

    const stream = new ReadableStream({
        start(controller) {
            const grpcStream = client.PageInfo({
                url: url,
                onlySearchDomain: onlySearchDomain === 'true' ? true : false,
                ignoreJSearch: ignoreJSearch === 'true' ? true : false,
                ignoreCSSearch: ignoreCSSearch === 'true' ? true : false,
            }); // your gRPC stream
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

export async function POST(req: NextRequest) {
    const request = await req.json();
    const message = request["message"]
    const res = await new Promise((resolve, reject) => {
        client.ClientRequests({ request: message }, (err: any, response: any) => {
            if (err) {
                reject(err)
            } else {
                resolve(response)
            }
        })
    })
    return NextResponse.json({message: res}, { status: 200 })
}
