export interface TreeViewItemB {
    id: string;
    name: string;
    status: string;
    type: string;
    children?: TreeViewItemB[];
    checked?: boolean;
}

interface PagePath {
    is_end: boolean;
    is_processed: string;
    paths: { [url: string]: PagePath };
}

interface PageRoot {
    root: { [url: string]: PagePath };
}


export default function treeify(root: PageRoot) {
    const dfs = (paths: { [url: string]: PagePath }, parentId: string): TreeViewItemB[] => {
        const items: TreeViewItemB[] = [];
        let index: number = 0;
        for (const url in paths) {
            const id = `${parentId}-${index}`;
            const item = paths[url];
            const node: TreeViewItemB = {
                id,
                name: url,
                status: item.is_processed,
                type: item.is_end ? "file" : "folder",
            }
            if (!item.is_end) {
                node.children = dfs(item.paths, id)
            }
            items.push(node);
            index++;
        }
        return items;
    }

    return dfs(root.root, "0");
}
