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
    import {
        setSidebarAction,
        openAction,
    } from "./sidebar/sharedSidebar.svelte";
    import {
        getMediaFieldConfig,
        type DocumentationProps,
        type SidebarFormat,
    } from "./media";
    import type { Component } from "svelte";

    let path = $derived(page.url.searchParams.get("path") ?? "");
    let rawJson: string = $state("");

    let tree = $state<TreeNode | null>(null);
    let sidebarOpen = $state(true);
    let viewRawWasSideBarOpen = $state(true);

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
            tree = formatJsonTree(buildJsonTree(targetData, "media", ["root"]));

            rawJson = rawJsonString;

            if (tree) {
                allBranchIDs = getAllBranchIDs(tree);
                openIds = new Set<string>(allBranchIDs);

                //* If someone goes back to the main menu with mouse button 4, then comes back with mouse button 5
                //* This will use the history to show whatever was there before
                const savedNodeId = history.state?.sidebarNodeId;
                const initialFieldId =
                    savedNodeId && nodesMap.has(savedNodeId)
                        ? savedNodeId
                        : "root.0.@ref";

                setSidebarField(initialFieldId, "replace");
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
    let activeDisplayPath = $state([""]);

    let documentationEntry: SidebarFormat = $derived(
        activeKey !== "" ? getMediaFieldConfigForField(activeFieldId) : {},
    );
    let Documentation: Component<DocumentationProps> = $derived(
        documentationEntry.documentation!,
    );

    function getMediaFieldConfigForField(fieldId: string): SidebarFormat {
        const node = nodesMap.get(fieldId);
        return node ? getMediaFieldConfig(node) : {};
    }

    export function setSidebarField(
        fieldId: string,
        historyMode: "push" | "replace" | "skip" = "push",
    ) {
        const node = nodesMap.get(fieldId);
        if (!node) return;

        //* This entire thing is just so that back and forth navigation (like with mouse button 4 and 5) works cleanly
        if (historyMode === "push") {
            if (
                activeFieldId &&
                history.state?.sidebarNodeId !== activeFieldId
            ) {
                history.replaceState(
                    { ...history.state, sidebarNodeId: activeFieldId },
                    "",
                );
            }
            //* Only push if we're actually switching to a different field
            if (activeFieldId !== fieldId) {
                history.pushState(
                    { ...history.state, sidebarNodeId: fieldId },
                    "",
                );
            }
        } else if (historyMode === "replace") {
            history.replaceState(
                { ...history.state, sidebarNodeId: fieldId },
                "",
            );
        }

        activeFieldId = fieldId;
        activeKey = node.label;
        activeValue = node.type === "leaf" ? node.value : "";
        activeDisplayPath = node.displayPath;

        //* Reset scrollbar back to the top when switching sidebar
        const scrollContainer = document.querySelector(".sidebar-container");
        if (scrollContainer) {
            scrollContainer.scrollTop = 0;
        }
    }

    function handlePopState(event: PopStateEvent) {
        const nodeId = event.state?.sidebarNodeId;
        if (nodeId) {
            setSidebarField(nodeId, "skip");
        }
    }

    export function openSidebar() {
        sidebarOpen = true;
    }

    export async function openFile() {
        await invoke<string>("open_file", { path });
    }

    export async function openFileLocation() {
        await invoke<string>("open_enclosing_folder", { path });
    }

    setSidebarAction.setSidebar = setSidebarField; //* This is so we can call this function from the child Tree.svelte
    setSidebarAction.openSideBar = openSidebar;
    openAction.openFile = openFile;
    openAction.openFileLocation = openFileLocation;

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
            <span
                class="tooltip-wrapper"
                data-tooltip={viewRaw
                    ? "Unavailable in raw view"
                    : "Toggle sidebar"}
            >
                <button
                    class="more-btn-no-raw"
                    onclick={() => {
                        if (!viewRaw) {
                            sidebarOpen = !sidebarOpen;
                        }
                    }}
                    aria-label="Toggle sidebar"
                    disabled={viewRaw}
                >
                    <img src="/assets/icons/sidebar.svg" alt="Collapse" />
                </button>
            </span>
            <button
                class="view-raw-btn"
                class:raw-active={viewRaw}
                data-tooltip="View raw"
                onclick={() => {
                    viewRaw = !viewRaw;
                    if (viewRaw) {
                        viewRawWasSideBarOpen = sidebarOpen;
                        sidebarOpen = false;
                    } else {
                        sidebarOpen = viewRawWasSideBarOpen;
                    }
                }}
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
        <aside
            class="sidebar-panel"
            class:closed={!sidebarOpen}
            inert={!sidebarOpen}
        >
            <div class="sidebar-header">
                <p>
                    {activeKey != "" &&
                    activeDisplayPath.slice(0, -1).length >= 1
                        ? activeDisplayPath.slice(0, -1).join(" / ") + " / "
                        : ""}
                </p>
                <h1 class="sidebar-title">
                    {documentationEntry?.displayName ?? activeKey}
                </h1>
            </div>
            <div class="sidebar-body">
                {#if Documentation as Component<DocumentationProps>}
                    <Documentation
                        node={nodesMap.get(activeFieldId)}
                        description={documentationEntry?.description ?? ""}
                        value={activeValue}
                        fieldKey={activeFieldId}
                        actions={documentationEntry?.actions ?? []}
                    ></Documentation>
                {/if}
            </div>
        </aside>
    </div>
</main>

<svelte:window onpopstate={handlePopState} />
