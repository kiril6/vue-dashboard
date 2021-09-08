<template>
<span class="title">
    <slot />{{title}}</span>
</template>

<script>
export default {
    name: "Title",
    props: {
        title: String,
    },
};
</script>

<style lang="scss" scoped>
.title {
    margin: 4px 0 16px 0;
    display: block;
    font-weight: bold;
}
</style>
