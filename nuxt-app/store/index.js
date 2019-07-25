import Vuex from 'vuex';

const createStore = () =>
  new Vuex.Store({
    state: {
      loadedPosts: [],
      userAuthToken: null,
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

      addPost({ commit, state }, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date(),
        };

        return this.$axios
          .$post(
            `https://nuxt-blog-13-07-2019.firebaseio.com/posts.json?auth=${
              state.userAuthToken
            }`,
            createdPost,
          )
          .then(res => {
            commit('addPost', { ...createdPost, id: res.data.name });
          })
          .catch(e => console.log(e));
      },

      editPost({ commit, state }, updatedPost) {
        this.$axios
          .$put(
            `https://nuxt-blog-13-07-2019.firebaseio.com/posts/${
              updatedPost.id
            }.json?auth=${state.userAuthToken}`,
            updatedPost,
          )
          .then(data => {
            commit('editPost', updatedPost);
          })
          .catch(e => console.log(e));
      },

      authenticateUser({ commit, dispatch }, authData) {
        let authUrl =
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          process.env.fbAPIKey;
        if (!authData.isLogin) {
          authUrl =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            process.env.fbAPIKey;
        }
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .then(res => {
            commit('setToken', res.idToken);
            localStorage.setItem('token', res.idToken);
            localStorage.setItem(
              'tokenExpiration',
              new Date().getTime() + res.idToken * 1000,
            );
            dispatch('setLogoutTimer', res.expiresIn * 1000);
          })
          .catch(e => console.log(e));
      },

      authInit({ commit, dispatch }) {
        const token = localStorage.getItem('token');
        const tokenExpirationDate = localStorage.getItem('tokenExpiration');

        if (new Date().getTime() > +tokenExpirationDate || !token) return;

        dispatch('setLogoutTimer', +tokenExpirationDate - new Date().getTime());
        commit('setToken', token);
      },

      setLogoutTimer({ commit }, duration) {
        setTimeout(() => {
          commit('clearToken');
        }, duration);
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

      setToken(state, token) {
        state.userAuthToken = token;
      },

      clearToken(state) {
        state.userAuthToken = null;
      },
    },

    getters: {
      loadedPosts: state => {
        return state.loadedPosts;
      },

      loadedPostById: state => id => {
        return state.loadedPosts.find(post => post.id === id);
      },

      isAuthenticated: state => {
        return state.userAuthToken != null;
      },
    },
  });

export default createStore;
