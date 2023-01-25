<script>
import foodList from '../components/FoodList.vue';
import {mapState, mapActions} from 'pinia';
import {useCounterStore} from '@/stores/counter';
export default {
  name: "Home",
  components: {
    foodList
  },
  computed: {
    ...mapState(useCounterStore, ["categories"])
  },
  methods:{
    ...mapActions(useCounterStore, ["fetchFood", "fetchCategories"]),
    searchFood(){
      this.options.filterBy = this.searchKeyword;
      this.fetchFood(this.options);
    },
    removeFilterSearch(){
      delete this.options.filterBy;
      this.searchKeyword = "";
      this.fetchFood(this.options);
    }
  },
  created(){
    this.fetchFood(this.options);
    this.fetchCategories();
  },
  watch: {
    categorySort(newValue, oldValue){
      this.options.categoryId = newValue;
      this.fetchFood(this.options)
    }
  },
  data(){
    return{
      categorySort: "",
      options: {
        page: 1
      },
      searchKeyword: ""
    }
  }
}
</script>

<template>
  <section>
    <header>
      <section class="overflow-hidden bg-gray-100 sm:grid sm:grid-cols-2">
        <div class="p-8 md:p-12 lg:px-16 lg:py-24">
          <div class="mx-auto max-w-xl text-center sm:text-left">
            <h2 class="text-2xl font-bold text-gray-900 md:text-3xl">
              Food Collection
            </h2>
            <p>Meet our best Japanese dishes in town!</p>
          </div>
        </div>

        <img alt="Food"
          src="https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGphcGFuJTIwZm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          class="h-60 w-full object-cover" />
      </section>
    </header>

    <div class="flex items-center justify-between max-w-screen-xl px-4 mx-auto sm:px-6 pt-4 lg:px-8">
      <form @submit.prevent="searchFood" class="w-5/6">
        <span class="border border-gray-300 rounded-md py-3">
          <input v-model="searchKeyword" type="text" class="p-2 inline-block w-4/6 ml-0" placeholder="Search by name">
          <a @click.prevent="removeFilterSearch" class="cursor-pointer font-bold px-3">X</a>
        </span>
        <button class="bg-black px-8 py-2 rounded-md ml-8 text-white text-xl">Search</button>
      </form>

      <div>

        <select v-model="categorySort" id="SortBy" class="h-10 py-2 px-6 text-sm border-gray-300 border rounded">
          <option value="">All</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
        </select>
      </div>
    </div>
    <!--foodlist-->
    <foodList />
  </section>

</template>