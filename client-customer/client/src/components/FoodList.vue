<script>
import foodItem from './foodItem.vue';
import {mapState, mapActions} from 'pinia';
import {useCounterStore} from '@/stores/counter';
import { ref } from "vue";
export default{
  computed: {
    ...mapState(useCounterStore, ['food', 'totalFood'])
  },
  components: {
    foodItem
  },
  data(){
    return{
      currentPage: ref(1)
    }
  },
  methods: {
    ...mapActions(useCounterStore, ["fetchFood"]),
    onClickHandler(page){
      this.fetchFood({page})
    }
  }
}
</script>

<template>
  <h1 v-if="(food.length === 0)" class="text-center py-8 text-2xl">No Matching Result.</h1>
  <div class="max-w-screen-xl px-4 py-4 mx-auto sm:px-6 sm:py-3 lg:px-8">


    <ul class="grid gap-4 mt-8 grid-cols-3">
      <foodItem v-for="item in food" :key="item.id" :item="item"/>
    </ul>
  </div>
  <div class="text-center py-8">
    <vue-awesome-paginate
      :total-items="totalFood"
      :items-per-page="9"
      :max-pages-shown="3"
      v-model="currentPage"
      :on-click="onClickHandler"
    />
  </div>
</template>

<style>
  .pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid black;
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: black;
    color: white;
  }
  .active-page:hover {
    background-color: black;
  }
</style>