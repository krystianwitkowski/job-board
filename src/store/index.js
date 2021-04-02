import { createStore } from "vuex";

export default createStore({
  state: {
    createPost: false,
    posts: [],
    filter: null,
    articleId: null,
    splashscreen: false,
    currency: [
      {
          name: 'PLN',
          active: true
      },
      {
          name: 'USD',
          active: true
      }
    ],
    workplace: [
      {
          name: 'Remote',
          active: true
      },
      {
          name: 'Office',
          active: true
      }
    ],
    request: [
      {
        name: 'loading',
        status: false
      },
      {
        name: 'success',
        status: false
      },
      {
        name: 'failed',
        status: false
      }
    ]
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
    },
    updateCurrency(state, payload){
      return state.currency = payload
    },
    updateWorkplace(state, payload){
      return state.workplace = payload
    },
    updateRequest(state, payload){
      return state.request = payload
    }
  },
  actions: {},
  modules: {}
});
