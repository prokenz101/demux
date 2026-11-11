import type { SidebarFormat } from "../media";
import { openAction } from "./sharedSidebar.svelte";


export const mediaFieldMap = new Map<string, SidebarFormat>([
    //TODO: Change all the documentations to be much more in depth, with more examples
    ["", {}], //* Initial value, will never be seen
    [
        "media",
        {
            displayName: "Media display name",
            description: "Media description",
        }
    ],
    [
        "@ref",
        {
            displayName: "File Path",
            description: "File Path refers to the absolute file path of the file. It is the complete address of the file in a computer system, starting from the root directory and including all directories leading to the file.",
            actions: [
                {
                    iconPath: "/assets/icons/open_file.svg",
                    altText: "Open file",
                    label: "Open file",
                    onClick: () => { openAction.openFile(); }
                },
                {
                    iconPath: "/assets/icons/open_folder.svg",
                    altText: "Open file location",
                    label: "Open file location",
                    onClick: () => { openAction.openFileLocation(); }
                }
            ]
        }
    ],
    [
        "@type",
        {
            displayName: "Stream Type",
            description: "The kind of stream.",
        }
    ],
    [
        "AudioCount",
        {
            displayName: "Audio Stream Count",
            description: "The total number of audio streams.",
        }
    ],
    [
        "Audio_Channels_Total",
        {
            displayName: "Total Audio Channels",
            description: "The something",
        }
    ],
    [
        "Audio_Codec_List",
        {
            description: "The even more something",
        }
    ]
    //TODO: Add more
]);