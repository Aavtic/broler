"use client";

import  TreeView from "@/components/tree-view";
import  { TreeViewItem }  from "@/components/tree-view";
import { Globe, Folder, FolderOpen, File } from "lucide-react";

const data = [
  {
    id: "1",
    name: "Root",
    type: "region",
    children: [
      {
        id: "1.1",
        name: "Folder 1",
        type: "store",
        children: [
          {
            id: "1.1.1",
            name: "Subfolder",
            type: "department",
            children: [
              { id: "1.1.1.1", name: "File 1", type: "item" },
              { id: "1.1.1.2", name: "File 2", type: "item" },
            ],
          },
        ],
      },
    ],
  },
];

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

export default function Demo() {
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
