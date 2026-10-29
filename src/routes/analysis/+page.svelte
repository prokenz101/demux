<script lang="ts">
    import { invoke } from "@tauri-apps/api/core";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import {
        buildJsonTree,
        formatJsonTree,
        getAllBranchIDs,
        leafNodesMap,
        type TreeNode,
    } from "./parser";
    import JSONNodeView from "./Tree.svelte";
    import { setSideBarAction } from "./sharedSidebar.svelte";
    import { mediaFieldMap, type DocumentationRenderer } from "./media";

    let path = $derived(page.url.searchParams.get("path") ?? "");
    let rawJson: string = $state("");

    let tree = $state<TreeNode | null>(null);

    let openIds = $state<Set<string>>(new Set());
    let loading = $state(false);
    let errorMessage = $state("");
    let viewRaw = $state(false);

    let allBranchIDs: string[];

    async function loadAnalysis(filePath: string) {
        loading = true;
        errorMessage = "";
        try {
            const rawJsonString = await invoke<string>("list_details", {
                path: filePath,
            });
            const parsed = JSON.parse(rawJsonString);
            const targetData = parsed.media ?? parsed;
            tree = formatJsonTree(buildJsonTree(targetData, "media", "root"));

            rawJson = rawJsonString;

            if (tree) {
                allBranchIDs = getAllBranchIDs(tree);
                openIds = new Set<string>(allBranchIDs);

                setSidebarField("root.0_@ref");
            }
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

    let activeKey = $state("");
    let activeValue = $state("");

    let documentationEntry = $derived(mediaFieldMap.get(activeKey));
    let documentation = $derived(documentationEntry?.documentation);

    //* If it's HTML
    let renderedHtml = $derived.by(() => {
        if (
            typeof documentation === "function" &&
            !isSvelteComponent(documentation)
        ) {
            return (documentation as DocumentationRenderer)({
                value: activeValue,
                fieldKey: activeKey,
            });
        }
        return null;
    });

    setSideBarAction.setSideBar = setSidebarField; //* This is so we can call this function from the child Tree.svelte

    function isSvelteComponent(target: any): boolean {
        return (
            typeof target === "function" &&
            target.prototype &&
            "$set" in target.prototype
        );
    }

    export function setSidebarField(fieldId: string) {
        let leaf = leafNodesMap.get(fieldId);

        if (leaf) {
            activeKey = leaf.label;
            activeValue = leaf.value;
        }
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
            <button
                class="view-raw-btn"
                class:raw-active={viewRaw}
                data-tooltip="View raw"
                onclick={() => (viewRaw = !viewRaw)}
                aria-label="View raw"
            >
                <img src="/assets/icons/view_raw.svg" alt="View raw" />
            </button>
            <span
                class="tooltip-wrapper"
                data-tooltip={viewRaw
                    ? "Unavailable in raw view"
                    : "Expand all"}
            >
                <button
                    class="more-btn-no-raw"
                    onclick={expandAll}
                    aria-label="Expand all"
                    disabled={viewRaw}
                >
                    <img src="/assets/icons/expand.svg" alt="Expand" />
                </button>
            </span>
            <span
                class="tooltip-wrapper"
                data-tooltip={viewRaw
                    ? "Unavailable in raw view"
                    : "Collapse all"}
            >
                <button
                    class="more-btn-no-raw"
                    onclick={collapseAll}
                    aria-label="Collapse all"
                    disabled={viewRaw}
                >
                    <img src="/assets/icons/collapse.svg" alt="Collapse" />
                </button>
            </span>
            <button class="more-btn" aria-label="More...">
                <img src="/assets/icons/more_vert.svg" alt="More" />
            </button>
        </div>
    </div>
    <div class="content-split">
        <section class="main-viewport">
            {#if loading}
                <p>Loading media tree...</p>
            {:else if errorMessage}
                <p>Error: {errorMessage}</p>
            {:else if tree}
                <div class="jsonnodeview" class:hidden={viewRaw}>
                    <JSONNodeView
                        node={tree}
                        {openIds}
                        onToggle={handleToggle}
                    />
                </div>
                <div class="jsonnodeview" class:hidden={!viewRaw}>
                    <p>{rawJson}</p>
                </div>
            {/if}
        </section>

        <!-- TODO: Make a proper sidebar -->
        <!-- TODO: Fix scrollbar problems when minimizing window to lowest size -->
        <!-- {#if sidebarOpen} -->
        <aside class="sidebar-panel">
            <div class="sidebar-header">
                <h2>{documentationEntry?.displayName ?? activeKey}</h2>
            </div>
            <div class="sidebar-body">
                {#if renderedHtml}
                    {@html renderedHtml}
                {/if}
            </div>
        </aside>
        <!-- {/if} -->
    </div>
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

    .hidden {
        display: none !important;
    }

    .title-button-sep {
        display: flex;
        flex-direction: row;
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
        gap: 10px;
    }

    .title-row h1 {
        margin: 0;
    }

    .demux-title-row {
        display: flex;
        align-items: last baseline;
        margin: 0;
        gap: 5px;
        user-select: none;
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

    .content-split {
        display: flex;
        flex-direction: row;
        flex: 1;
        min-height: 0;
        width: 100%;
        overflow: hidden;
    }

    .main-viewport {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
        padding-left: 10px;
    }

    .sidebar-panel {
        width: 35%;
        min-width: 280px;
        max-width: 500px;
        height: 100%;
        background-color: #141414;
        border-left: 2px solid #27272a;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-sizing: border-box;
    }

    .sidebar-header {
        padding: 12px 16px;
        border-bottom: 1px solid #27272a;
        background-color: #141414;
    }

    .sidebar-body :global {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
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
        user-select: none;
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

    .more-btn-no-raw {
        display: inline-flex;
        user-select: none;
        height: 40px;
        width: 40px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 8px;
        background-color: #222226;
        color: #ffffff;
        border: 2px solid #3f3f46;
        transition:
            hover,
            active 0.075s ease,
            opacity 0.15s ease;
    }

    .more-btn-no-raw:not(:disabled):hover {
        background-color: #333338;
        border-color: #494951;
    }

    .more-btn-no-raw:not(:disabled):active {
        background-color: #222226;
        border: 2px solid #3f3f46;
    }

    .more-btn-no-raw:disabled {
        cursor: not-allowed;
        opacity: 0.3;
    }

    .view-raw-btn {
        display: inline-flex;
        height: 40px;
        width: 40px;
        align-items: center;
        user-select: none;
        justify-content: center;
        cursor: pointer;
        border-radius: 8px;
        background-color: #222226;
        color: #ffffff;
        border: 2px solid #3f3f46;
        transition: all 0.075s ease;
    }

    .view-raw-btn:hover {
        background-color: #333338;
        border-color: #494951;
    }

    .view-raw-btn:active {
        background-color: #222226;
        border: 2px solid #3f3f46;
    }

    .view-raw-btn.raw-active,
    .view-raw-btn.raw-active:hover,
    .view-raw-btn.raw-active:active {
        border-color: #9ffffd;
    }

    .jsonnodeview {
        max-height: 100%;
        overflow-y: auto;
        margin-top: 12px;
        padding-right: 8px;
    }

    .jsonnodeview p {
        white-space: pre-wrap;
        margin-top: 6px;
        font-family: "Consolas";
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

    .tooltip-wrapper {
        display: inline-flex;
        position: relative;
    }

    .tooltip-wrapper:has(button:disabled) {
        cursor: not-allowed;
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
        font-family: Arial, sans-serif;
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
