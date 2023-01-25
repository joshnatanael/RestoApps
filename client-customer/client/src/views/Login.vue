<script>
import { mapActions, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default{
  name: "Login",
  methods: {
    ...mapActions(useCounterStore, ['loginHandler', 'handleCredentialResponse'])
  },
  computed: {
    ...mapWritableState(useCounterStore, ['login'])
  }
}
</script>

<template>
  <div id="login" class="block">
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-lg bg-white pt-10 rounded-xl shadow-2xl">
        <h1 class="text-center text-2xl font-extrabold sm:text-3xl">
          RestoApps
        </h1>
  
        <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
          Welcome back to RestoApps, please sign in to access more feature.
        </p>
  
        <form @submit.prevent="loginHandler" class="mt-6 mb-0 space-y-4 rounded-lg p-8">
          <p class="text-lg font-medium pb-5">Sign in to your account</p>
  
          <div>
            <label for="email" class="text-sm font-medium">Email</label>
  
            <div class="relative mt-1">
              <input v-model="login.email" type="email" id="email" class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter email" />
            </div>
          </div>
  
          <div>
            <label for="password" class="text-sm font-medium">Password</label>
  
            <div class="relative mt-1">
              <input v-model="login.password" type="password" id="password" class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm mb-6"
                placeholder="Enter password" />
            </div>
          </div>
  
          <button type="submit" class="block w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white">
            Sign in
          </button>
          <hr>
          <p class="text-center">Or sign in using</p>

          <div id="buttonGoogle">
            <GoogleLogin :callback="handleCredentialResponse" id="google-sign-in-button"/>
          </div>
  
          <p class="text-center text-sm text-gray-500">
            No account?
            <router-link to="/register" class="underline">Sign up</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>

</template>

<style scoped>
#login{
  background-image: url(https://images.unsplash.com/photo-1568018508399-e53bc8babdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80);
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
#buttonGoogle{
  display: block;
  text-align: center;
}
</style>