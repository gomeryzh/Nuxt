<template>
  <div class="admin-post-page">
    <section class="update-form">
      <admin-post-form :post="loadedPost" @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",

  components: {
    AdminPostForm
  },

  // data() {
  //   return {
  //     loadedPost: {}
  //   };
  // },

  // asyncData(context) {
  //   axios
  //     .get(
  //       `https://nuxt-blog-13-07-2019.firebaseio.com/posts/${
  //         context.params.postId
  //       }.json`
  //     )
  //     .then(res => {
  //       console.log(res.data);
  //       return {
  //         loadedPost: res.data
  //       };
  //     })
  //     .catch(e => context.error(e));
  // },

  computed: {
    loadedPost() {
      return this.$store.getters.loadedPostById(this.$route.params.postId);
    }
  },

  methods: {
    ...mapActions(["editPost"]),

    onSubmit(editedPost) {
      const updatedPost = {
        ...editedPost,
        id: this.$route.params.postId
      };

      this.editPost(updatedPost).then(() => {
        this.$router.push("/admin");
      });
    }
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>