<template>
<div class="dashboard">

    <div class="sidebard-holder">
        <Sidebar />
    </div>
    <div v-if="dashboardVisible" class="dashboard-panel">
        <div class="header">
            <div v-if="!showFavorites"><Input placeholder="SEARCH BY TITLE, TAGS" v-model="searchInput" @keyup.enter.native="search()" /> <Button @click="search()" :disabledBtn="searchInput.length > 1 ? false : true" title="SEARCH" icon-position="left">
                    <search-icon size="14px" /></Button> &nbsp;<Button @click="search()" v-if="searchFilter.length > 1" title="RESET RESULTS" />
            </div>
            <template v-if="!showFavorites && searchFilter">searched results for "{{ searchFilter }}"</template>
            <div :style="showFavorites ? 'width: 100%' : ''">
                <Button v-if="favorites.length !== 0" @click="toggleFavorites()" title="FAVORITES" icon-position="left" :class="[showFavorites ? 'active' : '']">
                    <eye-icon size="14px" /></Button>
                <Title title="SORT" /> <Button @click="toggleSort(sortTitle)" :title="sortTitle" /></div>
        </div>
        <div class="results">
            <template v-if="cardsData.length > 1">
                <template v-for="(item, index) in cardsData">
                    <template v-if="!showFavorites && searchFilter.length > 1 && (item.tags.includes(searchFilter) || item.title.includes(searchFilter.toUpperCase()))">
                        <Card :key="index" :imageSrc="item.vehicle_picture_front" :offerName="item.title" :offerDetailsId="'#' + item.uid" :offerDetailsLocation="item.location" :offerAskPrice="'ASK PRICE ' + item.askPrice + '€'" :offerBidPrice="'HIGHEST OFFER ' + item.highestBidEver + '€'" @click="toggleFavorite(item.uid)" :class="[favorites.includes(item.uid) ? 'favorite' : '']">
                            <Title v-for="(tag, i) in item.tags" :key="i" :title="tag">
                                <tag-icon size="12px" />
                            </Title>
                        </Card>
                    </template>

                    <template v-if="!showFavorites && searchFilter.length <=1">
                        <Card :key="index" :imageSrc="item.vehicle_picture_front" :offerName="item.title" :offerDetailsId="'#' + item.uid" :offerDetailsLocation="item.location" :offerAskPrice="'ASK PRICE ' + item.askPrice + '€'" :offerBidPrice="'HIGHEST OFFER ' + item.highestBidEver + '€'" @click="toggleFavorite(item.uid)" :class="[favorites.includes(item.uid) ? 'favorite' : '']">
                            <Title v-for="(tag, i) in item.tags" :key="i" :title="tag">
                                <tag-icon size="12px" />
                            </Title>
                        </Card>
                    </template>

                    <template v-if="showFavorites && favorites.includes(item.uid)">
                        <Card :key="index" :imageSrc="item.vehicle_picture_front" :offerName="item.title" :offerDetailsId="'#' + item.uid" :offerDetailsLocation="item.location" :offerAskPrice="'ASK PRICE ' + item.askPrice + '€'" :offerBidPrice="'HIGHEST OFFER ' + item.highestBidEver + '€'" @click="toggleFavorite(item.uid)" :class="[favorites.includes(item.uid) ? 'favorite' : '']">
                            <Title v-for="(tag, i) in item.tags" :key="i" :title="tag">
                                <tag-icon size="12px" />
                            </Title>
                        </Card>
                    </template>
                </template>
            </template>
            <template v-if="noInternet">
                <div class="error">
                    <alert-triangle-icon size="64px" /> <span>problem getting the data</span> <Button title="retry" @click="getData()" /></div>
            </template>
        </div>
    </div>
</div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import Title from '@/components/Title.vue'
import Card from '@/components/Card.vue'

