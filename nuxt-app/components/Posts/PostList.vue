<template>
  <div>
    <section class="posts-list">
      <post-preview
        id="1"
        :is-admin="isAdmin"
        title="Post #1"
        previewText="Some default interesting text"
        thumbnail="https://etimg.etb2bimg.com/photo/67936954.cms"
      />
      <post-preview
        id="2"
        :is-admin="isAdmin"
        title="Post #2"
        previewText="Some interesting text for second post"
        thumbnail="https://www.livingroomconversations.org/wp-content/uploads/2018/09/digital-ecosystem_Tavola-disegno-1.jpg"
      />
      <post-preview
        id="3"
        :is-admin="isAdmin"
        title="Post #3"
        previewText="Some interesting text for third post"
        thumbnail="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJweQugkJwb6RR8vpuWs_8SMdISooxbAEUj0Y1dk4W0ESf6gjK"
      />
    </section>
  </div>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview.vue";

export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.posts-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>