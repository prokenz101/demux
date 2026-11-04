import type { LeafFormat } from "../media";
import DefaultSidebar from "./DefaultSidebar.svelte";

export const mediaFieldMap = new Map<string, LeafFormat>([
    //TODO: Change all the documentations to be much more in depth, with more examples
    ["", {}], //* Initial value, will never be seen
    [
        "@ref",
        {
            displayName: "File Path",
            description: "The absolute file path of the file. This is just some example text so we can see how far the text moves.",
            documentation: DefaultSidebar
            // documentation: ({ value }: DocumentationProps) => `
            //     <div class="documentation">
            //         <p>The absolute file path of the source container.</p>
            //         <p>${value}</p>
            //         <button>Open file</button>
            //     </div>`
        }
    ],
    [
        "@type",
        {
            displayName: "Stream Type",
            description: "The kind of stream.",
            documentation: DefaultSidebar
        }
    ],
    [
        "AudioCount",
        {
            displayName: "Audio Stream Count",
            description: "The total number of audio streams.",
            documentation: DefaultSidebar
        }
    ],
    [
        "Audio_Channels_Total",
        {
            displayName: "Total Audio Channels",
            description: "The something",
            documentation: DefaultSidebar //TODO: Fix that documentation
        }
    ],
    //TODO: Add more
]);