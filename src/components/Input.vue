<template>
<input class="input" :type="type ? type : 'text'" :value="value" :placeholder="placeholder" @input="$emit('input', $event.target.value)" autocomplete="off" />
</template>

<script>
export default {
    name: "Input",
    props: {
        placeholder: String,
        type: String,
        value: String
    },
};
</script>

<style lang="scss" scoped>
.input {
    text-align: center;
    padding: 4px 4px;
    border-radius: 5px;
    border: 1px solid $truckoo-blue-20;

    &:focus {
        outline: 0;
        border: 1px solid $truckoo-blue-80;
    }
}
</style>
