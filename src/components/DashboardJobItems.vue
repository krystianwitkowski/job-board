<template>
  <div class="wrapper">
    <div class="content">
      <TheDashboardJobFilters />
      <div class="jobs-wrapper">
        <div class="scroll-hidden">
        <transition name="fade">
          <div v-show="splashscreen" class="splashscreen">
            <div class="dots">
              <span class="dots-item dot-item-1"></span>
              <span class="dots-item dot-item-2"></span>
              <span class="dots-item dot-item-3"></span>
            </div>
          </div>
        </transition>
          <article @click="getMore" v-for="(post, index) in posts" :key="index" class="job-item" :id="post.id">
              <header class="job-item-header">
                  <h3 class="job-item-header__title">{{ post.job }}</h3>
                  <p class="job-item-salary">{{ post.minSalary }} - {{ post.maxSalary }} {{ post.currency.find(post => post.active).name }}</p>
              </header>
              <p class="job-info"><span class="company">{{ post.company }}</span><span class="place">{{ post.location }}</span></p>
              <div class="job-stack"><p class="job-tags"><span v-for="(tag, index) in post.tags" :key="index" class="tag">{{ tag.fullName }}</span></p><p class="work-time"><span v-for="(workplace, index) in post.workPlace.filter(work => work.active)" :key="index" class="work-time-item">{{ workplace.name }}</span></p></div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TheDashboardJobFilters from "./TheDashboardJobFilters.vue";
import getPosts from '../api/getPosts.js';

export default {
  name: "DashboardJobItems",
  components: {
    TheDashboardJobFilters,
  },
  computed: {
    splashscreen(){
      return this.$store.state.splashscreen;
    },
    posts(){
      return this.$store.state.posts;
    }
  },
  methods: {
    getMore(e){
      return this.$store.commit('updateArticleId', e.currentTarget.getAttribute('id'))
    },
    async fetchPosts(){
      try {
        this.$store.commit('updateSplashscreen', true)

        const result = await getPosts();
        this.$store.commit('getPosts', result)

        this.$store.commit('updateSplashscreen', false)
      } catch {
        console.log('Something went wrong');
      }
    }
  },
  mounted(){
    this.fetchPosts()
  }
};
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  max-width: 1050px;
  width: 90%;
}

.content {
  max-width: 635px;
  width: 100%;
  padding-top: 52px;
  height: calc(100vh - 92px);
  overflow: hidden;
}

.scroll-hidden {
  position: relative;
  left: 17px;
  height: calc(100% - 63px);
  overflow-y: scroll;
  border-radius: 10px 0 0 0;
}

.jobs-wrapper{
  height: 100%;
  position: relative;
  left: -17px;
  overflow: hidden;
  border-radius: 0 10px 0 0;
}

.job-item {
    background: #ffffff;
    height: 140px;
    padding: 23px 29px;
    border-radius: 10px; 
    box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.03); 
    cursor: pointer;
}

.job-item:nth-child(1n+2){
  margin-top: 10px;
}

.job-item-header__title {
    font-size: 16px;
    color: #6a6a6a;
}

.job-item-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.job-item-salary {
  color: #87ffa6;
}

.job-info {
  font-size: 14px;
  color: #d2d2d2;
  margin-top: 15px;
}

.company::before, .place::before {
  font-size: 12px;
  font-family: 'Font Awesome 5 Free';
  margin-right: 8px;
}

.place {
  margin-left: 27px;
}

.company::before {
  content: '\f1ad';
}

.place::before {
  content: '\f3c5';
  font-weight: 900;
}

.job-stack {
  font-weight: 300;
  color: #ffffff;
  font-size: 12px;
}

.html5 {
  text-transform: uppercase;
}


.job-stack {
  margin-top: 23px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.tag, .work-time-item {
  background: #91b8ff;
  height: 21px;
  border-radius: 10.5px;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.work-time-item:nth-child(1n+2) {
  margin-left: 5px;
}

.tag:nth-child(1n+2){
  margin-left: 16px;
}

.splashscreen {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.dots {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  width: max-content;
  position: relative;
  top: 112px;
}

.dots-item {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #91b8ff;
  display: block;
}

.dots-item:nth-child(2){
  margin: 0 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>
