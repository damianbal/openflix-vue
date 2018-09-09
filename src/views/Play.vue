<template>
    <div>
        <base-loading v-if="loading"></base-loading>

        <transition name="fade">
            <div v-if="!loading">

                <base-player :poster="moviePoster" :source="movieSource"></base-player>
            </div>
        </transition>
    </div>
</template>

<script>
import movieService from "@/services/MovieService";

import { base } from "@/config";

import storageUrl from "@/utils/LaraStorage";

export default {
  props: {
    movie_id: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    // load data by ID
    this.fetch();
  },
  data: () => {
    return {
      loading: true,
      movie: {}
    };
  },
  methods: {
    async fetch() {
      this.loading = true;

      let movie = await movieService.getMovie(this.movie_id);

      setTimeout(() => {
        this.loading = false;
      }, 1000);
      this.movie = movie;
      console.log(this.movie);
      console.log(this.movieSource);
    }
  },
  computed: {
    movieSource: function() {
      return storageUrl(this.movie.source);
    },
    moviePoster: function() {
      return storageUrl(this.movie.poster);
    }
  }
};
</script>

<style>
</style>
