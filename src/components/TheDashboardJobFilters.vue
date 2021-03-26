<template>
    <div class="filters">
        <div class="search">
            <label class="label-search">
                <span @click="getSearch" class="search-icon"></span>
                <input @keyup.enter="getSearch" v-model="search" class="input-search" type="text" placeholder="Job">
            </label>
        </div>
    </div>
</template>

<script>
import getPostsSearch from '../api/getPostsSearch.js';

export default {
    name: 'TheDashboardJobFilters',
    data(){
        return {
            search: ''
        }
    },
    methods: {
        async getSearch(){
            try {
                this.$store.commit('updateSplashscreen', true)
                const result = await getPostsSearch({ search: this.search })
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

.filters {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30px;
}

.search {
    margin-left: 15px;
}

.search-icon::before {
    content: '\f002';
    font-family: 'Font Awesome 5 Free';
    font-weight: 600;
    position: absolute;
    right: 21px;
    top: 50%;
    transform: translateY(-50%);
    color: #dad9d9;
    font-size: 13px;
    bottom: 1px;
    cursor: pointer;
}

.input-search {
    outline: 0;
    border: none;
    width: 191px;
    height: 33px;
    border-radius: 16.5px;
    background: #ffffff;
    box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.03);
    font-family: inherit;
    color: #dad9d9;
    padding-left: 23px;
    padding-right: 45px;
    font-weight: 500;
    font-size: 13px;
    padding-bottom: 2px;
}

.label-search {
    position: relative;
}

::placeholder{
color: #dad9d9;
}

</style>
