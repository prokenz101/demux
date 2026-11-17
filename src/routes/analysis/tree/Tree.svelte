<script lang="ts">
    import "./Tree.css";
    import type { TreeNode } from "./parser";
    import { setSidebarAction } from "../sidebar/sharedSidebar.svelte";

    export let node: TreeNode;
    export let openIds: Set<string>;
    export let onToggle: (id: string) => void;

    $: isOpen = openIds.has(node.id);
</script>

<div class="container">
    {#if node.type === "leaf"}
        <div class="leaf-div">
            <button
                class="key"
                onclick={() => {
                    console.log("NodeID:", node.id);
                    setSidebarAction.setSidebar(node.id);
                    setSidebarAction.openSideBar();
                }}
            >
                {node.displayName}:
            </button>
            <p class="value">{node.value}</p>
            <!--TODO: Add reactive feedback when hitting copy on a value -->
        </div>
    {:else}
        <div class="branch">
            <div class="branch-header">
                <button
                    type="button"
                    class="collapse-expand-arrow"
                    onclick={() => onToggle(node.id)}
                >
                    {#if isOpen}
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ffffff"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    {:else}
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ffffff"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    {/if}
                </button>
                <div class="label-badge">
                    <button
                        class="label"
                        onclick={() => {
                            setSidebarAction.setSidebar(node.id);
                            setSidebarAction.openSideBar();
                        }}>{node.displayName}</button
                    >
                </div>
            </div>

            <!--* This only renders when it is open -->
            {#if isOpen}
                <div class="branch-content">
                    {#each node.children.filter((child): child is TreeNode => child !== null && child !== undefined) as child (child.id)}
                        <svelte:self node={child} {openIds} {onToggle} />
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</div>
