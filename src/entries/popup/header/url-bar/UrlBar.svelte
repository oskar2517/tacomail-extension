<script>
    import UrlEntry from "./UrlEntry.svelte";
</script>

<div class="url-bar">
    <UrlEntry url="https://tacomail.de" text="Homepage" />
    <UrlEntry url="https://tacomail.de/tos.txt" text="TOS" />
    <UrlEntry url="mailto:contact@admin.tacomail.de" text="Contact" />
</div>

<style>
    .url-bar {
        display: flex;
        column-gap: 10px;
        justify-content: center;
        margin-top: 10px;
    }
</style>
