<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let showTick = false;

    function handleClick(e) {
        dispatch("copy");
        
        showTick = true;

        setTimeout(() => {
            showTick = false;
        }, 3000);
    }
</script>

<button type="button" title="Copy selected email address to clipboard" on:click={handleClick} class="copy-button">
    {#if showTick}
        <i class="fa-solid fa-check fa-fw icon" />
    {:else}
        <i class="fa-solid fa-copy fa-fw icon" />
    {/if}
</button>

<div class="clipboard" />

<style>
    .copy-button {
        padding: 5px 10px;
        font-size: 16px;
        background-color: rgba(255, 255, 255, 0.103);
        border-radius: 5px;
        border: none;
        color: #dbdde0;
        cursor: pointer;
        transition: ease background-color 0.3s;
    }

    .copy-button:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
</style>