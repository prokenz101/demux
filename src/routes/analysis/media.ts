import { mediaFieldMap } from "./sidebar/map";
import type { TreeNode } from "./tree/parser";
import type { Component } from "svelte";
import DefaultSidebar from "./sidebar/DefaultSidebar.svelte";

export interface SidebarFormat {
    node?: TreeNode;
    displayName?: string;
    description?: string;
    documentation?: Component<DocumentationProps>;
    actions?: SidebarActionButton[];
    //TODO: Add "Insights"
}

export interface SidebarActionButton {
    iconPath: string;
    altText: string;
    label: string;
    onClick: () => void;
}

export interface DocumentationProps {
    node?: TreeNode;
    description?: string;
    value?: string;
    fieldKey?: string;
    actions?: SidebarActionButton[];
}

function formatKey(key: string): string {
    return key
        .replaceAll("_", " ")
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2') //* Split CamelCase
        .trim();
}

export function getMediaFieldConfig(child: TreeNode): SidebarFormat {
    const config = mediaFieldMap.get(child.label);

    return {
        node: child,
        displayName: config?.displayName || formatKey(child.displayName),
        documentation: config?.documentation || DefaultSidebar,
        description: config?.description,
        actions: config?.actions || []
    };
}
