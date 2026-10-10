<script lang="ts">
    import { goto } from "$app/navigation";

    async function back() {
        goto("/");
    }
</script>

<main>
    <h1>editor</h1>
    <button onclick={back}>back</button>
</main>
