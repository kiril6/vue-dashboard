<template>
<div class="dashboard">

    <div class="sidebard-holder">
        <Sidebar />
    </div>
    <div class="dashboard-panel">

        <div class="header">
            <Input placeholder="SEARCH FIELD" /> <Button title="SEARCH" />
            <Title title="SORT" /> <Button title="PUBLISHING DATE" />
        </div>
        <div class="results">

        </div>

    </div>

</div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import Title from '@/components/Title.vue'

export default {
    components: {
        Sidebar,
        Input,
        Button,
        Title
    },
};
</script>

<style lang="scss" scoped>
.dashboard {
    display: flex;
    width: 100%;
    height: 100vh;
    border: 1px solid;

    .sidebar-holder {}

    .dashboard-panel {
        margin: 20px;
        width: 100%;

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 40px;

            .title {
                margin: 0;
            }

            .button {
                max-width: 170px;
                justify-content: center;
            }
        }

        .results {
            display: flex;
            flex-wrap: wrap;
        }
    }
}
</style>
