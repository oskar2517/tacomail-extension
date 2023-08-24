<script>
    export let url;
    export let text;
</script>

<a class="url" href={url} target="_blank">{text}</a>

<style>
    .url:visited,
    .url {
        color: #dbdde0a9;
        text-decoration: none;
        font-size: 12px;
    }

    .url:hover {
        text-decoration: underline;
    }
</style>