<template>
<div class="city-filter">
    <div @click="toggleFilterList" class="filter-name">{{ filterName }} <div :class="{ 'dropdown-rotate' : isFilterList }" class="dropdown"><span class="dropdown-down"></span></div></div>
    <div class="filter-list">
        <div v-show="isFilterList" class="scroll-hidden">
            <a @click.prevent="getPostsCity" v-for="(city, index) in cities" :key="index" class="filter-item" href="#" :data-city="city.name">{{ city.name }}</a>
        </div>
    </div>
</div>
</template>
<script>
import getPostsCity from '../api/getPostsCity.js';

export default {
    name: 'TheCitiesFilter',
    data(){
        return {
            isFilterList: false,
            currentFilter: 'All cities',
            cities: [
                {
                    name: 'All cities'
                },
                {
                    name: 'Warszawa'
                },
                {
                    name: 'Poznań'
                },
                {
                    name: 'Kraków'
                },
                {
                    name: 'Łódź'
                },
                {
                    name: 'Wrocław'
                },
                {
                    name: 'Gdańsk'
                },
                {
                    name: 'Szczecin'
                },
                {
                    name: 'Bydgoszcz'
                }
            ]
        }
    },
    computed: {
        filterName(){
            return this.currentFilter;
        }
    },
    methods: {
        toggleFilterList(){
            this.isFilterList = !this.isFilterList;
        },
        changeNameFilter(nameFilter){
            this.currentFilter = nameFilter;
        },
        async getPostsCity(e){
            try {
                this.$store.commit('updateSplashscreen', true)

                const body = await getPostsCity({ city: e.currentTarget.getAttribute('data-city')})
                const result = await body.json();

                this.$store.commit('getPosts', result)
                
                this.changeNameFilter(e.target.getAttribute('data-city'))
                this.toggleFilterList();
                
                if(result.length === 0 ){
                    this.$store.commit('updatePopup', { textClass: 'text-wrong', iconClass: 'icon-wrong', text: 'No offers. Please try later'})
                    this.$store.commit('updateRequest', this.$store.state.request.map(req => req.name === 'failed' ? { ...req, status: true } : { ...req, status: false }))
                }
                
                else {
                    this.$store.commit('updateRequest', this.$store.state.request.map(req => req.name === 'failed' ? { ...req, status: false } : { ...req, status: false }))
                }

                this.$store.commit('updateSplashscreen', false)

            } catch {
                this.$store.commit('updateSplashscreen', false)
                this.$store.commit('updateRequest', this.$store.state.request.map(req => req.name === 'failed' ? { ...req, status: true } : { ...req, status: false }))
            }
        }
    }
}
</script>

<style scoped>
.city-filter {
    position: relative;
    max-width: 191px;
    width: 100%;
    margin-left: 29px;
}

.filter-name {
    height: 33px;
    border-radius: 16.5px;
    border: 1px solid #b400ff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 23px;
    color: #6a6a6a;
    font-size: 13px;
    cursor: pointer;
}

.dropdown {
    position: relative;
    left: -6px;
}

.dropdown-down:before, .dropdown-down:after {
    content: '';
    width: 8px;
    height: 1px;
    background: #b400ff;
    position: absolute;
}

.dropdown-down:before {
    transform: rotate(30deg);
    left: -7px;
}

.dropdown-down:after {
    transform: rotate(-30deg);
}

.dropdown-rotate {
    transform: rotate(180deg);
}

.filter-list {
    overflow: hidden;
    position: absolute;
    width: 100%;
    margin-top: 9px;
    background: #ffffff;
    color: #6a6a6a;
    font-size: 13px;
    border-radius: 0 16.5px 16.5px 16.5px;
    box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.03);
    left: -17px;
    margin-left: 17px;
    z-index: 999;
}

.scroll-hidden {
    display: flex;
    flex-direction: column;
    padding: 19px 6px;
    overflow-y: scroll;
    position: relative;
    left: 17px;
    height: 158px;
}

.filter-item:nth-child(1n+2) {
    margin-top: 22px;
}

.filter-item {
    text-decoration: none;
    color: inherit;
}

</style>