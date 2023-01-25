<script>
import favouriteItem from '../components/favouriteItem.vue';
import { mapState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default{
  name: "Favourites",
  components: {
    favouriteItem,
  },
  computed: {
    ...mapState(useCounterStore, ['favourites'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchFavouritesFood'])
  },
  created(){
    this.fetchFavouritesFood();
  }
}
</script>

<template>
  <section>
    <div class="max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="max-w-xl">
        <h2 class="text-3xl font-bold sm:text-4xl">My Favourites.</h2>
      </div>
      <h1 v-if="(favourites.length === 0)" class="text-center py-8 text-2xl">No favourites food yet.</h1>

      <div v-else class="mt-8 grid gap-8 md:mt-16 grid-cols-2">
        <favouriteItem v-for="favourite in favourites" :key="favourite.id" :favourite="favourite"/>
      </div>
    </div>
  </section>

</template>