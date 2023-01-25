<script>
export default{
  emits: ["switchPage"],
  props: ["foodQty", "categoryQty"],
  methods: {
    switchPage(page){
      this.$emit("switchPage", page)
    }
  }
}
</script>

<template>
  <section class="dashboard-section w-8/12 mx-auto shadow-outline p-5 mt-5">
    <h1 class="text-center font-medium text-3xl pb-6">Dashboard</h1>
    <hr class="mb-14 border-black">
    <div class="flex justify-between">
      <a class="group relative block h-80 w-80" @click="switchPage('menu-page')">
        <span class="absolute inset-0 border-2 border-dashed border-black"></span>

        <div
          class="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 cursor-pointer">
          <div class="px-8 pb-8 transition-opacity group-hover:absolute group-hover:opacity-0">
            <img src="https://cdn-icons-png.flaticon.com/512/738/738079.png" alt="Food" class="h-24 w-24">
            <h2 class="mt-4 text-2xl font-medium">Total Menu</h2>
            <h2 class="mt-4 text-2xl font-medium">{{ foodQty }}</h2>
          </div>

          <div class="absolute p-8 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100">
            <h3 class="mt-4 text-2xl font-medium">See all food</h3>
            <p class="mt-8 font-bold">Click here</p>
          </div>
        </div>
      </a>
      <a class="group relative block h-80 w-80" @click="switchPage('category-page')">
        <span class="absolute inset-0 border-2 border-dashed border-black"></span>

        <div
          class="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 cursor-pointer">
          <div class="px-8 pb-8 transition-opacity group-hover:absolute group-hover:opacity-0">
            <img src="https://cdn-icons-png.flaticon.com/512/561/561123.png" alt="Category" class="h-24 w-24">
            <h2 class="mt-4 text-2xl font-medium">Total Categories</h2>
            <h2 class="mt-4 text-2xl font-medium">{{ categoryQty }}</h2>
          </div>

          <div class="absolute p-8 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100">
            <h3 class="mt-4 text-2xl font-medium">See all categories</h3>
            <p class="mt-8 font-bold">Click here</p>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>