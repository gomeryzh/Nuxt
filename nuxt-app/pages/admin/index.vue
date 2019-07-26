<template>
  <div class="admin-page">
    <section class="new-post">
      <app-button @click="$router.push('/admin/new-post');">Create Post</app-button>
      <app-button style="margin-left: 10px" @click="onLogout">Logout</app-button>
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <post-list :isAdmin="true" :posts="loadedPosts" />
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  layout: "admin",

  middleware: ["check-auth", "auth"],

  computed: {
    ...mapGetters(["loadedPosts"])
  },

  methods: {
    ...mapActions(["logout"]),

    onLogout() {
      console.log("logout");
      this.logout();
      this.$router.push("/admin/auth");
    }
  }
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>