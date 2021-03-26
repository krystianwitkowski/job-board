<template>
  <section class="dashboard">
    <div class="wrapper">
      <transition name="fade">
        <PostJob v-if="createPost" />
      </transition>
      <TheDashboardNav />
      <DashboardJobPost v-if="articleId"/>
      <DashboardJobItems v-else />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import TheDashboardNav from "../components/TheDashboardNav.vue";
import DashboardJobItems from "../components/DashboardJobItems.vue";
import PostJob from "../components/PostJob.vue";
import DashboardJobPost from "../components/DashboardJobPost.vue";

export default {
  name: "Dashboard",
  components: {
    TheDashboardNav,
    DashboardJobItems,
    DashboardJobPost,
    PostJob
  },
  computed: {
    ...mapState([
      'createPost',
      'articleId'
    ])
  }
};
</script>
<style scoped>
.dashboard {
  height: 100%;
}

.wrapper {
  position: relative;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.2s ease, transform 1.2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50px);
}

</style>
