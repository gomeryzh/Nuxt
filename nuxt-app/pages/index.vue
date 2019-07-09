<template>
  <div class="home-page">
    <section class="intro">
      <h1>The latest Tech News!</h1>
    </section>
    <section class="featured-posts">
      <post-preview
        id="1"
        title="Post #1"
        previewText="Some default interesting text"
        thumbnail="https://etimg.etb2bimg.com/photo/67936954.cms"
      />
      <post-preview
        id="2"
        title="Post #2"
        previewText="Some interesting text for second post"
        thumbnail="https://www.livingroomconversations.org/wp-content/uploads/2018/09/digital-ecosystem_Tavola-disegno-1.jpg"
      />
      <post-preview
        id="3"
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
  }
};
</script>

<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url("~assets/images/main-background-image.jpg");
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
