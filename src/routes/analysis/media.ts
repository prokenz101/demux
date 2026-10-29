import type { Leaf } from "./parser";
import type { Component } from "svelte";

export interface LeafFormat {
    displayName?: string;
    documentation?: DocumentationRenderer | Component<DocumentationProps>;
}

export interface DocumentationProps {
    value?: any;
    fieldKey?: string;
}

export type DocumentationRenderer = (props: DocumentationProps) => string;

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
        }
    }

    return config;
}

export const mediaFieldMap = new Map<string, LeafFormat>([
    //TODO: Change all the documentations to be much more in depth, with more examples
    ["", {}], //* Initial value, will never be seen
    [
        "@ref",
        {
            displayName: "File Path",
            documentation: ({ value }: DocumentationProps) => `
                <div class="documentation">
                    <p>The absolute file path of the source container.</p>
                    <p>${value ?? ""}</p>
                </div>`
        }
    ],
    [
        "@type",
        {
            displayName: "Stream Type",
            documentation: ({ value }: DocumentationProps) => `
                <div class="documentation">
                    <p>The kind of stream.</p>
                    <p>${value}</p>
                </div>`
        }
    ],
    [
        "AudioCount",
        {
            displayName: "Audio Stream Count",
            documentation: ({ value }: DocumentationProps) => `
                <div class="documentation">
                    <p>The total number of audio streams.</p>
                    <p>${value ?? ""}</p>
                </div>`
        }
    ],
    [
        "Audio_Channels_Total",
        {
            displayName: "Total Audio Channels",
            documentation: ({ value }: DocumentationProps) => `
                <div class="documentation">
                    <p>The maximum number of independent </p>
                    <p>${value ?? ""}</p>
                </div>` //TODO: Fix that documentation
        }
    ],
    //TODO: Add more
]);