<template>
<aside class="sidebar">
    <router-link to="/dashboard/panel"><Button title="Dashboard" icon-position="right">
            <dashboard-icon size="14px" /></Button></router-link>
    <router-link to="/"><Button title="Logout" icon-position="right">
            <logout-icon size="14px" /></Button></router-link>
</aside>
</template>

<script>
import Button from '@/components/Button.vue'
export default {
    name: "Sidebar",
    components: {
        Button,
    }
};
</script>

<style lang="scss" scoped>
.sidebar {
    width: 200px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $truckoo-blue-100;

    a:link {
        width: 80%;

        &:first-of-type {
            margin-top: 100px;
        }

        .button {
            margin-bottom: 10px;
            height: 40px;
            width: 100%;
        }
    }
}
</style>
