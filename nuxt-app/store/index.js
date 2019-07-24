import Vuex from 'vuex';

const createStore = () =>
  new Vuex.Store({
    state: {
      loadedPosts: [],
    },

    actions: {
      nuxtServerInit({ commit }, context) {
        return context.app.$axios
          .get('/posts.json')
          .then(res => {
            let postsArray = [];
            for (let key in res.data) {
              postsArray.push({ ...res.data[key], id: key });
            }
            commit('setPosts', postsArray);
          })
          .catch(e => context.error(e));
      },

      setPosts({ commit }, posts) {
        commit('setPosts', posts);
      },

      addPost({ commit }, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date(),
        };

        return this.$axios
          .$post(
            'https://nuxt-blog-13-07-2019.firebaseio.com/posts.json',
            createdPost,
          )
          .then(res => {
            commit('addPost', { ...createdPost, id: res.data.name });
          })
          .catch(e => console.log(e));
      },

      editPost({ commit }, updatedPost) {
        this.$axios
          .$put(
            `https://nuxt-blog-13-07-2019.firebaseio.com/posts/${
              updatedPost.id
            }.json`,
            updatedPost,
          )
          .then(data => {
            commit('editPost', updatedPost);
          })
          .catch(e => console.log(e));
      },
    },

    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },

      addPost(state, post) {
        state.loadedPosts.push(post);
      },

      editPost(state, updatedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === updatedPost.id,
        );

        state.loadedPosts[postIndex] = updatedPost;
      },
    },

    getters: {
      loadedPosts: state => {
        return state.loadedPosts;
      },

      loadedPostById: state => id => {
        return state.loadedPosts.find(post => post.id === id);
      },
    },
  });

export default createStore;
