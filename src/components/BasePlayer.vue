<template>
  <div class="row">
    <div class="col-12">
      <!-- video element -->
      <vue-plyr>
        <video class="rounded shadow" :poster="poster" :src="source">
          <!-- <source :src="movieSource" type="video/webm" size="720">  -->
        </video>
      </vue-plyr>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      default: "#"
    },
    poster: {
      type: String,
      default: "#"
    }
  },
  mounted() {},
  data: () => {
    return {
      loading: false
    };
  }
};
</script>

<style>
</style>
