<script>
    import equal from "deep-equal";
    import { onMount } from "svelte";
    import { deleteInbox, getDomains, getInbox, getRandomUsername } from "./api/api";
    import ControlButtonRow from "./control-buttons/ControlButtonRow.svelte";
    import Header from "./header/Header.svelte";
    import MailList from "./mail-list/MailList.svelte";

    function getBrowser() {
        if (typeof browser === "undefined") {
            return chrome;
        }

        return browser;
    }

    Array.prototype.sample = function () {
        return this[Math.floor(Math.random() * this.length)];
    };

    let mails = [];

    let selectedDomain = null;
    let selectedUsername = null;
    let availableDomains = [];

    $: (async () => {
        if (selectedDomain !== null && selectedUsername !== null) {
            await getBrowser().storage.session.set({ selectedDomain, selectedUsername });
        }
    })();

    async function loadSelectedDomain() {
        return (await getBrowser().storage.session.get({ selectedDomain: availableDomains.sample() })).selectedDomain;
    }

    async function loadSelectedUsername() {
        return (await getBrowser().storage.session.get({ selectedUsername: (await getRandomUsername()).username })).selectedUsername;
    }

    async function fetchMails() {
        const result = await getInbox(getSelectedAddress());

        if (!equal(result, mails)) {
            mails = result;
        }
    }

    onMount(async () => {
        availableDomains = await getDomains();
        selectedDomain = await loadSelectedDomain();
        selectedUsername = await loadSelectedUsername();

        await fetchMails();
    });

    function getSelectedAddress() {
        return `${selectedUsername}@${selectedDomain}`;
    }

    async function handleRefreshClick(e) {
        await fetchMails();
    }

    async function handleInboxDeleteClick(e) {
        await deleteInbox(getSelectedAddress());
        mails = [];
    }

    function handleRemoveMail(e) {
        mails = mails.filter((m) => m.id !== e.detail.id);
    }

    async function handleNewAddressClick(e) {
        mails = [];
        selectedUsername = (await getRandomUsername()).username;
        selectedDomain = availableDomains.sample();
    }
</script>

<div class="app">
    <Header bind:username={selectedUsername} bind:domain={selectedDomain} {availableDomains} />
    <ControlButtonRow on:refreshClick={handleRefreshClick} on:newAddressClick={handleNewAddressClick} on:inboxDeleteClick={handleInboxDeleteClick} />
    <MailList {mails} on:removeMail={handleRemoveMail} />
</div>

<style>
    .app {
        width: 500px;
    }
</style>
