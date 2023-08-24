<script>
    import { createEventDispatcher } from "svelte";
    import dateFormat from "dateformat";

    export let mail;
    export let unseen;

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch("showMail", mail);
    }
</script>

<button class="mail" on:click={handleClick}>
    <div class="unseen" class:visible={unseen} />
    <div class="sender">
        <div class="sender-name">{mail.from.name}</div>
        <div class="sender-address">{mail.from.address}</div>
    </div>
    <div class="subject">{mail.subject}</div>
    <div class="date">{dateFormat(Date.parse(mail.date), "h:MM:ss TT")}</div>
</button>

<style>
    .mail {
        border: none;
        text-align: left;
        font-family: inherit;
        display: grid;
        width: 100%;
        grid-template-columns: max-content minmax(15%, 30%) 1fr max-content;
        padding: 7px;
        background-color: #f5f5fa;
        font-size: 16px;
        color: #1d1d1e;
        column-gap: 15px;
        border-bottom: solid 1px rgb(34 36 43 / 16%);
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
    }

    .unseen {
        background-color: #00c099;
        height: 8px;
        width: 8px;
        border-radius: 50%;
        align-self: center;
    }

    .unseen:not(.visible) {
        opacity: 0;
    }

    .sender-address {
        color: #8B8B90;
    }

    .subject,
    .date {
        align-self: center;
    }

    .subject,
    .sender-name,
    .sender-address {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>