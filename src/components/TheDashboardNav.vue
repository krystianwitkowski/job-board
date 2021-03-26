<template>
    <nav class="menu">
        <div class="wrapper">
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
    </nav>
</template>

<script>
import TheDashboardFilters from './TheDashboardFilters.vue';

export default {
    name: 'TheDashboardNav',
    components: {
        TheDashboardFilters
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
    }
}
</script>

<style scoped>
    .menu{
        height: 92px;
        background: #ffffff;
        box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.03);
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .wrapper {
        margin: 0 auto;
        max-width: 1050px;
        width: 90%;
        display: flex;
        flex-direction: row;
        align-items: center;
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