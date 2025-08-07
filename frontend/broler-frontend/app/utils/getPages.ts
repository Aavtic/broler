import treeify from './treeify'; 
import { TreeViewItemB } from './treeify';

export default function GetPages(url: string, setData: React.Dispatch<React.SetStateAction<TreeViewItemB[]>>) {
    const eventSource = new EventSource(`/api/live?url=${encodeURIComponent(url)}`);
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
                const array = treeify(parsed);
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
}
