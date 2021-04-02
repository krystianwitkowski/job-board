<template>
    <nav class="menu">
        <div class="wrapper">
            <div class="nav-wrapper">
                <ul class="menu-list">
                    <li class="menu-list-item"><router-link to="/signup" class="menu-list-link signup" href="#">Sign up</router-link></li>
                    <li class="menu-list-item"><router-link to="/signin" class="menu-list-link signin" href="#">Sign in</router-link></li>
                </ul>
                <TheDashboardFilters />
                <ul v-if="auth()" class="menu-list user">
                    <li class="menu-list-item"><a @click.prevent="getCreate" class="menu-list-link create" href="#">Create</a></li>
                    <li class="menu-list-item"><a @click.prevent="getLogout" class="menu-list-link logout" href="#">Log out</a></li>
                </ul>
            </div>
            <span class="line"></span>
            <div class="filters-nav">
                <div @click="toggleFilters" class="filter-icon"></div>
                <TheSearch />
                <TheFiltersPopup v-if="isFilters" />
            </div>
        </div>
    </nav>
</template>

<script>
import TheSearch from "./TheSearch.vue";
import TheFiltersPopup from "./TheFiltersPopup.vue";
import TheDashboardFilters from './TheDashboardFilters.vue';

export default {
    name: 'TheDashboardNav',
    components: {
        TheDashboardFilters,
        TheSearch,
        TheFiltersPopup
    },
    data(){
        return{
            isFilters: false
        }
    },
    methods: {
        auth(){
            return localStorage.getItem('tokens');
        },
        getLogout(){
            localStorage.clear();
            this.$router.push("/signin");
        },
        getCreate(){
            this.$store.commit('updateCreatePost', !this.$store.state.createPost);
        },
        toggleFilters(){
            this.isFilters = !this.isFilters
        }
    }
}
</script>

<style scoped>
    .menu{
        background: #ffffff;
        box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.03);
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding-top: 25px;
    }

    .wrapper {
        margin: 0 auto;
        max-width: 1050px;
        width: 90%;
        height: 100%;
    }

    .nav-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .line {
        content: '';
        width: 10000px;
        height: 1px;
        background-color: #f8f8f8;
        display: block;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 31px;
    }

    .filters-nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 75px;
        position: relative;
    }

    .filter-icon {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 100%;
    }

    .filter-icon:after{
        content: '';
        width: 1px;
        height: 100%;
        background: #f8f8f8;
        display: block;
        margin-left: 27px;
    }

    .filter-icon::before {
        content: '\f1de';
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
        font-size: 21px;
        color: #dad9d9;
        cursor: pointer;
    }

    .menu-list-link {
        text-decoration: none;
        color: #b400ff;
        border: 1px solid #b400ff;
        height: 33px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 21.5px;
        border-radius: 16.5px;
        padding-bottom: 2px;
        font-size: 15px;
    }

    .menu-list-item:nth-child(1n+2) .menu-list-link {
        margin-left: 20px;
    }

    .menu-list {
        display: flex;
        flex-direction: row;
    }

    .signin {
        color: #ea00ff;
        border: 1px solid #ea00ff;
    }

    .user {
        flex: 1;
        justify-content: flex-end;
    }
    
    .user .create, .user .logout{
        color: #ff00a2;
        border: 1px solid #ff00a2;
    }
</style>