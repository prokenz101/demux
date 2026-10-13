<script lang="ts">
    import { invoke } from "@tauri-apps/api/core";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import {
        buildJSONTree,
        formatJsonTree,
        getAllBranchIDs,
        type TreeNode,
    } from "./media-parser";
    import JSONNodeView from "./JsonNodes.svelte";

    let path = $derived(page.url.searchParams.get("path") ?? "");

    let tree = $state<TreeNode | null>(null);
    let openIds = $state<Set<string>>(new Set());
    let loading = $state(false);
    let errorMessage = $state("");

    var allBranchIDs: string[];

    async function loadAnalysis(filePath: string) {
        loading = true;
        errorMessage = "";
        try {
            const rawJsonString = await invoke<string>("list_details", {
                path: filePath,
            });
            const parsed = JSON.parse(rawJsonString);
            const targetData = parsed.media ?? parsed;
            tree = buildJSONTree(targetData, "media");
            formatJsonTree(tree);

            allBranchIDs = getAllBranchIDs(tree);
            openIds = new Set<string>(allBranchIDs);
        } catch (err) {
            console.error("Failed to load details:", err);
            errorMessage = String(err);
            tree = null;
        } finally {
            loading = false;
        }
    }

    function handleToggle(id: string) {
        const next = new Set(openIds);
        if (next.has(id)) {
            next.delete(id);
        } else {
            next.add(id);
        }
        openIds = next;
    }

    function expandAll() {
        if (tree) {
            openIds = new Set(allBranchIDs);
        }
    }

    function collapseAll() {
        openIds = new Set();
    }

    function back() {
        goto("/");
    }

    $effect(() => {
        if (path) {
            loadAnalysis(path);
        }
    });
</script>

<main class="container" lang="ts">
    <div class="title-button-sep">
        <div class="title-row">
            <button class="back-btn" onclick={back}>
                <img src="/assets/icons/back.svg" alt="Back" />
            </button>
            <div class="demux-title-row">
                <h1 class="demux-title">demux</h1>
                <h2 class="slash-slash">//</h2>
                <h1 class="analysis-title">Analysis</h1>
            </div>
        </div>
        <div class="control-row">
            <button class="more-btn" data-tooltip="Expand all" onclick={expandAll} aria-label="Expand all">
                <img src="/assets/icons/expand.svg" alt="Expand" />
            </button>
            <button class="more-btn" data-tooltip="Collapse all" onclick={collapseAll} aria-label="Collapse all">
                <img src="/assets/icons/collapse.svg" alt="Collapse" />
            </button>
            <button class="more-btn" aria-label="More...">
                <img src="/assets/icons/more_vert.svg" alt="More" />
            </button>
        </div>
    </div>
    {#if loading}
        <p>Loading media tree...</p>
    {:else if errorMessage}
        <p>Error: {errorMessage}</p>
    {:else if tree}
        <div class="jsonnodeview">
            <JSONNodeView node={tree} {openIds} onToggle={handleToggle} />
        </div>
    {/if}
</main>

<style>
    @font-face {
        font-family: "Bitter";
        src: url("/assets/fonts/Bitter-VariableFont_wght.ttf")
            format("truetype-variations");
        font-weight: 100 900;
        font-style: normal;
        font-display: swap;

        descent-override: 1%;
        ascent-override: 79%; /* This is to fit the font in the boundaries */
        line-gap-override: 0%;
    }

    @font-face {
        font-family: "Outfit";
        src: url("/assets/fonts/Outfit-VariableFont_wght.ttf")
            format("truetype-variations");
        font-weight: 100 500;
        font-style: normal;
        font-display: swap;
    }

    :root {
        font-family: "Bitter", sans-serif;
        font-size: 16px;
        line-height: 1;

        color: #ffffff;
        background-color: #f6f6f6;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
    }

    :global(body) {
        box-sizing: border-box;
        height: 100vh;
        background-color: #141414;
        overflow: hidden;
    }

    .container {
        margin: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
    }

    .title-button-sep {
        display: flex;
        flex-direction: row;
        /* flex: 1; */
        justify-content: space-between;
        height: fit-content;
        gap: 5px;
    }

    .title-row {
        display: flex;
        height: fit-content;
        align-items: center;
        gap: 12px;
        padding: 10px;
        flex-shrink: 0;
    }

    .control-row {
        display: flex;
        height: fit-content;
        padding-right: 18px;
        padding-top: 10px;
        gap: 8px;
    }

    .title-row h1 {
        margin: 0;
    }

    .demux-title-row {
        display: flex;
        align-items: last baseline;
        margin: 0;
        gap: 5px;
    }

    .demux-title {
        user-select: none;
    }

    .slash-slash {
        opacity: 0.4;
        transform: translateX(2px) translateY(-2px);
        user-select: none;
        margin: 0;
    }

    .analysis-title {
        font-family: "Bitter";
        font-weight: 300;
        font-size: 30px;
        user-select: none;
    }

    .container > p {
        flex: 1;
        min-height: 0;
        font-family: "Roboto";
        overflow-y: auto;
        white-space: pre-wrap;
        padding: 10px;
        margin: 0;
    }

    .back-btn {
        display: inline-flex;
        user-select: none;
        height: 40px;
        width: 40px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 8px;
        background-color: #222226;
        color: #ffffff;
        border: 2px solid #3f3f46;

        transition: all 0.075s ease;
    }

    .back-btn:hover {
        background-color: #333338;
        border-color: #494951;
    }

    .back-btn:active {
        background-color: #222226;
        border: 2px solid #3f3f46;
    }

    .more-btn {
        display: inline-flex;
        height: 40px;
        width: 40px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 8px;
        background-color: #222226;
        color: #ffffff;
        border: 2px solid #3f3f46;
        transition: all 0.075s ease;
    }

    .more-btn:hover {
        background-color: #333338;
        border-color: #494951;
    }

    .more-btn:active {
        background-color: #222226;
        border: 2px solid #3f3f46;
    }

    .jsonnodeview {
        max-height: 100%;
        overflow-y: auto;
        margin-top: 12px;
        padding-right: 8px;
    }

    .jsonnodeview::-webkit-scrollbar {
        width: 16px;
    }

    .jsonnodeview::-webkit-scrollbar-track {
        background: transparent;
    }

    .jsonnodeview::-webkit-scrollbar-thumb {
        background-color: #ffffff;
        border-radius: 10px;

        border: 4px solid transparent;
        border-right-width: 6px;

        /* This makes the hitbox hug the right side of the screen for easy scrolling */
        background-clip: padding-box;
    }

    .jsonnodeview::-webkit-scrollbar-thumb:hover {
        background-color: #cccccc;
    }

    /* Styling button tooltip */
    [data-tooltip] {
        position: relative;
    }

    [data-tooltip]::after {
        content: attr(data-tooltip);
        position: absolute;
        top: calc(100% + 10px); /* 10 pixels below the button */
        left: 50%;
        transform: translateX(-50%) translateY(-4px);

        background: rgba(28, 28, 30, 0.95);
        color: #ededed;
        font-size: 0.75rem;
        font-weight: 500;
        letter-spacing: 0.01em;
        white-space: nowrap;
        padding: 5px 9px;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);

        opacity: 0;
        visibility: hidden;
        pointer-events: none;

        transition:
            opacity 0.15s ease 0.1s,
            transform 0.15s ease 0.1s,
            visibility 0.15s;
        z-index: 50;
    }

    [data-tooltip]:hover::after,
    [data-tooltip]:focus-visible::after {
        opacity: 1;
        visibility: visible;
    }
</style>
