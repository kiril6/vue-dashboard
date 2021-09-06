<template>
<div class="login">
    <Title heading="h1" title="Login to Truckoo Dashboard" />

    <Input placeholder="username" />
    <Input placeholder="password" type="password" />
    <router-link to="/dashboard"><Button title="login" icon-position="left">
            <login-icon size="14px" /></Button></router-link>
    <!-- include components like button etc -->
</div>
</template>

<script>
import Title from "@/components/Title.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";

export default {
    name: "Login",
    components: {
        Title,
        Input,
        Button
    },
};
</script>

<style lang="scss" scoped>
.login {
    height: 200px;
    width: 400px;
    border: 2px solid $truckoo-blue-60;
    border-radius: 9%;
    background-color: $truckoo-blue-10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .title {
        margin-top: 10px;
        color: $truckoo-dark-blue;
    }

    .button {
        margin-bottom: 20px;
    }
}
</style>
