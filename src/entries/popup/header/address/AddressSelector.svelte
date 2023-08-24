<script>
    import CopyButton from "./CopyButton.svelte";

    export let username;
    export let domain;
    export let availableDomains;

    async function handleAddressCopy(e) {
        await navigator.clipboard.writeText(`${username}@${domain}`);
    }

    function handleEmailPaste(e) {
        let text = (event.clipboardData || window.clipboardData).getData("text");

        if (text.includes("@")) {
            e.preventDefault();
            [username, domain] = text.split("@");
            if (!availableDomains.includes(domain)) {
                availableDomains = [domain, ...availableDomains];
            }
        }
    }
</script>

<div class="address-selector-wrapper">
    <div class="address-selector">
        <input
            on:paste={handleEmailPaste}
            type="text"
            class="username"
            placeholder="Username"
            spellcheck="false"
            bind:value={username}
        />
        <select class="domain" bind:value={domain}>
            {#each availableDomains as domain}
                <option value={domain}>@{domain}</option>
            {/each}
        </select>
    </div>

    <CopyButton on:copy={handleAddressCopy} />
</div>

<style>
    .address-selector-wrapper {
        display: flex;
        justify-content: center;
        z-index: 1000;
        gap: 5px;
    }

    .address-selector {
        display: flex;
        padding: 5px 10px;
        font-size: 16px;
        background-color: rgba(255, 255, 255, 0.103);
        border-radius: 5px;
    }

    .domain {
        background-color: transparent;
        border: none;
        color: #dbdde0;
        font-family: "Lato", sans-serif;
        font-size: inherit;
        padding: 2px 5px;
        appearance: none;
    }

    .domain option {
        color: black;
    }

    .username {
        border: none;
        background-color: transparent;
        font-family: "Lato", sans-serif;
        color: #dbdde0;
        font-size: inherit;
        padding: 2px 5px;
    }
</style>