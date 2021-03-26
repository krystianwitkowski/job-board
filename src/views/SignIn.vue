<template>
    <section class="singin">
        <div class="wrapper">
            <TheSignInNav />
            <TheSignInForm />
        </div>
    </section>
</template>

<script>

import TheSignInForm from '../components/TheSignInForm.vue';
import TheSignInNav from '../components/TheSignInNav.vue';

export default {
    name: 'SignIn',
    components: {
        TheSignInNav,
        TheSignInForm
    }
}
</script>
