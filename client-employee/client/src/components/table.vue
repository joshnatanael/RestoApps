<script>
import tableContent from './tableContent.vue';
export default {
  props: ["data", "display", "role"],
  emits: ["switchPage", "editFood", "editCategory", "deleteCategory", "updateFoodStatus"],
  components:{
    tableContent
  },
  methods: {
    switchPage(page) {
      this.$emit("switchPage", page);
    },
    editFood(id){
      this.$emit("editFood", id);
    },
    editCategory(id){
      this.$emit("editCategory", id);
    },
    deleteCategory(id){
      this.$emit("deleteCategory", id);
    },
    updateFoodStatus(id, status, oldStatus){
      this.$emit("updateFoodStatus", id, status, oldStatus)
    }
  }
}
</script>

<template>
  <section class="w-11/12 mx-auto shadow-outline p-5 mt-5">
    <div v-if="display === 'category'" class="flex justify-between">
      <h1 class="font-medium text-5xl">Categories</h1>
      <button @click="switchPage('modify-category-page')"
        class="text-lg hover:font-bold bg-black text-white align px-5 rounded-full">+ New Category</button>
    </div>
    <div v-if="display === 'menu'" class="flex justify-between">
      <h1 class="font-medium text-5xl">Menu</h1>
    <button @click="switchPage('modify-food-page')"
      class="text-lg hover:font-bold bg-black text-white align px-5 rounded-full">+ New Food</button>
    </div>
    <div v-if="display === 'logs'" class="flex justify-between">
      <h1 class="font-medium text-5xl">Logs</h1>
    </div>
    <hr class="mb-14 mt-5">
    <table class="w-full">
      <thead>
        <tr v-if="display === 'category'" class="h-10">
          <th>No.</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
        <tr v-if="display === 'menu'">
          <th>No.</th>
          <th>Name</th>
          <th>Image</th>
          <th>Description</th>
          <th>Price</th>
          <th>Author</th>
          <th>Status</th>
          <th></th>
        </tr>
        <tr v-if="display === 'logs'" class="h-10">
          <th>No.</th>
          <th>Food name</th>
          <th>Description</th>
          <th>Created At</th>
          <th>Updated By</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tableContent v-for="(item, index) in data" :key="item.id" :item="item" :index="index" v-on:editCategory="editCategory" v-on:deleteCategory="deleteCategory" v-on:editFood="editFood" v-on:updateFoodStatus="updateFoodStatus" :role="role" :display="display"/>
      </tbody>
    </table>
  </section>
</template>