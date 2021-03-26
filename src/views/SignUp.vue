<template>
    <section class="singup">
        <div class="wrapper">
            <TheSignUpNav/>
            <TheSignUpForm/>
        </div>
    </section>
</template>

<script>

import TheSignUpForm from '../components/TheSignUpForm.vue';
import TheSignUpNav from '../components/TheSignUpNav.vue';

export default {
    name: 'SignUp',
    components: {
        TheSignUpNav,
        TheSignUpForm
    }
}
</script>

<style scoped>
    .wrapper {
        padding-bottom: 58px;
    }
</style>