<script>
import { mapState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default{
  name: "Food",
  computed: {
    ...mapState(useCounterStore, ['foodDetail', 'barcodeLink'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchFoodDetail', 'addToFavourite', 'formatNumber', 'fetchBarcode'])
  },
  created(){
    this.fetchFoodDetail(this.$route.params.id);
    this.fetchBarcode(this.$route.fullPath);
  }
}
</script>

<template>
  <h1 v-if="!foodDetail.name">Food data not found</h1>
  <section v-else>
    <div class="relative mx-auto max-w-screen-xl px-4 py-8">
      <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <img alt="Food"
          :src="foodDetail.imgUrl"
          class="aspect-square w-full rounded-xl object-cover" />

        <div class="sticky top-0">

          <div class="mt-8 flex justify-between">
            <div class="max-w-[35ch] mb-9">
              <h1 class="text-4xl font-extrabold">
                {{foodDetail.name}}
              </h1>

            </div>

            <p class="text-lg font-bold">IDR. {{formatNumber(foodDetail.price)}}</p>
          </div>

          <details class="group relative mt-4">
            <summary class="block">
              <div>
                <div class="prose max-w-none">
                  <p class="mb-5 font-bold">Description:</p>
                  <p>
                    {{foodDetail.description}}
                  </p>
                  <p class="my-5 font-bold">Category:</p>
                  <p>
                    {{foodDetail.Category.name}}
                  </p>
                </div>
              </div>
            </summary>
          </details>
          
          <button @click="addToFavourite($route.params.id)" class="bg-red-600 text-white w-full py-2 mt-12 rounded-mdcenter">Add To Favourite</button>
          
          <div class="pt-6 flex items-center justify-between">
            <hr class="w-5/12 border-gray-300">
            <p>Or</p>
            <hr class="w-5/12 border-gray-300">
          </div>
          <p class="py-6 text-center font-bold">Scan this barcode to share this menu!</p>
          <img
          :src="barcodeLink"
          alt="barcode"
          class="w-32 h-32 mx-auto">
        </div>
      </div>
    </div>
  </section>

</template>