export default {
    data: () => {
        return {
            dashboardVisible: false,
            sortTitle: 'PUBLISHING DATE',
            noInternet: false,
            showFavorites: false,
            cardsData: [],
            favorites: [],
            favoritesData: [],
            searchInput: '',
            searchFilter: '',
            jwtToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0ZGVhbGVyQHRydWNrb28uY29tIiwiZXhwIjoxNjI1MjQwODUzLCJpYXQiOjE2MjUyNDA4NTMsImNsYWltcyI6WyJkZWFsZXIiLCJ3b3Jrc2hvcCJdfQ.d_Z7SRCNC8JEooXxy9JRTuWLf8forlAxxN-OLuPlb_B6LotQdQhisb4LrI3eUxduHtAxXEy4HiwqFYD3Gnva2-lOVO9SU461Fm4BamGAuaz2V-VHQtsDXHQn2CsKiFv2lcIM3E9DQO9eUAZj-45zaUSbBbyaxf03wRsIdnwudHkHUHz7wDtuViI58mB40sOBEZxWnKIZ-WhINahTS54dyvYd1QUjFxGM_XwMTm31SfDbdOBfeticdYXTy_KGg9DH5N_VbgHgQT-aQvVMZMmz-WlqyfvrE8STEzw0LDs9i2p9-tIAkUVrcmGK-cDJmqaiuuMirrHo407Pr6DIUr4pjA'
        }
    },
    components: {
        Sidebar,
        Input,
        Button,
        Title,
        Card
    },

    mounted() {
        if (this.$route.path === '/dashboard/panel') {
            this.$router.push('/dashboard');
        }
    },
    destroyed() {
        this.dashboardVisible = false;
        this.favorites = [];
    },
    watch: {
        '$route'(to) {
            if (to.path === '/dashboard/panel') {
                this.dashboardVisible = true;
                this.getData();
            } else {
                this.dashboardVisible = false;
            }
        }
    },
    methods: {
        toggleSort(value) {
            if (value === 'PUBLISHING DATE') {
                this.sortTitle = "HIGHEST BID";
            } else {
                this.sortTitle = "PUBLISHING DATE";
            }

            // not implemented sort based on 2 requested criterias
        },

        getData() {
            this.checkInternet();
            this.axios.get('https://offer-service-sh3jxse7bq-ew.a.run.app/rest/v1/offers', {
                    headers: {
                        Authorization: `Bearer ${this.jwtToken}`
                    }
                })
                .then(response => this.cardsData = response.data)
                .catch(function (error) {
                    console.log(error);
                });
        },

        // not implemented for retrieving the favorite cards
        getFavorites() {
            this.checkInternet();
            this.axios.get('https://crm-service-sh3jxse7bq-ew.a.run.app/rest/v1/contacts/favorites/get', {
                    headers: {
                        Authorization: `Bearer ${this.jwtToken}`
                    }
                })
                .then(response => this.favoritesData = response.data)
                .catch(function (error) {
                    console.log(error);
                });
        },

        // not implemented for adding the favorite cards
        addFavorites() {
            this.checkInternet();
            this.axios.put('https://crm-service-sh3jxse7bq-ew.a.run.app/rest/v1/contacts/favorites/add', {
                    data: {
                        offerID: 'd1499b1fae'
                    },
                    headers: {
                        ContentType: 'application/json',
                        Authorization: `Bearer ${this.jwtToken}`
                    },
                })
                .then(res => {
                    console.log(res.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        // not implemented for removing the favorite cards
        removeFavorites() {
            this.checkInternet();
            this.axios.put('https://crm-service-sh3jxse7bq-ew.a.run.app/rest/v1/contacts/favorites/remove', {
                    data: {
                        offerID: 'd1499b1fae'
                    },
                    headers: {
                        ContentType: 'application/json',
                        Authorization: `Bearer ${this.jwtToken}`
                    },
                })
                .then(res => {
                    console.log(res.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        toggleFavorite(value) {
            if (!this.favorites.includes(value)) {
                this.favorites.push(value);
            } else {
                const index = this.favorites.indexOf(value);
                if (index > -1) {
                    this.favorites.splice(index, 1);
                }
            }
        },

        toggleFavorites() {
            this.showFavorites = !this.showFavorites;

            // not implemented axios get and put for showing favorites based on call retrieve
        },

        search() {
            this.searchFilter = this.searchInput;
            this.searchInput = '';
        },

        checkInternet() {
            if (!navigator.onLine) {
                this.noInternet = true;
            } else {
                this.noInternet = false;
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.dashboard {
    display: flex;
    width: 100%;
    height: 100vh;
    border: 1px solid;

    .dashboard-panel {
        margin: 20px;
        width: 100%;

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 40px;

            .title {
                margin: 0 0 0 20px;
            }

            .input {
                width: 200px;
            }

            .title,
            .input {
                margin-right: 20px;
            }

            .button {
                padding: 4px 20px;
                justify-content: center;
                font-weight: bold;
            }

            >div {
                display: flex;
                align-items: center;

                svg {
                    stroke-width: 4px;
                }

                &:last-of-type {
                    justify-content: flex-end;
                }
            }
        }

        .results {
            display: flex;
            flex-wrap: wrap;
            margin: 24px 0;
            overflow-y: auto;
            height: calc(100% - 120px);

            &:empty:before {
                content: 'no results found';
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: $error;
            }

            .error {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                height: 100%;
                width: 100%;
                color: $error;

                .button {
                    padding: 4px 8px;
                    font-weight: bold;
                    margin-top: 14px;

                    &:hover {
                        background-color: $truckoo-yellow;
                    }
                }
            }

            .card {
                margin-right: 10px;
                margin-bottom: 16px;
            }
        }
    }
}
</style>
