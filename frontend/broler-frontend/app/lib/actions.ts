'use server'
import { client } from './grpcClient'

export async function get_pages_information() {
    return new Promise((resolve, reject) => {
        client.PageInfo({}, )
        var call = client.PageInfo({});
        call.on('data', (info: any) => {
            console.log(info)
            resolve(info)
        })
        call.on('end' , () => { resolve(1) })
        call.on('error', (e: any) => { reject(e) })
    });
}
