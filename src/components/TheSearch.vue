<template>
    <label class="label-search">
        <span @click="getSearch" class="search-icon"></span>
        <input @keyup.enter="getSearch" v-model="search" class="input-search" type="text" placeholder="Job">
    </label>
</template>

<script>
import getPostsSearch from '../api/getPostsSearch.js';

export default {
    name: 'TheSearch',
    data(){
        return {
            search: ''
        }
    },
    methods: {
        async getSearch(){
            try {
                this.$store.commit('updateSplashscreen', true)

                const body = await getPostsSearch({ search: this.search })
                const result = await body.json();

                this.$store.commit('getPosts', result)
                
                this.$store.commit('updateRequest', this.$store.state.request.map(req => req.name === 'failed' ? { ...req, status: false } : { ...req, status: false }))
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
    background: #f9f9f9;
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
    margin-left: 28px;
}

::placeholder{
color: #dad9d9;
}

</style>
