export interface TreeViewItemB {
    id: string;
    name: string;
    type: string;
    children?: TreeViewItemB[];
    checked?: boolean;
}

interface PagePath {
    is_end: boolean;
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
            const node: TreeViewItemB = {
                id,
                name: url,
                type: paths[url].is_end ? "file" : "folder",
            }
            if (!paths[url].is_end) {
                node.children = dfs(paths[url].paths, id)
            } 
            items.push(node);
            index++;
        }
        return items;
    }

    return dfs(root.root, "0");
}
