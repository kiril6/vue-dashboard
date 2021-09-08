<template>
<button @click="$emit('click', $event)" :disabled="disabledBtn" class="button"><span :class="iconPosition">{{title}}</span>
    <slot />
</button>
</template>

<script>
export default {
    name: "Button",
    props: {
        title: String,
        iconPosition: String,
        disabledBtn: {
            type: Boolean,
            default: false
        }
    },
};
</script>

<style lang="scss" scoped>
.button {
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid;
    padding: 2px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $truckoo-blue-80;
    color: $truckoo-blue-20;

    &:disabled {
        background-color: $truckoo-blue-10;
        pointer-events: none;
    }

    &:hover {
        background-color: $truckoo-blue-40;
        color: $truckoo-blue-100;
    }

    &.active {
        background-color: $truckoo-yellow;
        color: $truckoo-dark-blue;
    }

    span {
        &.right {
            order: 0;
            padding-right: 4px;
        }

        &.left {
            order: 1;
            padding-left: 4px;
        }
    }
}
</style>
