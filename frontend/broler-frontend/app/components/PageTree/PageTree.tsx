"use client";

import TreeView from "@/components/tree-view";
import { TreeViewItem } from "@/components/tree-view";
import { Globe, Folder, FolderOpen, File } from "lucide-react";

import { TreeViewItemB } from '@/app/utils/treeify';

const customIconMap = {
    region: <Globe className="h-4 w-4 text-purple-500" />,
    store: <Folder className="h-4 w-4 text-blue-500" />,
    department: <FolderOpen className="h-4 w-4 text-green-500" />,
    item: <File className="h-4 w-4 text-orange-500" />,
};

const menuItems = [
    {
        id: "download",
        label: "Download",
        // icon: <Download className="h-4 w-4" />,
        action: (items: any) => console.log("Downloading:", items),
    },
];

interface PageTreeProps {
    data: TreeViewItemB[];
}

export default function PageTree({ data }: PageTreeProps) {
    const handleCheckChange = (item: TreeViewItem, checked: boolean) => {
        console.log(`Item ${item.name} checked:`, checked);
    };

    return (
        <TreeView
            data={data}
            title="Tree View Demo"
            showCheckboxes={true}
            iconMap={customIconMap}
            menuItems={menuItems}
            onCheckChange={handleCheckChange}
        />
    );
}

export const defaultTree = [{
    id: "0",
    name: "Loading...",
    type: "file",
    status: "unprocessed",
    children: [],
}];

