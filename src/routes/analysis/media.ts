import { mediaFieldMap } from "./sidebar/map";
import type { TreeNode } from "./tree/parser";
import type { Component } from "svelte";
import DefaultSidebar from "./sidebar/DefaultSidebar.svelte";

export interface SidebarActionButton {
    iconPath: string;
    altText: string;
    label: string;
    onClick: () => void;
}

export type StreamKind =
    | "General"
    | "Video"
    | "Audio"
    | "Text"
    | "Image"
    | "Menu"
    | "Other";

export type DescriptionFormat =
    | string
    | ({
        default: string;
    } & Partial<Record<StreamKind, string>>);

export interface MediaFieldConfig {
    displayName?: string;
    description?: DescriptionFormat;
    documentation?: Component<DocumentationProps>;
    actions?: SidebarActionButton[];
}

export interface SidebarFormat {
    node?: TreeNode;
    displayName?: string;
    description?: string;
    documentation?: Component<DocumentationProps>;
    actions?: SidebarActionButton[];
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
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // Split CamelCase
        .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize each word
        .trim();
}

const STREAM_KINDS: readonly StreamKind[] = [
    "General",
    "Video",
    "Audio",
    "Text",
    "Image",
    "Menu",
    "Other"
];

function getEnclosingStreamKind(displayPath?: string[]): StreamKind | undefined {
    if (!displayPath || displayPath.length < 2) return undefined;

    //* We are starting at length - 2 to skip the leaf itself
    for (let i = displayPath.length - 2; i >= 0; i--) {
        const segment = displayPath[i];
        const matched = STREAM_KINDS.find((kind) => segment.includes(kind));
        if (matched) return matched;
    }

    return undefined;
}

function resolveDescription(
    description: DescriptionFormat | undefined,
    displayPath?: string[]
): string | undefined {
    //* This is for fast lookup so we don't resolve descriptions when there's no alternate types
    if (!description || typeof description === "string") {
        return description;
    }

    const streamKind = getEnclosingStreamKind(displayPath);
    return (streamKind && description[streamKind]) ?? description.default;
}

export function getMediaFieldConfig(child: TreeNode): SidebarFormat {
    const config = mediaFieldMap.get(child.label);

    return {
        node: child,
        displayName: config?.displayName || formatKey(child.displayName),
        documentation: config?.documentation || DefaultSidebar,
        description: resolveDescription(config?.description, child.displayPath),
        actions: config?.actions || []
    };
}