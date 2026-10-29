<script lang="ts">
    import type { TreeNode } from "./parser";
    import { setSideBarAction } from "./sharedSidebar.svelte";

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
                    console.log(node.id);
                    setSideBarAction.setSideBar(node.id);
                }}
            >
                {node.label}:
            </button>
            <button
                class="value"
                onclick={() => navigator.clipboard.writeText(node.value)}
                >{node.value}
            </button>
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
                    <strong class="label">{node.label}</strong>
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

<style>
    .leaf-div {
        gap: 0px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
    }
    .key {
        font-family: "Consolas";
        background-color: transparent;
        color: #f0f0f0;
        border: none;
        font-weight: 600;
        font-size: 16px;
        cursor: pointer;
        margin-left: 21px;
        padding: 0.5px 3px 0.5px 3px;
        border-radius: 5px;
        transition: background 0.075s ease;
        text-align: left;
        white-space: nowrap;
        flex-shrink: 0;
    }
    .key:hover {
        background: #3c3c3c;
    }
    .value {
        display: inline;
        color: #9ffffd;
        font-weight: 100;
        font-family: "Consolas";
        background-color: transparent;
        border: none;
        font-size: 16px;
        cursor: pointer;
        padding: 0.5px 3px 0.5px 3px;
        border-radius: 5px;
        text-align: left;
        word-break: break-all;
    }
    .branch {
        margin: 2px 0;
    }
    .branch-header {
        display: flex;
        flex-direction: row;
        height: fit-content;
        align-items: center;
    }
    .collapse-expand-arrow {
        background: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 5px;
        gap: 6px;
        padding: 3px;
        margin-left: 10px;
        margin-right: 4px;
        color: #ffffff;
        transition: all 0.075s ease;
    }
    .label-badge {
        display: flex;
        gap: 3px;
        align-items: center;
    }
    .label {
        border-radius: 5px;
        margin: 2px;
    }
    .collapse-expand-arrow:hover {
        background: #3c3c3c;
    }
    .branch-content {
        margin: 1px 21px;
        border-left: 1px dashed #cccccc62;
        color: #ffffff;
    }
</style>
