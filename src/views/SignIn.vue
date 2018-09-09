<template>
    <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8 p-4">
            <div class="card">
            <div class="card-header">Sign in</div>
            <div class="card-body">
            <form v-on:submit.prevent="onSubmit">
                <div class="form-group">
                    <label>Email:</label>
                    <input v-model="email" placeholder="Email..." class="form-control" type="email" name="email">
                </div>
                <div class="form-group">
                    <label>Password: </label>
                    <input v-model="password" placeholder="Password..." class="form-control" type="password" name="password">
                </div>
                <button class="btn btn-primary" type="submit">Sign In</button>
            </form>
            </div>
            </div>
        </div>
        <div class="col-sm-2"></div>
    </div>
</template>

<script>

import authService from "@/services/AuthService"

export default {
    mounted() {

    },
    methods: {
        async onSubmit() {
            let data;
            try {
                data = await authService.login(this.email, this.password)
            }
            catch(err) {
                alert('Error: ' + err.message)
                return;
            }

            if(data.success) {
                localStorage.setItem("token", data.token)
                alert(data.message)
                this.$router.push({name:"browse", params: { page_id: 1, genre_id: 0 } })
            } else {
                alert(data.message)
            }
        }
    },
    data: () => {
        return {
            email: "",
            password: ""
        }
    }
}
</script>

<style>

</style>
