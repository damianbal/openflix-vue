<template>
  <div>
    <nav class="container-fluid bg-gradient-nav mb-4">
      <div class="row p-3">
        <div class="col-sm text-left text-primary">OpenFlix</div>
        <div class="col-sm-11 text-right">

          <nav>
            <router-link v-if="isSignedIn" :to="{name: 'popular', params: {  }}">
              <i class="fas fa-fire"></i> Popular</router-link>
            &nbsp;
            <router-link v-if="isSignedIn" :to="{name: 'liked', params: {  }}">
              <i class="fas fa-star"></i> Liked</router-link>
            &nbsp;
            <router-link v-if="isSignedIn" :to="{name: 'browse', params: { genre_id: 1, page_id: 1 }}">
              <i class="fas fa-film"></i> Browse</router-link>
            &nbsp;
            <a v-if="isSignedIn" @click.prevent="signOut" href="#">Sign Out</a>

            <router-link v-if="!isSignedIn" :to="{name: 'sign-in'}">Sign In</router-link>
            &nbsp;
            <router-link v-if="!isSignedIn" :to="{name: 'sign-up'}">Sign Up</router-link>
          </nav>

        </div>

      </div>
    </nav>
    <div class="container-fluid main-container">
      <router-view/>
    </div>
    <footer class="continer-fluid footer">
      <div class="row p-3 bg-footer text-muted">
        <div class="col-sm-12">
          OpenFlix
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      localStorage.removeItem("token");
      this.$router.replace({ name: "landing" });
    }
  }
};
</script>


<style lang="scss">
.footer {
  min-height: 200px;
}
.bg-footer {
  background: rgba(0, 0, 0, 0.1);
}
.bg-gradient-nav {
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0px 0px 13px 3px rgba(0, 0, 0, 0.1);
}
</style>
