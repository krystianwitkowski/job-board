import { createStore } from "vuex";

export default createStore({
  state: {
    createPost: false,
    posts: [],
    filter: null,
    articleId: null,
    splashscreen: false
  },
  mutations: {
    getPosts(state, payload){
      return state.posts = payload
    },
    updatePostsFilter(state, payload){
      return state.filter = payload === 'all' ? null : payload
    },
    updateArticleId(state, payload){
      return state.articleId = payload
    },
    updateSplashscreen(state, payload){
      return state.splashscreen = payload
    },
    updateCreatePost(state, payload){
      return state.createPost = payload
    }
  },
  actions: {},
  modules: {}
});
