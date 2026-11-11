import { mediaFieldMap } from "./sidebar/map";
import type { TreeNode } from "./tree/parser";
import type { Component } from "svelte";
import DefaultSidebar from "./sidebar/DefaultSidebar.svelte";

export interface SidebarFormat {
    displayName?: string;
    description?: string;
    documentation?: Component<DocumentationProps>;
    actions?: SidebarActionButton[];
}

export interface SidebarActionButton {
    iconPath: string;
    altText: string;
    label: string;
    onClick: () => void;
}

export interface DocumentationProps {
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
        displayName: config?.displayName || formatKey(child.displayName),
        documentation: config?.documentation || DefaultSidebar,
        description: config?.description || "No description available.",
        actions: config?.actions || []
    };
}
