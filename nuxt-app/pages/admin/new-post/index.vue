<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <admin-post-form @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",

  middleware: ["check-auth", "auth"],

  components: {
    AdminPostForm
  },

  methods: {
    ...mapActions(["addPost"]),

    onSubmit(postData) {
      this.addPost(postData).then(() => this.$router.push("/admin"));
    }
  }
};
</script>

<style scoped>
.admin-new-post-page {
  width: 280px;
  margin: auto;
  padding: 20px 20px;
}
@media (min-width: 768px) {
  .admin-new-post-page {
    width: 500px;
  }
}
</style>