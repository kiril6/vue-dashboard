<template>
<span class="title">{{title}}</span>
</template>

<script>
export default {
    name: "Title",
    props: {
        heading: {
            type: String,
            default: 'h1',
            required: true
        },
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
