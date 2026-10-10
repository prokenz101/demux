<script lang="ts">
    import { invoke } from "@tauri-apps/api/core";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";

    let path = $derived(page.url.searchParams.get("path") ?? "");
    let details = $state("");

    async function show_analysis(path: string) {
        details = await invoke("list_details", { path });
    }

    $effect(() => {
        if (path) {
            show_analysis(path);
        }
    });

    async function back() {
        goto("/");
    }
</script>

<main class="container" lang="ts">
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
    <p>{details}</p>
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
        ascent-override: 79%; /* To fit the font perfectly */
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
        overflow: hidden;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
    }

    :global(body) {
        margin: 0;
        padding: 8px;
        box-sizing: border-box;
        height: 100vh;
        overflow: hidden;
        background-color: #000000;
    }

    .container {
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: left;
        text-align: left;
        height: 100%;
        box-sizing: border-box;
    }

    .title-row {
        display: flex;
        height: fit-content;
        align-items: center;
        gap: 12px;
        padding: 10px;
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

    p {
        font-family: "Roboto";
        white-space: pre-line;
        padding: 10px;
        margin: 0;
    }

    .back-btn {
        display: inline-flex;
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
</style>
