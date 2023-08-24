<script>
    import AddressSelector from "./address/AddressSelector.svelte";
    import UrlBar from "./url-bar/UrlBar.svelte";

    export let username;
    export let domain;
    export let availableDomains;
</script>

<div class="header">
    <AddressSelector bind:username bind:domain {availableDomains} />
    <UrlBar />
</div>

<style>
    .header {
        background-color: #12243a;
        padding: 20px;
    }
</style>
