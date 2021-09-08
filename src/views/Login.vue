<template>
<div class="login">
    <Title heading="h1" title="Login to Truckoo Dashboard" />
    <Input placeholder="username or email" v-model="username" />
    <Input placeholder="password" type="password" v-model="password" />
    <small v-text="error" class="error"></small>
    <Button @click="login()" title="login" icon-position="left">
        <login-icon size="14px" /></Button>
</div>
</template>

<script>
import Title from "@/components/Title.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";

export default {
    data: () => {
        return {
            username: '',
            password: '',
            error: ''
        }
    },
    components: {
        Title,
        Input,
        Button
    },

    methods: {
        login() {
            if (this.username && this.password) {
                this.$router.push('/dashboard');
            } else {
                this.error = 'fill the fields in order to login';
            }
        }
    }
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

    .error {
        color: $error;
    }
}
</style>
