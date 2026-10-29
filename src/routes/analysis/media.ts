import type { Leaf } from "./parser";

export interface LeafFormat {
    displayName?: string;
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
        }
    }

    return config;
}

export const mediaFieldMap = new Map<string, LeafFormat>([
    [
        "@ref",
        {
            displayName: "File Path",
    ],
    [
        "@type",
        {
            displayName: "Stream Type",
        }
    ],
    [
        "AudioCount",
        {
            displayName: "Audio Stream Count",
        }
    ],
    [
        "Audio_Channels_Total",
        {
            displayName: "Total Audio Channels",
        }
    ],
    //TODO: Add more
]);