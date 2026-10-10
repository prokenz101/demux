<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import { openUrl } from "@tauri-apps/plugin-opener";

  let details = $state("");
  let filePath = $state("");
  let version = "v1.0";

  async function select_file(event: Event) {
    event.preventDefault();
    file_path = await invoke("select_file", {});
    details = "Info:\n" + (await invoke("list_details", { path: file_path }));
  }

  async function open_github() {
    try {
      await openUrl(`https://github.com/prokenz101/demux`); //TODO: Change this to a release once a release comes out
    } catch (err) {
      console.error("Failed: ", err);
    }
  }
</script>

<main class="container" lang="ts">
  <div class="title-button-sep">
    <div class="titlerow">
      <div class="demux-by">
        <h1>demux</h1>
        <p>by kenz | {version}</p>
        <button class="info-button" onclick={open_github}>
          <img src="/assets/icons/info.svg" alt="Info" />
        </button>
      </div>
      <button class="more-btn">
        <img src="/assets/icons/more_vert.svg" alt="More" />
      </button>
    </div>
    <div class="dashboard-row">
      <button class="play-btn">
        <img src="/assets/icons/play_arrow.svg" alt="Play">
        <span>Play video</span>
      </button>
      <div class="dashboard-grid">
        <button class="analyze-btn">
          <img src="/assets/icons/analyze.svg" alt="Analyze">
          <span>Analyze video</span>
        </button>
        <button class="edit-btn">
          <img src="/assets/icons/edit.svg" alt="Edit">
          <span>Edit video</span>
        </button>
      </div>
    </div>
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
    ascent-override: 79%;
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
    font-weight: 400;
    line-height: 1;
    color: #0f0f0f;
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

  .title-button-sep {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    gap: 5px;
  }

  .titlerow {
    display: flex;
    height: fit-content;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
  }

  .demux-by {
    display: flex;
    height: fit-content;
    margin: 0;
    gap: 10px;
    align-items: last baseline;
  }

  .demux-by p {
    line-height: 1;
    margin: 0;
  }

  h1 {
    font-size: 70px;
    margin: 0;
    line-height: normal;
    padding: 0;
    text-box-trim: both;
  }

  h1,
  p,
  .info-button,
  .more-btn,
  .dashboard-row button {
    user-select: none;
  }

  .info-button {
    display: inline-flex;
    align-items: center;
    height: fit-content;
    width: fit-content;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    border: 0;
    transform: translateY(2px) translateX(-7px);
    opacity: 0.5;
    transition: all 0.075s ease;
  }

  .info-button:hover {
    opacity: 0.75;
  }

  .info-button:active {
    opacity: 1;
    transition: all 0.15s ease;
  }

  .info-button img {
    width: 15px;
    height: 15px;
  }

  .more-btn {
    display: inline-flex;
    height: 40px;
    width: 40px;
    align-items: center;
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

  .dashboard-grid {
    display: grid;
    flex: 1;
    gap: 10px;
    min-height: 0;
  }

  .dashboard-row {
    display: flex;
    flex: 1;
    padding: 10px;
    gap: 10px;
  }

  .play-btn,
  .analyze-btn,
  .edit-btn {
    flex: 1;
    font-family: "Outfit";
    font-size: 24px;
    color: #ffffff;
    border-radius: 25px;
    border: 4px solid;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.125s ease;
  }

  .play-btn.dragging,
  .analyze-btn.dragging,
  .edit-btn.dragging {
    border-style: dashed;
  }

  .play-btn {
    background-color: #6982ff;
    border-color: #293365;
  }
  .play-btn img {
    width: 110px;
    height: 110px;
  }
  .play-btn.dragging,
  .play-btn:hover {
    background-color: #5467cc;
  }

  .analyze-btn {
    background-color: #25653d;
    border-color: #143e24;
  }
  .analyze-btn img {
    width: 75px;
    height: 75px;
  }
  .analyze-btn:hover {
    background-color: #205735;
  }

  .edit-btn {
    background-color: #ff2929;
    border-color: #650f0f;
  }
  .edit-btn img {
    width: 80px;
    height: 80px;
  }
  .edit-btn:hover {
    background-color: #cc2020;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      color: #f6f6f6;
      background-color: #000000;
    }
  }
</style>
