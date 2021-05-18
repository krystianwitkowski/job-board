<template>
  <div class="wrapper">
  <transition name="fetch">
    <Popup v-if="requestFailed" :position-class="true" :text-class="popup.textClass" :icon-class="popup.iconClass" :text="popup.text"/>
  </transition>
    <div class="content">
      <div class="jobs-wrapper">
        <div @scroll="paginationPosts" class="scroll-hidden">
          <transition name="fade">
            <Spinner v-show="splashscreen" />
          </transition>
          <article @click="getMore" v-for="(post, index) in posts" :key="index" class="job-item" :id="post.id">
              <header class="job-item-header">
                  <h3 class="job-item-header__title">{{ post.job }}</h3>
                  <p class="job-item-salary">{{ Number(post.minSalary).toLocaleString() }} - {{ Number(post.maxSalary).toLocaleString() }} {{ post.currency.find(post => post.active).name }}</p>
              </header>
              <p class="job-info"><span class="company">{{ post.company }}</span><span class="place">{{ post.location }}</span></p>
              <div class="job-stack"><p class="job-tags"><span v-for="(tag, index) in post.tags" :key="index" class="tag">{{ tag.fullName }}</span></p><p class="work-time"><span v-for="(workplace, index) in post.workPlace.filter(work => work.active)" :key="index" :class="workplace.class" class="work-time-item">{{ workplace.name }}</span></p></div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Popup from './Popup.vue';
import Spinner from './Spinner.vue';
import getPosts from '../api/getPosts.js';

export default {
  name: "DashboardJobItems",
  components: {
    Spinner,
    Popup
  },
  computed: {
    splashscreen(){
      return this.$store.state.splashscreen;
    },
    posts(){
      return this.$store.state.posts;
    },
    popup(){
      return this.$store.state.popup;
    },
    requestFailed(){
      return this.$store.state.request.find(req => req.name === 'failed').status;
    }
  },
  methods: {
    getMore(e){
      return this.$store.commit('updateArticleId', e.currentTarget.getAttribute('id'))
    },
    async fetchPosts(){
      try {
        this.$store.commit('updateSplashscreen', true)

        const body = await getPosts();
        const result = await body.json();

        this.$store.commit('getPosts', result)
        
        this.$store.commit('updateRequest', this.$store.state.request.map(req => req.name === 'failed' ? { ...req, status: false } : { ...req, status: false }))
        this.$store.commit('updateSplashscreen', false)
      } catch {
        this.$store.commit('updateSplashscreen', false)
        this.$store.commit('updateRequest', this.$store.state.request.map(req => req.name === 'failed' ? { ...req, status: true } : { ...req, status: false }))
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
  position: relative;
}

.content {
  max-width: 635px;
  width: 100%;
  padding-top: 25px;
  height: calc(100vh - 172px);
  overflow: hidden;
}

.scroll-hidden {
  position: relative;
  left: 17px;
  height: 100%;
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
  color: #87ff9b;
  font-size: 18px;
}

.job-info {
  font-size: 14px;
  color: #d2d2d2;
  margin-top: 13px;
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

.work-time {
  display: flex;
  flex-direction: row;
  position: relative;
  top: -21px;
}

.tag{
  background: #aecbfe;
  height: 21px;
  border-radius: 10.5px;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.work-time-item  {
  font-size: 11px;
  height: 21px;
  border-radius: 10.5px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remote {
  border: 1px solid #ff00a2;
  color: #ff00a2;
}

.office {
  color: #b400ff;
  border: 1px solid #b400ff;
}

.work-time-item:nth-child(1n+2) {
  margin-left: 7px;
}

.tag:nth-child(1n+2){
  margin-left: 16px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fetch-enter-active, .fetch-leave-active {
  transition: opacity 1.5s ease, top 1.5s ease;
}

.fetch-enter-from, .fetch-leave-to {
  opacity: 0;
  top: -50px;
}
</style>
