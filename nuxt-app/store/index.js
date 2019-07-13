import Vuex from 'vuex';

const createStore = () =>
  new Vuex.Store({
    state: {
      loadedPosts: [],
    },

    actions: {
      nuxtServerInit({ commit }, context) {
        return new Promise((res, rej) => {
          setTimeout(() => {
            commit('setPosts', [
              {
                id: '1',
                title: 'Post #1',
                previewText: 'Some default interesting text',
                thumbnail: 'https://etimg.etb2bimg.com/photo/67936954.cms',
              },
              {
                id: '2',
                title: 'Post #2',
                previewText: 'Some interesting text for second post',
                thumbnail:
                  'https://www.livingroomconversations.org/wp-content/uploads/2018/09/digital-ecosystem_Tavola-disegno-1.jpg',
              },
              {
                id: '3',
                title: 'Post #3',
                previewText: 'Some default third text',
                thumbnail:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJweQugkJwb6RR8vpuWs_8SMdISooxbAEUj0Y1dk4W0ESf6gjK',
              },
            ]);
            res();
          }, 1000);
        });
      },
      setPosts({ commit }, posts) {
        commit('setPosts', posts);
      },
    },

    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
    },

    getters: {
      loadedPosts: state => {
        return state.loadedPosts;
      },
    },
  });

export default createStore;
