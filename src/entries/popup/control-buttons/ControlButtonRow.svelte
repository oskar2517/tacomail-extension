<script>
    import { createEventDispatcher } from "svelte";
    import ControlButton from "./ControlButton.svelte";

    const dispatch = createEventDispatcher();

    let refreshButton;

    setInterval(() => {
        if (refreshButton) {
            refreshButton.firstChild.click();
        }
    }, 5000);
</script>

<div class="control-button-row">
    <ControlButton
        name="New address"
        description="Generate a new email address"
        icon="fa-arrow-rotate-right"
        animatable={true}
        on:click={() => dispatch("newAddressClick")}
    />
    <div bind:this={refreshButton}>
        <ControlButton
            name="Refresh"
            description="Manually reload received emails"
            icon="fa-arrows-rotate"
            animatable={true}
            on:click={() => dispatch("refreshClick")}
        />
    </div>
    <ControlButton
        name="Delete inbox"
        description="Delete all emails in this inbox"
        icon="fa-trash-can"
        animatable={false}
        on:click={() => dispatch("inboxDeleteClick")}
    />
</div>

<style>
    .control-button-row {
        background-color: #f5f5fa;
        display: flex;
        gap: 10px;
        justify-content: center;
        box-shadow: 0 2px 4px rgb(34 36 43 / 16%);
        padding: 10px 5px;
        overflow: hidden;
    }
</style>
