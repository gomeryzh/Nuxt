<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <admin-post-form />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",

  components: {
    AdminPostForm
  }
};
</script>

<style scoped>
</style>