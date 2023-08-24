<script>
    import logo from "~/assets/taco.png";

    const imageUrl = new URL(logo, import.meta.url).href;
</script>

<img src={imageUrl} alt="waiting" class="spinner" />

<style>
    .spinner {
        height: 80px;
        animation: ease-in-out fly 2.5s infinite;
        filter: drop-shadow(0px 0px 4px rgb(34 36 43 / 30%));
        margin-bottom: 5px;
    }

    @keyframes fly {
        0% {
            transform: translateY(10px);
        }

        50% {
            transform: translateY(-10px);
        }

        100% {
            transform: translateY(10px);
        }
    }
</style>
