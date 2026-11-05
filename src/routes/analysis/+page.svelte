<script lang="ts">
    import "./+page.css";
    import { invoke } from "@tauri-apps/api/core";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import {
        buildJsonTree,
        formatJsonTree,
        getAllBranchIDs,
        nodesMap,
        type TreeNode,
    } from "./tree/parser";
    import JSONNodeView from "./tree/Tree.svelte";
    import { setSideBarAction } from "./sidebar/sharedSidebar.svelte";
    import {
        getMediaFieldConfig,
        type DocumentationProps,
        type LeafFormat,
    } from "./media";
    import type { Component } from "svelte";

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
                activeKey = "root.0_@ref";
                documentationEntry = getMediaFieldConfigForField("root.0_@ref");
                if (documentationEntry.documentation)
                    Documentation = documentationEntry?.documentation;
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
    let activeFieldId = $state("");
    let activeValue = $state("");

    let documentationEntry: LeafFormat = $derived(
        activeKey !== "" ? getMediaFieldConfigForField(activeFieldId) : {},
    );
    let Documentation: Component<DocumentationProps> = $derived(
        documentationEntry.documentation!,
    );

    setSideBarAction.setSideBar = setSidebarField; //* This is so we can call this function from the child Tree.svelte

    function getMediaFieldConfigForField(fieldId: string): LeafFormat {
        const node = nodesMap.get(fieldId);
        return node ? getMediaFieldConfig(node) : {};
    }

    export function setSidebarField(fieldId: string) {
        const node = nodesMap.get(fieldId);

        if (node) {
            activeFieldId = fieldId;
            activeKey = node.label;
            activeValue = node.type === "leaf" ? node.value : "";
        }
    }

    $effect(() => {
        if (path) {
            loadAnalysis(path);
        }
    });
</script>

<main class="analysis-container" lang="ts">
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
        <!-- {#if sidebarOpen} -->
        <aside class="sidebar-panel">
            <div class="sidebar-header">
                <h2 class="sidebar-title">
                    {documentationEntry?.displayName ?? activeKey}
                </h2>
            </div>
            <div class="sidebar-body">
                {#if Documentation as Component<DocumentationProps>}
                    <Documentation
                        description={documentationEntry?.description ??
                            "No description available."}
                        value={activeValue}
                        fieldKey={activeFieldId}
                    ></Documentation>
                {/if}
            </div>
        </aside>
        <!-- {/if} -->
    </div>
</main>
