<script lang="ts">
    import type { DocumentationProps } from "../media";

    let { value, description, actions }: DocumentationProps = $props();
</script>

<div class="sidebar-container">
    {#if description != ""}
        <div class="sidebar-container-div">
            <p class="sidebar-container-div-header">Description</p>
            <p class="description-p">{description}</p>
        </div>
    {/if}

    {#if value}
        <div class="sidebar-value-container-div">
            <div class="value-header-copy-div">
                <p class="sidebar-value-container-div-header">Value</p>
                <button
                    class="copy-value-btn"
                    onclick={() => {
                        navigator.clipboard.writeText(value);
                    }}
                >
                    <img src="/assets/icons/copy.svg" alt="Copy" />
                </button>
            </div>
            <p class="value-p">{value}</p>
        </div>
    {/if}

    {#if actions && actions.length > 0}
        <div class="sidebar-container-div">
            <p class="sidebar-container-div-header">Actions</p>
            <div class="actions-btns-list">
                {#each actions as action}
                    <button onclick={action.onClick}>
                        <img src={action.iconPath} alt={action.altText} />
                        <p>{action.label}</p>
                    </button>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .sidebar-container {
        display: flex;
        flex-direction: column;
        gap: 15px;
        overflow-y: auto;

        flex: 1;
        min-height: 0;

        max-height: 100%;
        padding: 18px;
        box-sizing: border-box;
    }

    .sidebar-container-div {
        display: flex;
        flex-direction: column;
        background-color: #27272a;
        border: 1px solid #ffffff33;
        padding: 15px;
        border-radius: 8px;
        gap: 14px;
    }

    .sidebar-value-container-div {
        display: flex;
        flex-direction: column;
        border: 1px solid #ffffff33;
        background-color: #27272a;
        padding: 0px 0px 15px 15px;
        border-radius: 8px;
        gap: 10px;
    }

    .description-p {
        margin: 0px 0px 3px 0px;
        line-height: 1.15;
        white-space: pre-wrap;
    }

    .value-header-copy-div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .copy-value-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        box-sizing: border-box;
        width: 22px;
        height: 22px;
        border-radius: 4px;
        background-color: #222226;
        border: 1px solid #3f3f46;
        cursor: pointer;
        user-select: none;
        transition: all 0.075s ease;
        margin: 9px 9px 0px 0px;
    }

    .copy-value-btn img {
        width: 14px;
        height: 14px;
        object-fit: contain;
        pointer-events: none;
        margin: 0px;
    }

    .copy-value-btn:hover {
        background-color: #333338;
        border-color: #494951;
    }

    .copy-value-btn:active {
        background-color: #222226;
        border: 2px solid #3f3f46;
    }

    .value-p {
        margin: 0px 15px 3px 0px;
        font-family: "Consolas";
        color: #9ffffd;
        word-break: break-all;
    }

    .sidebar-container-div-header {
        margin: 0px;
        font-weight: 700;
        font-size: 13px;
        color: #999999;
        width: fit-content;
    }

    .sidebar-value-container-div-header {
        margin: 15px 0px 0px 0px;
        font-weight: 700;
        font-size: 13px;
        color: #999999;
        width: fit-content;
    }

    .actions-btns-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }

    .actions-btns-list button {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 7px;
        background: transparent;
        border: none;
        padding: 4px 6px;
        margin-left: -6px;
        border-radius: 6px;
        color: #cccccc;
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        user-select: none;
        transition: background-color 0.075s ease, color 0.075s ease;
    }

    .actions-btns-list button img {
        width: 18px;
        height: 18px;
        object-fit: contain;
        pointer-events: none;
        opacity: 0.85;
        transition: opacity 0.075s ease;
    }

    .actions-btns-list button p {
        margin: 0;
        line-height: 1;
        font-weight: 600;
    }

    .actions-btns-list button:hover {
        background-color: #333338;
        color: #ffffff;
    }

    .actions-btns-list button:active {
        background-color: #222226;
    }

    .sidebar-container::-webkit-scrollbar,
    .sidebar-container *::-webkit-scrollbar {
        width: 16px;
        height: 16px;
    }

    .sidebar-container::-webkit-scrollbar-track,
    .sidebar-container *::-webkit-scrollbar-track {
        background: transparent;
    }

    .sidebar-container::-webkit-scrollbar-thumb,
    .sidebar-container *::-webkit-scrollbar-thumb {
        background-color: #ffffff;
        border-radius: 10px;
        border: 5px solid transparent;
        background-clip: padding-box;
    }

    .sidebar-container::-webkit-scrollbar-corner,
    .sidebar-container *::-webkit-scrollbar-corner {
        background: transparent;
    }

    .sidebar-container::-webkit-scrollbar-thumb:hover {
        background-color: #cccccc;
    }
</style>
