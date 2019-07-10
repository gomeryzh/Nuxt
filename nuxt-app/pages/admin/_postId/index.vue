<template>
  <div class="admin-post-page">
    <section class="update-form">
      <admin-post-form :post="loadedPost" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",

  components: {
    AdminPostForm
  },

  data() {
    return {
      loadedPost: {
        author: "Volodymyr Omelianiuk",
        title: "Some default title",
        thumbnailLink:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlPHCT_8x2OyneKPzSjjkpqqXpueI50AcbFJ3BK0co5oBLrCjSPQ",
        content: "tech content lorem"
      }
    };
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