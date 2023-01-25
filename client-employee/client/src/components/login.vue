<script>
export default {
  props: ["isLoggedIn"],
  emits: ["eventLoginHandler", "switchPage", "handleCredentialResponse"],
  data() {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    eventLoginHandler() {
      this.$emit("eventLoginHandler", this.login);
      this.login.email = "";
      this.login.password = "";
    },
    switchPage(page) {
      this.$emit("switchPage", page)
    },
    handleCredentialResponse(response) {
      this.$emit("handleCredentialResponse", response)
    }
  }
}
</script>

<template>
  <section class="login-section w-1/2 mx-auto shadow-outline p-5 mt-5">
    <h1 class="text-center font-medium text-3xl pb-6">Log In</h1>
    <hr class="mb-14">
    <form @submit.prevent="eventLoginHandler">
      <div class="flex my-6">
        <label for="email" class="inline-block w-2/6 font-bold my-auto">Email</label>
        <input v-model="login.email" type="email"
          class="rounded-lg w-full p-1.5 border-2 border-grey-600 border-solid pl-3" id="email" name="email"
          placeholder="Enter your email here" required><br>
      </div>
      <div class="flex my-6">
        <label for="password" class="inline-block w-2/6 font-bold my-auto">Password</label>
        <input v-model="login.password" type="password"
          class="rounded-lg w-full p-1.5 border-2 border-grey-600 border-solid pl-3" id="password" name="password"
          placeholder="Enter your password here" required><br>
      </div>
      <div class="text-center">
        <button class="mt-4 bg-black text-white p-4 rounded-full w-1/2">Log In</button>
      </div>
    </form>
    <hr class="mt-10 mb-6">
    <h2 class="text-center text-lg pb-6">Or sign in with</h2>
    <!-- <img src="https://avatars.githubusercontent.com/u/7328930?v=4" alt="Google-Sign-In-Button"
      class="h-10 mx-auto hover:border-2 hover:border-black hover:border-solid p-1 hover:rounded-full"> -->
    <GoogleLogin :callback="handleCredentialResponse" id="google-login-button" />
    <div class="text-center">
      <h2 class="text-lg pb-6">Don't have an account?</h2>
      <button @click="switchPage('register-page')" class="bg-black text-white p-4 rounded-full w-1/2">Sign Up</button>
    </div>
  </section>
</template>