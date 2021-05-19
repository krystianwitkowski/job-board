<template>
    <div class="popup">
        <div class="currency">
            <button @click="getCurrencyPLN" :class="{ 'active' : currencyPLN }" class="btn-currency pln">PLN</button>
            <button @click="getCurrencyUSD" :class="{ 'active' : currencyUSD }" class="btn-currency usd">USD</button>
        </div>
        <div class="workplace">
            <button @click="getWorkplaceRemote" :class="{ 'active' : workplaceRemote }" class="btn-workplace remote">Remote</button>
            <button @click="getWorkplaceOffice" :class="{ 'active' : workplaceOffice }" class="btn-workplace office">Office</button>
        </div>
    </div>
</template>

<script>
import getPostsSort from '../api/getPostsSort.js';

export default {
    name: 'TheFiltersPopup',
    computed: {
        currencyPLN(){
            return this.$store.state.currency.find(currency => currency.name === 'PLN').active
        },
        currencyUSD(){
            return this.$store.state.currency.find(currency => currency.name === 'USD').active
        },
        workplaceRemote(){
            return this.$store.state.workplace.find(workplace => workplace.name === 'Remote').active
        },
        workplaceOffice(){
            return this.$store.state.workplace.find(workplace => workplace.name === 'Office').active
        }
    },
    methods: {
        async getCurrencyPLN(){
            try {
                this.$store.commit('updateSplashscreen', true)
                this.$store.commit('updateCurrency', this.$store.state.currency.map(currency => currency.name === 'PLN' ? { ...currency, active: !currency.active } : currency ))
                
                const currency = this.$store.state.currency.filter(currency => currency.active).map(cur => cur.name).join(',')
                const workplace = this.$store.state.workplace.filter(workplace => workplace.active).map(cur => cur.name).join(',')
                
                const body = await getPostsSort({ currency, workplace });
                const result = await body.json();

                this.$store.commit('getPosts', result)

                this.$store.commit('updateRequest', this.$store.state.request.map(req => req.name === 'failed' ? { ...req, status: false } : { ...req, status: false }))
                this.$store.commit('updateSplashscreen', false)

            } catch {
                this.$store.commit('updateSplashscreen', false)
                this.$store.commit('updateRequest', this.$store.state.request.map(req => req.name === 'failed' ? { ...req, status: true } : { ...req, status: false }))
            }
        },
        async getCurrencyUSD(){
            try {
                this.$emit('toggle-filters');
                this.$store.commit('updateSplashscreen', true)
                this.$store.commit('updateCurrency', this.$store.state.currency.map(currency => currency.name === 'USD' ? { ...currency, active: !currency.active } : currency ))
                
                const currency = this.$store.state.currency.filter(currency => currency.active).map(cur => cur.name).join(',')
                const workplace = this.$store.state.workplace.filter(workplace => workplace.active).map(cur => cur.name).join(',')
                
                const body = await getPostsSort({ currency, workplace });
                const result = await body.json();

                this.$store.commit('getPosts', result)
                this.$store.commit('updateSplashscreen', false)

            } catch {
                console.log('Something went wrong');
            }
        },
        async getWorkplaceRemote(){
            try {
                this.$emit('toggle-filters');
                this.$store.commit('updateSplashscreen', true)
                this.$store.commit('updateWorkplace', this.$store.state.workplace.map(workplace => workplace.name === 'Remote' ? { ...workplace, active: !workplace.active } : workplace ))
                
                const currency = this.$store.state.currency.filter(currency => currency.active).map(cur => cur.name).join(',')
                const workplace = this.$store.state.workplace.filter(workplace => workplace.active).map(cur => cur.name).join(',')
                
                const body = await getPostsSort({ currency, workplace });
                const result = await body.json();

                this.$store.commit('getPosts', result)
                this.$store.commit('updateSplashscreen', false)

            } catch {
                console.log('Something went wrong');
            }
        },
        async getWorkplaceOffice(){
            try {
                this.$emit('toggle-filters');
                this.$store.commit('updateSplashscreen', true)
                this.$store.commit('updateWorkplace', this.$store.state.workplace.map(workplace => workplace.name === 'Office' ? { ...workplace, active: !workplace.active } : workplace ))
                
                const currency = this.$store.state.currency.filter(currency => currency.active).map(cur => cur.name).join(',')
                const workplace = this.$store.state.workplace.filter(workplace => workplace.active).map(cur => cur.name).join(',')
                
                const body = await getPostsSort({ currency, workplace });
                const result = await body.json();

                this.$store.commit('getPosts', result)
                this.$store.commit('updateSplashscreen', false)

            } catch {
                console.log('Something went wrong');
            }
        },
        async getWorkplaceAll(){
            this.$emit('toggle-filters');
            try {
                this.$store.commit('updateSplashscreen', true)
                const body = await getPostsSort();
                const result = await body.json();

                this.$store.commit('updateCurrency', this.$store.state.currency.map(currency => currency.name === 'All' ? { ...currency, active: true } : { ...currency, active: false }))
                this.$store.commit('getPosts', result)
                this.$store.commit('updateSplashscreen', false)

            } catch {
                console.log('Something went wrong');
            }
        }
    }
}
</script>

<style scoped>
    .popup {
        position: absolute;
        background: #ffffff;
        width: 314px;
        border-radius: 10.5px;
        left: 30px;
        top: 41px;
        color: #6a6a6a;
        font-size: 14px;
        padding: 20px;
        box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.03);
        z-index: 999;
        overflow: hidden;
    }

    .currency {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .currency-title {
        margin-right: 14px;
    }

    .btn-currency, .btn-workplace {
        border: none;
        border-radius: 50%;
        height: 22px;
        border-radius: 11px;
        font-size: 12px;
        color: inherit;
        font-family: inherit;
        background: none;
        border: 1px solid #ea00ff;
        padding: 0 18px;
        padding-bottom: 1px;
        outline: 0;
        cursor: pointer;
    }

    .btn-currency:nth-child(1n+2){
        margin-left: 7px;
    }

    .popup .active {
        background: #ea00ff;
        color: #ffffff;
    }

    .workplace {
        margin-top: 9px;
        position: relative;
        padding-top: 9px;
    }

    .workplace:before {
        content: '';
        width: 1000px;
        height: 1px;
        background: #f8f8f8;
        position: absolute;
        top:0;
        left: 50%;
        transform: translateX(-50%);

    }

    .btn-workplace:nth-child(1n+2){
        margin-left: 7px;
    }
</style>
