<script>
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import dateFormat from "dateformat";
    import sanitizeHtml from "sanitize-html";
    import { onMount } from "svelte";
    import { deleteMail, getAttachmentDownloadUrl, getRawMailUrl } from "../api/api";

    export let mail;

    let mailBodyIFrame;

    const dispatch = createEventDispatcher();

    function sanitizeHtmlWithConfig(s) {
        return sanitizeHtml(s, {
            allowedAttributes: false,
            allowedTags: [
                "a",
                "b",
                "br",
                "big",
                "blockquote",
                "caption",
                "code",
                "del",
                "div",
                "dt",
                "dd",
                "font",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "hr",
                "i",
                "img",
                "ins",
                "li",
                "map",
                "ol",
                "p",
                "pre",
                "s",
                "small",
                "strong",
                "span",
                "sub",
                "sup",
                "table",
                "tbody",
                "td",
                "tfoot",
                "th",
                "thead",
                "tr",
                "u",
                "ul",
                "html",
                "head",
                "body",
                "title",
                "style",
                "link",
            ],
        });
    }

    function handleGoBackToListClick(e) {
        dispatch("showList");
    }

    async function handleDeleteClick(e) {
        await deleteMail(mail.to.address, mail.id);
        dispatch("removeMail", mail);
        handleGoBackToListClick();
    }

    function handleViewRawClick(e) {
        window.open(getRawMailUrl(mail.to.address, mail.id), "_blank");
    }

    function hashAuthor(address) {
        const avatarCount = 16;
        const prime = 13;

        const hash = address.split("").reduce((acc, char) => {
            const charCode = char.charCodeAt(0);
            return (acc * prime + charCode) % avatarCount;
        }, 0);

        return hash;
    }

    onMount(() => {
        if (mail.body.html !== "") {
            mailBodyIFrame.contentWindow.document.write(sanitizeHtmlWithConfig(mail.body.html));
        } else {
            mailBodyIFrame.contentWindow.document.write(sanitizeHtmlWithConfig(mail.body.text));
        }

        const anchors = mailBodyIFrame.contentWindow.document.querySelectorAll("a");
        console.log(anchors);
        for (const a of anchors) {
            a.addEventListener("click", (e) => {
                a.target = "_blank";
            });
        }
    });
</script>

<div class="mail" in:fade={{ duration: 300 }}>
    <div class="action-button-row">
        <button type="button" class="action-button" on:click={handleGoBackToListClick} title="Return to the list of received emails">
            <i class="fa-solid fa-angle-left" /> Back
        </button>
        <div class="action-button-row-spacer" />
        <button type="button" class="action-button" on:click={handleDeleteClick} title="Delete this email">
            <i class="fa-solid fa-trash-can" /> Delete
        </button>
        <button type="button" class="action-button" on:click={handleViewRawClick} title="View raw API response for this email">
            <i class="fa-solid fa-code" /> View raw
        </button>
    </div>
    <div class="mail-info">
        <div class="sender">
            <img src="/authors/{hashAuthor(mail.from.address)}.png" alt="avatar" class="sender-avatar" />
            <div class="sender-name">{mail.from.name}</div>
            <div class="sender-address">{mail.from.address}</div>
        </div>

        <div class="generic-info">
            <div class="generic-info-title">Subject:</div>
            <div class="generic-info-value">{mail.subject}</div>
        </div>

        <div class="generic-info">
            <div class="generic-info-title">Date:</div>
            <div class="generic-info-value">{dateFormat(Date.parse(mail.date), "mmmm dS, yyyy, h:MM:ss TT")}</div>
        </div>

        {#if mail.attachments.length > 0}
            <div class="generic-info">
                <div class="generic-info-title">Attachments:</div>
                <div class="generic-info-value">
                    {#each mail.attachments as a}
                        <a
                            title={!a.present ? "Attachment unavailable" : null}
                            class:present={a.present}
                            class="attachment-url"
                            target="_blank"
                            href={a.present ? getAttachmentDownloadUrl(mail.to.address, mail.id, a.id) : null}
                        >
                            {a.fileName}
                        </a>
                    {/each}
                </div>
            </div>
        {/if}
    </div>

    <div class="mail-body">
        <iframe title="body" bind:this={mailBodyIFrame} />
    </div>
</div>

<style>
    .attachment-url:visited,
    .attachment-url {
        color: #1d1d1e;
    }

    .attachment-url::after {
        content: ", ";
    }

    .attachment-url:last-of-type:after {
        content: "";
    }

    .attachment-url:not(.present) {
        opacity: 0.5;
    }

    .mail-body {
        border-top: solid 1px rgb(34 36 43 / 16%);
        padding: 7px 12px;
        overflow: auto;
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .mail-body iframe {
        flex: 1;
        border: none;
    }

    .mail {
        color: #1d1d1e;
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .generic-info {
        display: flex;
        padding: 7px 0;
        border-bottom: solid 1px rgb(34 36 43 / 16%);
    }

    .generic-info:last-of-type {
        border-bottom: none;
    }

    .generic-info-title {
        color: #8b8b90;
        padding-right: 5px;
    }

    .mail-info {
        margin: 7px 12px 0 12px;
        font-size: 16px;
    }

    .sender {
        display: grid;
        grid-template-areas:
            "a b"
            "a c";
        grid-template-columns: max-content max-content;
        column-gap: 7px;
        padding: 5px 0 10px 0;
        border-bottom: solid 1px rgb(34 36 43 / 16%);
    }

    .sender-avatar {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        filter: drop-shadow(0px 0px 4px rgb(34 36 43 / 30%));
        grid-area: a;
    }

    .sender-name {
        grid-area: b;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .sender-address {
        grid-area: c;
        color: #8b8b90;
    }

    .action-button-row {
        background-color: #f5f5fa;
        padding: 5px;
        display: flex;
        border-bottom: solid 1px rgb(34 36 43 / 16%);
    }

    .action-button-row-spacer {
        flex: 1;
    }

    .action-button {
        background-color: transparent;
        font-family: "Lato", sans-serif;
        border: none;
        font-size: 16px;
        color: #1d1d1e;
        cursor: pointer;
        margin: 2px 5px;
    }

    .action-button .fa-solid {
        margin-right: 4px;
    }
</style>
