<template>
<div class="card">
    <div @click="$emit('click', $event)" class="card__image">
        <img :src="imageSrc" />
    </div>
    <div class="card__offer-description">
        <div class="card__offer-description--name">
            <Title :title="offerName" />
        </div>
        <div class="card__offer-description--tags">
            <slot></slot>
        </div>
        <div class="card__offer-description--details">
            <Title :title="offerDetailsId" />
            <Title :title="offerDetailsLocation" />
        </div>
    </div>
    <div class="card__offer-ask-price">
        <Title :title="offerAskPrice" />
    </div>
    <div class="card__heighest-offer">
        <Title :title="offerBidPrice" />
    </div>
</div>
</template>

<script>
import Title from './Title.vue';
export default {
    components: {
        Title
    },
    name: "Card",
    props: {
        imageSrc: String,
        offerName: String,
        offerDetailsId: String,
        offerDetailsLocation: String,
        offerAskPrice: String,
        offerBidPrice: String
    },
};
</script>

<style lang="scss" scoped>
.card {
    width: 250px;
    max-height: 470px;
    border: 1px solid $truckoo-blue-80;
    border-radius: 5px;
    background-color: $truckoo-blue-10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &.favorite {
        &:hover .card__image {
            &:before {
                color: $truckoo-yellow;
                background-color: $truckoo-blue-60;
            }
        }
    }

    &:hover .card__image {

        position: relative;

        &:before {
            content: '★';
            position: absolute;
            top: 0;
            right: 0;
            width: 40px;
            height: 44px;
            font-size: 30px;
            color: $truckoo-dark-blue;
            z-index: 2;
            cursor: pointer;
            border: 1px dashed $truckoo-dark-blue;
            border-top-right-radius: 5px;
            background-color: $truckoo-blue-20;
        }

        img {
            opacity: 0.5;
            z-index: 1;
        }
    }

    &__image {
        width: 100%;
        height: 200px;
        overflow: hidden;
        border-bottom: 1px solid $truckoo-blue-40;

        img {
            width: 250px;
            height: auto;
            max-height: 200px;
            transition: opacity 0.3s ease-in;
        }
    }

    .title {
        margin: 0;
        text-align: left;
        padding: 2px 10px;
        background-color: $truckoo-blue-40;
    }

    &__offer-description {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 16px 16px 8px 16px;

        &--name {
            margin-bottom: 10px;

            .title {
                text-transform: uppercase;
            }
        }

        &--tags {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;

            .title {
                margin-right: 10px;
                margin-bottom: 2px;
                font-size: 12px;
            }
        }

        &--details {
            display: flex;
            justify-content: space-between;

            .title {
                font-size: 12px;
            }
        }
    }

    &__offer-ask-price {
        margin-bottom: 2px;
    }

    &__offer-ask-price,
    &__heighest-offer {
        .title {
            background-color: $truckoo-blue-60;
            font-size: 13px;
        }
    }
}
</style>
