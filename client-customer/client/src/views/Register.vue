<script>
import { mapActions, mapWritableState } from 'pinia';
import { useCounterStore } from '../stores/counter';
export default{
  name: "Register",
  methods: {
    ...mapActions(useCounterStore, ['registerHandler'])
  },
  computed: {
    ...mapWritableState(useCounterStore, ['register'])
  }
}
</script>

<template>
  <section class="bg-white">
    <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
      <aside class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
        <img alt="Pattern"
          src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VzaGl8ZW58MHx8MHx8&auto=format&fit=crop&w=1400&q=60"
          class="absolute inset-0 h-full w-full object-cover" />
      </aside>

      <main aria-label="Main"
        class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6">
        <div class="max-w-xl lg:max-w-3xl">
          <a class="block text-blue-600">
            <span class="sr-only">Register</span>
            <img src="https://cdn-icons-png.flaticon.com/128/3081/3081098.png" alt="restoApps-icon" class="h-8 sm:h-10" viewBox="0 0 28 24" fill="none">
          </a>

          <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Welcome to RestoApps
          </h1>

          <form @submit.prevent="registerHandler" class="mt-8 grid grid-cols-6 gap-6">
            <div class="col-span-6">
              <label for="username" class="block text-sm font-medium text-gray-700">
                Userame
              </label>

              <input v-model="register.username" type="text" id="username" name="username"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
            </div>

            <div class="col-span-6">
              <label for="Email" class="block text-sm font-medium text-gray-700">
                Email
              </label>

              <input v-model="register.email" type="email" id="Email" name="email"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
            </div>

            <div class="col-span-6">
              <label for="Password" class="block text-sm font-medium text-gray-700">
                Password
              </label>

              <input v-model="register.password" type="password" id="Password" name="password"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
            </div>

            <div class="col-span-6">
              <label for="phoneNumber" class="block text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <input v-model="register.phoneNumber" type="text" id="phoneNumber" name="phoneNumber"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
            </div>

            <div class="col-span-6">
              <label for="address" class="block text-sm font-medium text-gray-700">
                Address
              </label>

              <input v-model="register.address" type="text" id="address" name="address"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
            </div>

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                class="inline-block shrink-0 rounded-md border bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-black">
                Create an account
              </button>

              <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                Already have an account?
                <router-link to="/login" class="text-gray-700 underline">Log in</router-link>.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  </section>

</template>

<style scoped>
input{
  padding: 7px;
}
</style>