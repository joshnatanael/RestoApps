<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default{
  props: ["favourite"],
  methods: {
    ...mapActions(useCounterStore, ['deleteFavourite', 'formatNumber'])
  }
}
</script>

<template>
  <div class="flex items-start border border-gray-300 rounded-lg">
    <div class="ml-4">
      <article class="flex bg-white transition">
        <div class="rotate-180 p-2 [writing-mode:_vertical-lr]">
          <time datetime="2022-10-10"
            class="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
            <span class="w-px flex-1 bg-gray-900/10"></span>
          </time>
        </div>

        <div class="hidden sm:block sm:basis-56">
          <img alt="Food"
            :src="favourite.Food.imgUrl"
            class="aspect-square h-full w-full object-cover" />
        </div>

        <div class="flex flex-1 flex-col justify-between">
          <div class="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
            <a href="#">
              <h3 class="font-bold uppercase text-gray-900">
                {{favourite.Food.name}}
              </h3>
            </a>

            <p class="mt-2 text-sm leading-relaxed text-gray-700 line-clamp-3">
              {{favourite.Food.description}}
            </p>
            <p class="mt-2 text-sm leading-relaxed text-gray-700 line-clamp-3">
              IDR. {{formatNumber(favourite.Food.price)}}
            </p>
          </div>

          <div class="sm:flex sm:items-end sm:justify-end">
            <router-link :to="`/food/${favourite.FoodId}`"
              class="block bg-green-600 px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-green-500 cursor-pointer">
              Details
            </router-link>
            <a @click.prevent="deleteFavourite(favourite.id)"
              class="block bg-red-600 px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-red-500 cursor-pointer">
              Delete
            </a>
          </div>
        </div>
      </article>

    </div>
  </div>
</template>