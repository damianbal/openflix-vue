<template>
    <div>

        <h3>
            <i class="fa fa-star"></i> Liked Movies</h3>

        <div class="p-3 display-4 text-center text-muted" v-if="movies.length < 1 && loading == false">You do not like any movies yet!</div>

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

      let resp = await movieService.getLikedMovies();

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
