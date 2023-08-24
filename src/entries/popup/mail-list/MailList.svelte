<script>
    import { afterUpdate } from "svelte";
    import { fade } from "svelte/transition";
    import { flip } from "svelte/animate";
    import Placeholder from "./Placeholder.svelte";
    import MailEntry from "./MailEntry.svelte";
    import MailDetails from "./MailDetails.svelte";

    export let mails;

    afterUpdate(() => {
        if (mails.length === 0) {
            currentMail = null;
        }
    });

    let currentMail = null;
    let seenMails = [];

    function handleShowMail(e) {
        currentMail = e.detail;
        seenMails.push(e.detail.id);
    }

    function handleShowList(e) {
        currentMail = null;
    }
</script>

<div class="mail-list">
    {#if mails.length === 0}
        <Placeholder />
    {:else if currentMail !== null}
        <MailDetails on:showList={handleShowList} mail={currentMail} on:removeMail />
    {:else}
        {#each mails as m, i (m)}
            <div animate:flip in:fade={{ duration: 300 }}>
                <MailEntry on:showMail={handleShowMail} mail={m} unseen={!seenMails.includes(m.id)} />
            </div>
        {/each}
    {/if}
</div>

<style>
    .mail-list {
        height: 300px;
        overflow-y: auto;
        resize: vertical;
        position: relative;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        min-height: 200px;
    }
</style>
