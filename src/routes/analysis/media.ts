import { mediaFieldMap } from "./sidebar/map";
import type { Leaf } from "./tree/parser";
import type { Component } from "svelte";
import DefaultSidebar from "./sidebar/DefaultSidebar.svelte";

export interface LeafFormat {
    displayName?: string;
    description?: string;
    documentation?: Component<DocumentationProps>;
}

export interface DocumentationProps {
    description?: string;
    value?: string;
    fieldKey?: string;
}

function formatKey(key: string): string {
    return key
        .replaceAll("_", " ")
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2') //* Split CamelCase
        .trim();
}

export function getMediaFieldConfig(child: Leaf): LeafFormat {
    let config = mediaFieldMap.get(child.label);

    if (!config) { //* This is when config is not defined, i.e., default case
        config = {
            displayName: formatKey(child.label),
            documentation: DefaultSidebar,
        }
    }

    return config;
}
