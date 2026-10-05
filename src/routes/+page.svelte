<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";

  let file_path = $state("");
  let resolution = $state("");

  async function select_file(event: Event) {
    event.preventDefault();
    file_path = await invoke("select_file", {});
    resolution = await invoke("get_resolution", { path: file_path });
  }
</script>

<main class="container" lang="ts">
  <h1>Welcome to demux</h1>

  <!--* file picker -->
  <button onclick={select_file}>
    Select File
  </button>
  <p>File path: {file_path}</p>
  <p>Resolution: {resolution}</p>
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
    padding-top: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  h1 {
    text-align: center;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      color: #f6f6f6;
      background-color: #000000;
    }
  }
</style>
