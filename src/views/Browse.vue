<template>
  <div>

    <h3>Movies</h3>
    <div v-if="noMovies">No movies</div>

    <base-loading v-if="loading"></base-loading>

    <div v-else class="row mb-3 mt-3">
      <div class="col-sm-2">
        <select v-model="selectedGenre" class="custom-select">
          <option :value="0" selected>All</option>
          <option v-for="(genre, idx) in genres" :value="genre.id" :key="idx">{{ genre.title }}</option>
        </select>
      </div>
    </div>

    <div v-if="!loading" class="row">

      <base-movie v-for="(movie, idx) in movies" :key="idx" :liked="movie.liked" :id="movie.id" :genre="movie.genre" :title="movie.title" :thumb="movie.thumb" v-on:movieClicked="goToMovie(movie.id)" v-on:unliked="unlikedMovie" v-on:liked="likedMovie"></base-movie>

      <div class="col-12 mb-3">
        <div class="btn-group">
          <button v-if="page_id > 1" @click="goToPrevPage" class="btn btn-secondary">Previous</button>
          <button v-if="current_page <= last_page-1" @click="goToNextPage" class="btn btn-secondary">Next</button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import movieService from "@/services/MovieService";

import Bus from "@/bus";

export default {
  props: {
    page_id: {
      type: Number,
      default: Number(1)
    },
    genre_id: {
      type: Number,
      default: Number(0)
    }
  },
  mounted() {
    this.fetch(this.page_id);
    this.selectedGenre = this.genre_id;
  },
  watch: {
    $route: function(to, from) {
      this.selectedGenre = this.genre_id;
      this.fetch(Number(this.page_id));
    },
    selectedGenre: function() {
      // navigate to browse route with selected category and first page
      this.$router.push({
        name: "browse",
        params: { page_id: 1, genre_id: this.selectedGenre }
      });
    }
  },
  methods: {
    likedMovie(id) {
      // like it!
      Bus.$emit("liked", id);
    },
    unlikedMovie(id) {
      Bus.$emit("unliked", id);
    },
    goToMovie(id) {
      this.$router.push({ name: "play", params: { movie_id: id } });
    },
    goToPrevPage() {
      this.$router.push({
        name: "browse",
        params: {
          page_id: this.page_id - Number(1),
          genre_id: this.selectedGenre
        }
      });
    },
    goToNextPage() {
      this.$router.push({
        name: "browse",
        params: {
          page_id: Number(this.page_id) + Number(1),
          genre_id: this.selectedGenre
        }
      });
    },
    async fetch(page) {
      this.loading = true;

      if (this.genre_id == 0) {
        this.genre_id = null;
      }

      let movies = await movieService.getMovies({
        page: page,
        genre: this.genre_id
      });
      this.movies = movies.data;

      this.last_page = movies.meta.last_page;
      this.current_page = movies.meta.current_page;

      let genres = await movieService.getGenres();
      this.genres = genres;

      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  },
  computed: {
    noMovies: function() {
      return this.movies.length == 0;
    }
  },
  data() {
    return {
      movies: [],
      genres: [],
      selectedGenre: 0,
      loading: true,
      current_page: 0,
      last_page: 999
    };
  }
};
</script>

<style scopped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
