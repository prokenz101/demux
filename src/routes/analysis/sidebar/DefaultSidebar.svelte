<script lang="ts">
    import './DefaultSidebar.css';
    import type { DocumentationProps } from "../media";

    let { value, description }: DocumentationProps = $props();
</script>

<div>
    <p class="description">{description}</p>
    <p class="sidebar-field-value">{value}</p>
</div>
