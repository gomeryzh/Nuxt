<template>
  <div class="admin-page">
    <section class="new-post">
      <app-button @click="$router.push('/admin/new-post');">Create Post</app-button>
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <post-list :isAdmin="true" :posts="loadedData" />
    </section>
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";
import AppButton from "@/components/UI/AppButton";

export default {
  layout: "admin",

  components: {
    PostList,
    AppButton
  },

  data() {
    return {
      loadedData: [
        {
          id: "1",
          title: "Post #1",
          previewText: "Some default interesting text",
          thumbnail: "https://etimg.etb2bimg.com/photo/67936954.cms"
        },
        {
          id: "2",
          title: "Post #2",
          previewText: "Some interesting text for second post",
          thumbnail:
            "https://www.livingroomconversations.org/wp-content/uploads/2018/09/digital-ecosystem_Tavola-disegno-1.jpg"
        },
        {
          id: "3",
          title: "Post #3",
          previewText: "Some default third text",
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJweQugkJwb6RR8vpuWs_8SMdISooxbAEUj0Y1dk4W0ESf6gjK"
        }
      ]
    };
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