<script>
export default {
  props: ["item", "index", "role", "display"],
  emits: ["editFood", "updateFoodStatus", "editCategory", "deleteCategory"],
  data(){
    return{
      status: this.item.status
    }
  },
  methods: {
    formateDate(date) {
      return new Date(date).toLocaleString("en-US", { dateStyle: "medium" })
    },
    editFood(id){
      this.$emit("editFood", id)
    },
    updateFoodStatus(id, status, oldStatus){
      this.$emit("updateFoodStatus", id, status, oldStatus);
    },
    editCategory(id){
      this.$emit("editCategory", id)
    },
    deleteCategory(id){
      this.$emit("deleteCategory", id)
    }
  },
  watch: {
    status(newValue, oldValue){
      this.updateFoodStatus(this.item.id, newValue, oldValue);
    }
  }
}
</script>

<template>
  <tr v-if="display === 'logs'" class="border-t-2 h-10">
    <td>{{ index + 1 }}.</td>
    <td>{{ item.name }}</td>
    <td>{{ item.description }}</td>
    <td>{{ formateDate(item.createdAt) }}</td>
    <td>{{ item.updatedBy }}</td>
  </tr>
  <tr v-if="display === 'menu'" class="border-t-2">
    <td class="w-1.5">{{ index+1 }}.</td>
    <td class="w-20">{{ item.name }}</td>
    <td><img :src="item.imgUrl" alt="Food Pict" class="max-h-56 mx-auto foodPict"></td>
    <td>{{ item.description }}</td>
    <td>Rp. {{ item.price }}</td>
    <td class="text-base">{{item.User.email}}</td>
    <td>
      <select v-if="role ==='Admin'" v-model="status" name="status" id="status" class="border-2 border-solid border-grey-800 w-35 text-center">
        <option value="Active"><a>Active</a></option>
        <option value="Inactive"><a>Inactive</a></option>
        <option value="Archived"><a>Archived</a></option>
      </select>
    </td>
    <td>
      <img @click="editFood(item.id)" src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png" alt="Edit Button" class="w-5 cursor-pointer">
    </td>
  </tr>
  <tr v-if="display === 'category'" class="border-t-2 h-10">
    <td>{{ index+1 }}.</td>
    <td>{{ item.name }}</td>
    <td class="flex justify-center">
      <img @click="editCategory(item.id)" src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png" alt="Edit Button" class="max-h-6 mx-4 cursor-pointer">
      <img @click="deleteCategory(item.id)" src="https://cdn-icons-png.flaticon.com/512/2874/2874821.png" alt="delete-icon" class="max-h-6 mx-4 cursor-pointer">
    </td>
  </tr>
</template>