import Vuex from 'vuex';
import Cookie from 'js-cookie';

const createStore = () =>
  new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null,
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
              state.token
            }`,
            createdPost,
          )
          .then(res => {
            commit('addPost', { ...createdPost, id: res.name });
          })
          .catch(e => console.log(e));
      },

      editPost({ commit, state }, updatedPost) {
        this.$axios
          .$put(
            `https://nuxt-blog-13-07-2019.firebaseio.com/posts/${
              updatedPost.id
            }.json?auth=${state.token}`,
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
              'expirationDate',
              new Date().getTime() + Number.parseInt(res.expiresIn) * 1000,
            );
            Cookie.set('token', res.idToken);
            Cookie.set(
              'expirationDate',
              new Date().getTime() + Number.parseInt(res.expiresIn) * 1000,
            );
            return this.$axios.$post('http://localhost:3000/api/track-data', {
              data: 'Authenticated!',
            });
          })
          .catch(e => console.log(e));
      },

      authInit({ commit, dispatch }, req) {
        let token, expirationDate;

        if (req) {
          if (!req.headers.cookie) return;

          const tokenCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('userToken='));

          if (!tokenCookie) return;

          token = tokenCookie.split('=')[1];
          expirationDate = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split('=')[1];
        } else if (process.client) {
          token = localStorage.getItem('token');
          expirationDate = localStorage.getItem('expirationDate');
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log('no token or invalid token');
          dispatch('logout');
          return;
        }
        commit('setToken', token);
      },

      logout({ commit }) {
        commit('clearToken');
        Cookie.remove('token');
        Cookie.remove('expirationDate');
        if (process.client) {
          localStorage.removeItem('token');
          localStorage.removeItem('expirationDate');
        }
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
        state.token = token;
      },

      clearToken(state) {
        state.token = null;
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
        return state.token != null;
      },
    },
  });

export default createStore;
