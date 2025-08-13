'use client';
import { useState, useEffect } from 'react';

import  PageTree from './components/PageTree/PageTree';
import { defaultTree } from '@/app/components/PageTree/PageTree';
import { TreeViewItemB } from './utils/treeify';

import InputButtonAndSettings from '@/components/InputButtonAndSettings/InputButtonAndSettings'

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
    const [startSearch, setStartSearch] = useState<boolean>(false);
    const [onlySearchGivenDomain, setOnlySearchGivenDomain] = useState<boolean>(true);
    const [ignoreJSearch, setIgnoreJSearch] = useState<boolean>(false);
    const [ignoreCSSearch, setCSSearch] = useState<boolean>(true);
    const [allowedUrls, setAllowedUrls] = useState<Array<String>>([]);
    const [disallowedUrls, setDisallowedUrls] = useState<Array<String>>([]);

    const settingsProps = {
        url: inputUrl,
        onlySearchDomain: onlySearchGivenDomain,
        ignoreJSearch: ignoreJSearch,
        ignoreCSSearch: ignoreCSSearch,
        allowedUrls: allowedUrls,
        disAllowedUrls: disallowedUrls,
    }


    function initiateNewSearch(result: "cancel" | "continue") {
        if (result === "cancel") return;
        if (result === "continue") {
            setStartSearch(!startSearch);
        }
    }

    useEffect(() => {
        if (inputUrl === '') return;

        const cleanUp = GetPages(settingsProps, setData)

        console.log(onlySearchGivenDomain)
        console.log(ignoreJSearch)
        console.log(ignoreCSSearch)

        return () => {
            cleanUp?.()
        }

    }, [startSearch]);

    const on_change = (e: any) => {
        setInputUrl(e.target.value)
    }
    
          // <InputWithButton on_change={on_change} func={initiateNewSearch}/>
          // <Settings 
          //   currentDomain = {onlySearchGivenDomain}
          //   jsSearch = {ignoreJSearch}
          //   cssSearch = {ignoreCSSearch}
          //   onlyCurrentDomain={setOnlySearchGivenDomain}
          //   setJSearch={setCSSearch}
          //   setCSSearch={setIgnoreJSearch}
          // />

    return (
        <>
        <div className="min-h-screen flex flex-col items-center px-4 pt-20 pb-32 space-y-16">
          {/* Input at top */}
          <InputButtonAndSettings 
            input_with_button_props={{
                on_change:on_change,
                func:initiateNewSearch,
            }}
            check_box_props={{
                currentDomain: onlySearchGivenDomain,
                jsSearch: ignoreJSearch,
                cssSearch: ignoreCSSearch,
                onlyCurrentDomain: setOnlySearchGivenDomain,
                setJSearch: setIgnoreJSearch,
                setCSSearch: setCSSearch,
            }}

            collapsible_props={
                {
                    allowed_websites: allowedUrls,
                    setAllowed_websites: setAllowedUrls,
                    disallowed_websites: disallowedUrls,
                    setDisAllowed_websites: setDisallowedUrls,
                }
            }

          />
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
