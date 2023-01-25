<script>
export default{
  emits: ["switchPage", "hideProfileBar", "eventLogoutHandler"],
  props: ["isLoggedIn", "profileBarScrolled", "user", "role"],
  methods: {
    switchPage(page){
      this.$emit("switchPage", page);
    },
    hideProfileBar(){
      this.$emit("hideProfileBar");
    },
    eventLogoutHandler(){
      this.$emit("eventLogoutHandler");
    }
  }
}
</script>

<template>
  <nav class="bg-black shadow-md sticky top-0 z-50">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="block h-10 w-auto lg:hidden" src="../assets/img/logo.png" alt="RestoApps">
            <img class="hidden h-10 w-auto lg:block" src="../assets/img/logo.png" alt="RestoApps">
          </div>
          <div v-if="isLoggedIn" class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a @click="switchPage('dashboard-page')"
                class="text-black-300 hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium cursor-pointer text-white"
                aria-current="page">Dashboard</a>
              <a @click="switchPage('menu-page')"
                class="text-white hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Menu</a>
              <a @click="switchPage('category-page')"
                class="text-white hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Categories</a>
              <a @click="switchPage('logs-page')"
                class="text-white hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Logs</a>
            </div>
          </div>
          <div v-else class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a @click="switchPage('register-page')"
                class="text-black-300 hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium cursor-pointer text-white"
                aria-current="page">Sign Up</a>
              <a @click="switchPage('login-page')"
                class="text-white hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Log
                In</a>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div class="relative ml-3">
            <div>
              <button type="button"
                class="flex rounded-full bg-white border-solid text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 border-black border-2"
                id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <img @click="hideProfileBar"
                  class="h-8 w-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3171/3171065.png"
                  alt="Profile Picture">
              </button>
            </div>
            <div v-if="profileBarScrolled"
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
              <a class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Hi,
                {{ user }}!</a>
              <a @click="eventLogoutHandler" v-if="isLoggedIn"
                class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1"
                id="user-menu-item-2">Role: {{role}}</a>
              <a @click="eventLogoutHandler" v-if="isLoggedIn"
                class="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" tabindex="-1"
                id="user-menu-item-2">Log out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>