<script lang="ts">
    import type { TreeNode } from "./media-parser";

    export let node: TreeNode;
    export let openIds: Set<string>;
    export let onToggle: (id: string) => void;

    $: isOpen = openIds.has(node.id);
</script>

<div class="container">
    {#if node.type === "leaf"}
        <p class="leaf">
            <span class="key">{node.label}:</span>
            <span class="value">{node.value}</span>
        </p>
    {:else}
        <div class="branch">
            <button
                type="button"
                class="branch-header"
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
                <div class="label-badge">
                    <strong class="label">{node.label}</strong>
                    <span class="badge">
                        {node.isArray
                            ? `[${node.childCount}]`
                            : `(${node.childCount})`}
                    </span>
                </div>
            </button>

            <!--* This only renders when it is open -->
            {#if isOpen}
                <div class="branch-content">
                    {#each node.children as child (child.id)}
                        <svelte:self node={child} {openIds} {onToggle} />
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    .leaf {
        margin: 0px 21px;
        font-family: "Consolas";
    }
    .key {
        color: #f0f0f0;
        font-weight: 600;
    }
    .value {
        color: #9ffffd;
        font-weight: 100;
    }
    .branch {
        margin: 2px 0;
    }
    .branch-header {
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        display: flex;
        align-items: center;
        border-radius: 5px;
        gap: 6px;
        margin-left: 7px;
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
        padding: 1px 4px;
    }
    .label:hover {
        background: #3c3c3c;
    }
    .branch-content {
        margin: 1px 21px;
        border-left: 1px dashed #cccccc62;
        color: #ffffff;
    }
</style>
