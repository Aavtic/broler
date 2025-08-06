'use client';
import { useState, useEffect } from 'react';
import treeify from './utils/treeify';

import  PageTree from './components/PageTree/PageTree';
import { defaultTree } from '@/app/components/PageTree/PageTree';
import { TreeViewItemB } from './utils/treeify';

import { InputWithButton } from '@/components/input_field/InputWithButton';
import AlertBox from '@/components/AlertBox/AlertBox'



interface onClickProps {
    url: string,
}
async function sendReq({url} : onClickProps) {
    const response = await sendRequest(url);
    console.log(response)
}

function getTreeViewItemArray(json: any) {
    return treeify(json)
}

async function sendRequest(request: string) {
    const response =  await fetch('/api/live',
        {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify({message: request})
        }
    );
    return response.json()
}

export default function Home() {
    const [data, setData] = useState<TreeViewItemB[]>(defaultTree);
    const [inputUrl, setInputUrl] = useState<string>('');


    function initiateNewSearch(result: "cancel" | "continue") {
        if (result === "cancel") return;
        if (result === "continue") {
            console.log('initiating search')
            sendReq({url: inputUrl})
        }
    }

    useEffect(() => {
        const eventSource = new EventSource('/api/live');
        eventSource.onmessage = (event) => {
            let done: boolean = false;
            let parsed: any;
            try {
                parsed = JSON.parse(event.data);
                console.log('json: ', JSON.stringify(parsed))
                done = true;
            } catch (e) {
                console.error('Invalid JSON:', event.data);
            }

            if (done) {
                try {
                    const array = getTreeViewItemArray(parsed);
                    console.log(array);
                    setData(array);
                } catch(e) {
                    console.error('Error while processing data: ', e);
                }
            }

        };

        eventSource.onerror = () => {
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const on_change = (e: any) => {
        setInputUrl(e.target.value)
    }
    

    return (
        <>

<div className="min-h-screen flex flex-col items-center px-4 pt-20 pb-32 space-y-16">
  {/* Input at top */}
  <InputWithButton on_change={on_change} func={initiateNewSearch}/>

  {/* Scrollable PageTree container */}
  <div className="flex justify-center w-full max-w-4xl">
    <div className="max-h-[70vh] w-fit overflow-y-auto border rounded p-4">
      <PageTree data={data} />
    </div>
  </div>
</div>


        </>
    );
}
