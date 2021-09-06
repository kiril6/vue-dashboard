<template>
<button class="button"><span :class="iconPosition">{{title}}</span>
    <slot />
</button>
</template>

<script>
export default {
    name: "Button",
    props: {
        title: String,
        icon: String,
        iconPosition: String
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
    width: 100%;

    &:hover {
        background-color: $truckoo-blue-40;
        color: $truckoo-blue-100;
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
