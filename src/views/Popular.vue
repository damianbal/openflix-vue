<template>
    <div>

        <h3>
            <i class="fas fa-fire"></i> Popular Movies</h3>

        <base-loading v-if="loading"></base-loading>

        <div v-else class="row">

            <base-movie v-for="(movie, idx) in movies" :key="idx" :liked="movie.liked" :id="movie.id" :genre="movie.genre" :title="movie.title" :thumb="movie.thumb" v-on:unliked="unlikedMovie" v-on:liked="likedMovie"></base-movie>
        </div>
    </div>
</template>

<script>
import movieService from "@/services/MovieService";

import Bus from "@/bus";

export default {
  async mounted() {
    this.fetch();
  },
  methods: {
    unlikedMovie(id) {
      Bus.$emit("unliked", id);
    },
    likedMovie(id) {
      Bus.$emit("liked", id);
    },
    async fetch() {
      this.loading = true;

      let resp = await movieService.getPopularMovies();

      this.loading = false;

      this.movies = resp.data;
    }
  },
  data: () => {
    return {
      movies: [],
      loading: true
    };
  },
  watch: {
    $route: function(to, from) {
      //
      this.fetch();
    }
  }
};
</script>

<style>
</style>
