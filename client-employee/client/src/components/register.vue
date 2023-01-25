<script>
export default{
  emits: ["eventRegisterHandler", "switchPage"],
  data(){
    return{
      register: {
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: ""
      }
    }
  },
  methods: {
    eventRegisterHandler(){
      this.$emit("eventRegisterHandler", this.register);
      this.register.username = "";
      this.register.email = "";
      this.register.password = "";
      this.register.phoneNumber = "";
      this.register.address = "";
    },
    switchPage(page){
      this.$emit("switchPage", page);
    }
  }
}
</script>

<template>
  <section class="register-section w-3/5 mx-auto shadow-outline p-5 mt-5">
    <h1 class="text-center font-medium text-3xl pb-7">Sign Up</h1>
    <h2 class="text-center text-xl pb-6">Sign up to access all feature.</h2>
    <hr class="mb-14">
    <form @submit.prevent="eventRegisterHandler">
      <div class="flex my-4">
        <label for="register-username" class="inline-block w-2/6 font-bold my-auto">Username</label>
        <input v-model="register.username" type="text"
          class="rounded-lg w-full p-1.5 border-2 border-grey-600 border-solid pl-3" id="register-username"
          name="username" placeholder="Enter your username here" required><br>
      </div>
      <div class="flex my-4">
        <label for="register-email" class="inline-block w-2/6 font-bold my-auto">Email</label>
        <input v-model="register.email" type="email"
          class="rounded-lg w-full p-1.5 border-2 border-grey-600 border-solid pl-3" id="register-email" name="email"
          placeholder="Enter your email here" required><br>
      </div>
      <div class="flex my-4">
        <label for="register-password" class="inline-block w-2/6 font-bold my-auto">Password</label>
        <input v-model="register.password" type="password"
          class="rounded-lg w-full p-1.5 border-2 border-grey-600 border-solid pl-3" id="register-password"
          name="password" placeholder="Enter your password here" required><br>
      </div>
      <div class="flex my-4">
        <label for="register-phoneNumber" class="inline-block w-2/6 font-bold my-auto">Phone Number</label>
        <input v-model="register.phoneNumber" type="text"
          class="rounded-lg w-full p-1.5 border-2 border-grey-600 border-solid pl-3" id="register-phoneNumber"
          name="phoneNumber" placeholder="Enter your phone number (optional)"><br>
      </div>
      <div class="my-3">
        <label for="register-address" class="font-bold">Address</label><br>
        <textarea v-model="register.address" id="register-address"
          class="rounded-lg w-full my-2 p-2 border-2 border-grey-600 border-solid pl-3" name="address"
          placeholder="Enter your address here (optional)"></textarea><br>
      </div>
      <div class="text-center">
        <button class="mt-4 bg-black text-white p-4 rounded-full w-1/2">Sign Up</button>
      </div>
    </form>
    <h2 class="text-center text-xl py-4">Have an account already?</h2>
    <div class="text-center">
      <button @click="switchPage('login-page')" class="bg-black text-white p-4 rounded-full w-1/2">Log In</button>
    </div>
  </section>
</template>