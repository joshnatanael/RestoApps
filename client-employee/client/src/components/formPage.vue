<script>
import cancelButton from './cancelButton.vue'
export default {
  props: ["categories", "modifyType", "foodDetail", "categoryData"],
  emits: ["saveFoodHandler", "switchPage", "saveEditedFoodHandler", "saveCategoryHandler", "saveEditedCategoryHandler"],
  components: {
    cancelButton
  },
  data() {
    return {
      addCategory: "",
      foodData: {
        name: "",
        categoryId: 0,
        description: "",
        imgUrl: "",
        price: ""
      }
    }
  },
  methods: {
    saveFoodHandler() {
      this.$emit("saveFoodHandler", this.foodData)
      this.foodData.name = "";
      this.foodData.categoryId = "";
      this.foodData.description = "";
      this.foodData.imgUrl = "";
      this.foodData.price = "";
    },
    switchPage(page) {
      this.$emit("switchPage", page)
    },
    saveEditedFoodHandler() {
      this.$emit("saveEditedFoodHandler", this.foodData, this.foodDetail.id)
    },
    saveCategoryHandler(){
      this.$emit("saveCategoryHandler", this.addCategory);
      this.addCategory = "";
    },
    saveEditedCategoryHandler(){
      this.$emit("saveEditedCategoryHandler", this.addCategory, this.categoryData.id)
      this.addCategory = "";
    },
    submitHandler(){
      if(this.modifyType === "add-food"){
        this.saveFoodHandler();
      }
      else if(this.modifyType === "add-category"){
        this.saveCategoryHandler();
      }
      else if(this.modifyType === "edit-food"){
        this.saveEditedFoodHandler();
      }
      else if(this.modifyType === "edit-category"){
        this.saveEditedCategoryHandler();
      }
    }
  },
  created() {
    if (this.modifyType === "edit-food") {
      this.foodData.name = this.foodDetail.name;
      this.foodData.categoryId = this.foodDetail.categoryId;
      this.foodData.description = this.foodDetail.description;
      this.foodData.imgUrl = this.foodDetail.imgUrl;
      this.foodData.price = this.foodDetail.price;
    }
    else if (this.modifyType === "edit-category") {
      this.addCategory = this.categoryData.name;
    }
  }
}
</script>

<template>
  <section class="w-3/5 mx-auto shadow-outline p-5 mt-5">
    <h1 v-if="modifyType === 'add-food'" class="text-center font-medium text-3xl pb-7">Add Food</h1>
    <h1 v-if="modifyType === 'edit-food'" class="text-center font-medium text-3xl pb-7">Edit Food</h1>
    <h1 v-if="modifyType === 'add-category'" class="text-center font-medium text-3xl pb-7">Add Category</h1>
    <h1 v-if="modifyType === 'edit-category'" class="text-center font-medium text-3xl pb-7">Edit Category</h1>
    <hr class="mb-14">
    <form @submit.prevent="submitHandler">
      <span v-if="modifyType === 'add-food' || modifyType === 'edit-food'">
        <div class="flex my-4">
          <label for="modify-food-name" class="inline-block w-2/6 font-bold my-auto">Name</label>
          <input v-model="foodData.name" type="text"
            class="rounded-lg w-full p-1.5 border-2 border-grey-600 border-solid pl-3" name="name"
            placeholder="Enter food name here" required><br>
        </div>
        <div class="flex my-4">
          <label for="modify-food-category" class="inline-block w-2/6 font-bold my-auto">Category</label><br>
          <select v-model="foodData.categoryId" name="categoryId"
            class="rounded-lg w-full my-2 p-1.5 border-2 border-grey-600 border-solid pl-3">
            <option value="0" disabled selected hidden>---Choose---</option>
            <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
          </select>
        </div>
        <div class="flex my-4">
          <label for="modify-food-description" class="inline-block w-2/6 font-bold my-auto">Description</label>
          <input v-model="foodData.description" type="text"
            class="rounded-lg w-full p-1.5 border-2 border-grey-600 border-solid pl-3" name="description"
            placeholder="Enter food description" required><br>
        </div>
        <div class="flex my-4">
          <label for="modify-food-price" class="inline-block w-2/6 font-bold my-auto">Price</label>
          <input v-model="foodData.price" type="number"
            class="rounded-lg w-full p-1.5 border-2 border-grey-600 border-solid pl-3" placeholder="Enter food price"
            required><br>
        </div>
        <div class="flex my-4">
          <label for="modify-food-imgUrl" class="inline-block w-2/6 font-bold my-auto">Image</label>
          <input v-model="foodData.imgUrl" type="text"
            class="rounded-lg w-full p-1.5 border-2 border-grey-600 border-solid pl-3" name="imgUrl"
            placeholder="Enter food image Url" required><br>
        </div>
      </span>
      <span v-if="modifyType === 'add-category' || modifyType === 'edit-category'">
        <label for="modify-category-name" class="inline-block w-2/6 font-bold my-auto">Name</label><br>
        <input v-model="addCategory" type="text"
          class="rounded-lg w-full p-1.5 border-2 border-grey-600 border-solid pl-3" id="modify-category-username"
          name="name" placeholder="Enter category name here" required><br>
      </span>
      <div class="text-center flex justify-between">
        <cancelButton v-on:switchPage="switchPage" :modifyType="modifyType"/>
        <button class="mt-4 bg-black text-white p-4 rounded-full w-2/5">Save</button>
      </div>
    </form>
  </section>
</template>