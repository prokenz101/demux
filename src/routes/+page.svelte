<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";

  let file_path = $state("");
  let details = $state("");

  async function select_file(event: Event) {
    event.preventDefault();
    file_path = await invoke("select_file", {});
    details = "Info:\n" + (await invoke("list_details", { path: file_path }));
  }
</script>

<main class="container" lang="ts">
  <h1>demux</h1>

  <!--* file picker -->
  <button class="select-file-btn-select" onclick={select_file}>
    Select File
  </button>

  <p class="multiline">{details}</p>
</main>

<style>
  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color: #0f0f0f;
    background-color: #f6f6f6;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  .container {
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: left;
    text-align: left;
  }

  h1 {
    font-size: 60px;
    line-height: 0.9;
    text-align: top;
    margin-top: 0;
    margin-left: 0;
    padding-top: 10px;
    padding-left: 10px;
  }

  p.multiline {
    white-space: pre-line;
  }

  .select-file-btn-select {
    width: fit-content;
    padding: 4px 12px;
    cursor: pointer;
    font-size: 24px;
    border-radius: 0;

    background-color: #222226;
    color: #ffffff;
    border: 3px solid #3f3f46;

    transition: all 0.075s ease-in-out;
  }

  .select-file-btn-select:hover {
    background-color: #333338;
    border-color: #494951;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      color: #f6f6f6;
      background-color: #000000;
    }
  }
</style>
