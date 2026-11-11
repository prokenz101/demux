<script lang="ts">
    import type { DocumentationProps } from "../../media";

    let { value }: DocumentationProps = $props();
</script>

<div>
    <p class="description">
        "File Path" refers to the absolute file path of the file. It is the
        complete address of the file in a computer system, starting from the
        root directory and including all directories leading to the file.
    </p>
    <p class="sidebar-field-value">{value ? `Value:\n\n${value}` : ""}</p>
</div>

<style>
    .description {
        margin: 16px 16px 0px 16px;
    }

    .sidebar-field-value {
        margin: 16px 16px 0px 16px;
        word-break: break-all;
        white-space: pre-wrap;
    }
</style>
