<template>
    <div class="row mt-2 mb-3 bg-secondary text-white p-3">
        <div class="col-sm-12">

            <div class="text-center display-3">Watch Movies</div>
            <div class="text-muted text-center display-4">Sign up or Sign in and watch anything you want</div>
        </div>
    </div>
</template>

<script>
import authService from "@/services/AuthService";

export default {
  async mounted() {
    let u = await authService.user();

    console.log(u);
  }
};
</script>

<style scoped>
</style>
