'use client';
import { useState, useEffect } from 'react';
import treeify from './utils/treeify';

import  PageTree from './components/PageTree/PageTree';
import { defaultTree } from '@/app/components/PageTree/PageTree';
import { TreeViewItemB } from './utils/treeify';

import { InputWithButton } from '@/components/input_field/InputWithButton';

function getTreeViewItemArray(json: any) {
    return treeify(json)
}

export default function Home() {
    const [data, setData] = useState<TreeViewItemB[]>(defaultTree);

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

    return (
        <>

<div className="min-h-screen flex flex-col items-center px-4 pt-20 pb-32 space-y-16">
  {/* Input at top */}
  <InputWithButton />

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
