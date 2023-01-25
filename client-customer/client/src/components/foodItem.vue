<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default{
  props: ["item"],
  methods: {
    ...mapActions(useCounterStore, ['formatNumber'])
  }
}
</script>

<template>
  <li>
    <router-link :to="`/food/${item.id}`" class="group relative block bg-black z-1 cursor-pointer">
      <img alt="Food Menu"
        :src="item.imgUrl"
        class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50" />
      <div class="relative p-8">
        <p class="text-sm font-medium uppercase tracking-widest text-pink-500">
          Food Menu
        </p>
        <p class="text-2xl font-bold text-white">{{item.name}}</p>
        <p class="text-2xl font-bold text-white">IDR. {{formatNumber(item.price)}}</p>
        <div class="mt-64">
          <div
            class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <p class="text-xl text-white h-16 overflow-y-auto">
              {{item.description}}
            </p>
            <p class="text-white font-bold">Click to see food details!</p>
          </div>
        </div>
      </div>
    </router-link>
  </li>
</template>