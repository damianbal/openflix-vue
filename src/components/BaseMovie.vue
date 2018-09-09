<template>
  <div class="col-sm-4 col-md-3 mb-4 movie-card text-center">

    <div v-if="isLiked">

      <i v-on:click="unlike()" class="fas fa-star text-yellow"></i>
    </div>

    <div v-if="!isLiked">
      <i v-on:click="like()" class="far fa-star text-yellow"></i>
    </div>

    <div class="text-center movie-title mb-1">{{ title }} ({{ genre }})</div>

    <img @click="movieClicked(id)" class="img-fluid rounded " width="256px" height="256px" :src="thumbUrl">

  </div>
</template>

<script>
import { base } from "@/config";

import storageUrl from "@/utils/LaraStorage";

export default {
  props: {
    id: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: "Title"
    },
    thumb: {
      type: String,
      default: "#"
    },
    genre: {
      type: String,
      default: "Genre"
    },
    liked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    movieClicked(id) {
      this.$router.push({ name: "play", params: { movie_id: id } });
    },
    like() {
      this.$emit("liked", this.id);
      this.isLiked = true;
    },
    unlike() {
      this.$emit("unliked", this.id);
      this.isLiked = false;
    }
  },
  mounted() {
    this.isLiked = this.liked;
  },
  computed: {
    thumbUrl: function() {
      return storageUrl(this.thumb);
    }
  },
  data: () => {
    return {
      isLiked: false
    };
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.movie-title {
  color: rgba(255, 255, 255, 0.4);
}

.movie-card {
  perspective: 500px;
}
.movie-card img {
  transition: 1s;
  /* transform: rotateX(-10deg); */
  opacity: 0.5;
}
.movie-card:hover img {
  transform: scale(1.1) rotateX(15deg);
  transition: 1s;
  opacity: 1;
}
.text-yellow {
  color: #ffed4a;
}
</style>
