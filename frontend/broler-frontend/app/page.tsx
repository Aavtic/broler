'use client';
import { useState, useEffect } from 'react';

import  PageTree from './components/PageTree/PageTree';
import { defaultTree } from '@/app/components/PageTree/PageTree';
import { TreeViewItemB } from './utils/treeify';

import { InputWithButton } from '@/components/input_field/InputWithButton';
import GetPages from '@/app/utils/getPages'


// interface onClickProps {
//     url: string,
// }

// async function sendReq({url} : onClickProps) {
//     const response = await sendRequest(url);
//     console.log(response)
// }

// async function sendRequest(request: string) {
//     const response =  await fetch('/api/live',
//         {
//             "method": "POST",
//             "headers": {
//                 "Content-Type": "application/json",
//             },
//             "body": JSON.stringify({message: request})
//         }
//     );
//     return response.json()
// }

export default function Home() {
    const [data, setData] = useState<TreeViewItemB[]>(defaultTree);
    const [inputUrl, setInputUrl] = useState<string>('');
    const [URL, setURL] = useState<string>('');


    function initiateNewSearch(result: "cancel" | "continue") {
        if (result === "cancel") return;
        if (result === "continue") {
            setURL(inputUrl)
        }
    }

    useEffect(() => {
        console.log('in use effect');
        if (inputUrl === '') return;

        const cleanUp = GetPages(inputUrl, setData)

        return () => {
            cleanUp?.()
        }

    }, [URL]);

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
