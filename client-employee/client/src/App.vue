<script>
import axios from "axios";
import loader from "./components/loader.vue";
import navbar from "./components/navbar.vue";
import login from "./components/login.vue";
import register from "./components/register.vue";
import dashboard from "./components/dashboard.vue";
import tablePreview from "./components/table.vue";
import formPage from "./components/formPage.vue";
export default {
  components: {
    loader,
    navbar,
    login,
    register,
    dashboard,
    tablePreview,
    formPage
  },
  data() {
    return {
      loadStatus: false,
      baseUrl: "https://restaurantapp-db-production.up.railway.app/",
      profileBarScrolled: false,
      page: "login-page",
      food: [],
      categories: [],
      histories: [],
      user: "Guest",
      role: "Staff",
      isLoggedIn: false,
      foodDetail: {
        id: 0,
        name: "",
        categoryId: 0,
        description: "",
        imgUrl: "",
        price: 0
      },
      categoryData: {
        id: 0,
        name: ""
      }
    }
  },
  mounted() {
    this.checkLogInStatus();
  },
  methods: {
    showNotifciation(message) {
      Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000
      })
    },
    showErrorNotifciation(error) {
      let errorMessage = "Internal Server Error";
      if (error.response.status === 401) {
        if (!error.response.data.message.name) {
          errorMessage = error.response.data.message;
        }
        else {
          errorMessage = error.response.data.message.name;
        }
      }
      else if (error.response.status === 403) {
        errorMessage = error.response.data.message;
      }
      else if (error.response.status === 404) {
        errorMessage = error.response.data.error;
      }
      else if (error.response.status === 400) {
        errorMessage = error.response.data.message[0];
      }
      Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'error',
        title: errorMessage,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000
      })
    },
    async eventLoginHandler(value) {
      try {
        this.loadStatus = true;
        const { data } = await axios({
          method: 'POST',
          url: `${this.baseUrl}login`,
          data: {
            email: value.email,
            password: value.password
          }
        })
        this.loadStatus = false;
        localStorage.setItem("access_token", data["200"].access_token);
        this.showNotifciation("Successfully logged in!")
        this.page = "dashboard-page";
        this.fetchFoodData();
        this.fetchCategoriesData();
        this.fetchHistoriesData();
        this.fetchUserData();
        this.isLoggedIn = true;
      } catch (error) {
        this.loadStatus = false;
        this.showErrorNotifciation(error);
      }
    },
    checkLogInStatus() {
      if (localStorage.access_token) {
        this.page = 'dashboard-page';
        this.isLoggedIn = true;
        this.fetchFoodData();
        this.fetchCategoriesData();
        this.fetchHistoriesData();
        this.fetchUserData();
      }
      else {
        this.page = 'login-page';
      }
    },
    async fetchFoodData() {
      try {
        this.loadStatus = true;
        const { data } = await axios({
          method: "GET",
          url: `${this.baseUrl}food`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.loadStatus = false;
        this.food = data;
      } catch (error) {
        this.loadStatus = false;
        this.showErrorNotifciation(error);
      }
    },
    async fetchCategoriesData() {
      try {
        this.loadStatus = true;
        const { data } = await axios({
          method: "GET",
          url: `${this.baseUrl}categories`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.loadStatus = false;
        this.categories = data;
      } catch (error) {
        this.loadStatus = false;
        this.showErrorNotifciation(error);
      }
    },
    async fetchHistoriesData() {
      try {
        this.loadStatus = true;
        const { data } = await axios({
          method: "GET",
          url: `${this.baseUrl}histories`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.loadStatus = false;
        this.histories = data;
      } catch (error) {
        this.loadStatus = false;
        this.showErrorNotifciation(error);
      }
    },
    async fetchUserData() {
      try {
        this.loadStatus = true;
        const { data } = await axios({
          method: "GET",
          url: `${this.baseUrl}users`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.loadStatus = false;
        this.user = data.user;
        this.role = data.role;
      } catch (error) {
        this.loadStatus = false;
        this.showErrorNotifciation(error);
      }
    },
    async eventRegisterHandler(value) {
      try {
        this.loadStatus = true;
        const { data } = await axios({
          method: 'POST',
          url: `${this.baseUrl}register`,
          data: {
            username: value.username,
            email: value.email,
            password: value.password,
            phoneNumber: value.phoneNumber,
            address: value.address
          }
        })
        this.loadStatus = false;
        this.page = "login-page";
        this.showNotifciation("Successfully created account! Please sign in!")
      } catch (error) {
        this.loadStatus = false;
        this.showErrorNotifciation(error);
      }
    },
    async eventLogoutHandler() {
      this.loadStatus = true;
      this.page = 'login-page';
      this.user = 'Guest';
      this.profileBarScrolled = false;
      localStorage.clear();
      this.loadStatus = false;
      this.isLoggedIn = false;
      this.showNotifciation("Successfully logged out!");
    },
    async saveFoodHandler(value) {
      try {
        this.loadStatus = true;
        const { data } = await axios({
          method: 'POST',
          url: `${this.baseUrl}food`,
          data: {
            name: value.name,
            categoryId: value.categoryId,
            description: value.description,
            imgUrl: value.imgUrl,
            price: value.price
          },
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.loadStatus = false;
        this.page = "menu-page";
        this.showNotifciation(`Successfully added ${data.addedFood.name}!`)
        this.fetchFoodData();
        this.fetchHistoriesData();
      } catch (error) {
        this.loadStatus = false;
        this.showErrorNotifciation(error);
      }
    },
    async saveCategoryHandler(category) {
      try {
        this.loadStatus = true;
        const { data } = await axios({
          method: 'POST',
          url: `${this.baseUrl}categories`,
          data: {
            name: category
          },
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.loadStatus = false;
        this.page = "category-page";
        this.showNotifciation(`Successfully added ${data.name} category!`)
        this.fetchCategoriesData();
      } catch (error) {
        this.loadStatus = false;
        this.showErrorNotifciation(error);
      }
    },
    switchPage(page) {
      this.page = page;
    },
    hideProfileBar() {
      if (this.profileBarScrolled) {
        this.profileBarScrolled = false
      }
      else {
        this.profileBarScrolled = true;
      }
    },
    async editFood(id) {
      try {
        this.loadStatus = true;
        const { data } = await axios({
          method: "GET",
          url: `${this.baseUrl}food/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.loadStatus = false;
        this.foodDetail.id = data.foodDetail.id;
        this.foodDetail.name = data.foodDetail.name;
        this.foodDetail.categoryId = data.foodDetail.categoryId;
        this.foodDetail.description = data.foodDetail.description;
        this.foodDetail.imgUrl = data.foodDetail.imgUrl;
        this.foodDetail.price = data.foodDetail.price;
        this.page = "edit-food-page";
      } catch (error) {
        this.loadStatus = false;
        this.showErrorNotifciation(error);
      }
    },
    async saveEditedFoodHandler(value, id) {
      try {
        this.loadStatus = true;
        const { data } = await axios({
          method: 'PUT',
          url: `${this.baseUrl}food/${id}`,
          data: {
            name: value.name,
            categoryId: value.categoryId,
            description: value.description,
            imgUrl: value.imgUrl,
            price: value.price
          },
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.loadStatus = false;
        this.page = "menu-page";
        this.showNotifciation(`Successfully edit food ${data.editedFood.name}!`)
        this.fetchFoodData();
        this.fetchHistoriesData();
      } catch (error) {
        this.loadStatus = false;
        this.page = "menu-page";
        this.showErrorNotifciation(error);
      }
    },
    async editCategory(id) {
      try {
        this.loadStatus = true;
        const { data } = await axios({
          method: "GET",
          url: `${this.baseUrl}categories/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.loadStatus = false;
        this.categoryData.id = data.categoryDetail.id;
        this.categoryData.name = data.categoryDetail.name;
        this.page = "edit-category-page";
      } catch (error) {
        this.loadStatus = false;
        this.showErrorNotifciation(error);
      }
    },
    async saveEditedCategoryHandler(value, id) {
      try {
        this.loadStatus = true;
        const { data } = await axios({
          method: 'PUT',
          url: `${this.baseUrl}categories/${id}`,
          data: {
            name: value
          },
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.loadStatus = false;
        this.page = "category-page";
        this.showNotifciation(`Successfully edit ${data.editedFood.name} category!`)
        this.fetchCategoriesData();
        this.fetchHistoriesData();
      } catch (error) {
        this.loadStatus = false;
        this.showErrorNotifciation(error);
      }
    },
    async deleteCategory(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this! All food with this category will also be deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.loadStatus = true;
          axios({
            method: 'DELETE',
            url: `${this.baseUrl}categories/${id}`,
            headers: {
              access_token: localStorage.access_token
            }
          })
            .then(data => {
              this.loadStatus = false;
              this.page = "category-page";
              this.fetchCategoriesData();
              Swal.fire(
                'Deleted!',
                'Category has been deleted.',
                'success'
              )
            })
            .catch(err => {
              this.loadStatus = false;
              this.showErrorNotifciation(error);
            })
        }
      })
    },
    async updateFoodStatus(id, status, oldStatus) {
      Swal.fire({
        title: 'Are you sure?',
        text: `Change status from ${oldStatus} to ${status}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, change status to ${status}!`
      }).then((result) => {
        if (result.isConfirmed) {
          this.loadStatus = true;
          axios({
            method: 'PATCH',
            url: `${this.baseUrl}food/${id}/${status}`,
            headers: {
              access_token: localStorage.access_token
            }
          })
            .then(data => {
              this.loadStatus = false;
              this.page = "menu-page";
              this.showNotifciation("Successfully updated status");
              this.fetchFoodData();
              this.fetchHistoriesData();
            })
            .catch(error => {
              this.loadStatus = false;
              this.showErrorNotifciation(error);
              this.fetchFoodData();
            })
        }
      })
    },
    async handleCredentialResponse(response) {
      try {
        this.loadStatus = true;
        const {data} = await axios({
          method: "POST",
          url: `${this.baseUrl}login/google`,
          headers: {
            google_token : response.credential
          }
        })
        this.loadStatus = false;
        this.showNotifciation("Successfully signed in!");
        localStorage.setItem("access_token", data.access_token);
        this.page = "dashboard-page";
        this.fetchFoodData();
        this.fetchCategoriesData();
        this.fetchHistoriesData();
        this.fetchUserData();
        this.isLoggedIn = true;
      } catch (error) {
        this.loadStatus = false;
        this.showErrorNotifciation(error);
      }
    }
  }
}
</script>

<template>
  <!--preloader-->
  <loader v-if="loadStatus" />
  <!-- Navbar Section-->
  <navbar v-on:switchPage="switchPage" v-on:hideProfileBar="hideProfileBar" v-on:eventLogoutHandler="eventLogoutHandler"
    :isLoggedIn="isLoggedIn" :profileBarScrolled="profileBarScrolled" :user="user" :role="role"/>
  <!-- Register Section-->
  <register v-if="page === 'register-page'" v-on:eventRegisterHandler="eventRegisterHandler"
    v-on:switchPage="switchPage" />
  <!-- Login Section-->
  <login v-if="page === 'login-page'" v-on:switchPage="switchPage" v-on:eventLoginHandler="eventLoginHandler" :isLoggedIn="isLoggedIn" @handleCredentialResponse="handleCredentialResponse"/>
  <!-- Dashboard Section-->
  <dashboard v-if="page === 'dashboard-page'" v-on:switchPage="switchPage" :foodQty="food.length"
    :categoryQty="categories.length" />
  <!-- Menu Section-->
  <tablePreview v-if="page === 'menu-page'" v-on:switchPage="switchPage" :data="food" display="menu"
    v-on:editFood="editFood" v-on:updateFoodStatus="updateFoodStatus" :role="role" />
  <!-- Category Section-->
  <tablePreview v-if="page === 'category-page'" :data="categories" v-on:switchPage="switchPage" display="category"
    v-on:editCategory="editCategory" v-on:deleteCategory="deleteCategory" />
  <!-- History Section-->
  <tablePreview v-if="page === 'logs-page'" :data="histories" v-on:switchPage="switchPage" display="logs" />
  <!-- Add Food Section-->
  <formPage v-if="page === 'modify-food-page'" :categories="categories" v-on:saveFoodHandler="saveFoodHandler"
    v-on:switchPage="switchPage" :modifyType="'add-food'" />
  <!-- Edit Food Section-->
  <formPage v-if="page === 'edit-food-page'" :categories="categories" :foodDetail="foodDetail"
    v-on:switchPage="switchPage" :modifyType="'edit-food'" v-on:saveEditedFoodHandler="saveEditedFoodHandler" />
  <!-- Add Category Section-->
  <formPage v-if="page === 'modify-category-page'" v-on:switchPage="switchPage" :modifyType="'add-category'"
    v-on:saveCategoryHandler="saveCategoryHandler" />
  <!-- Edit Category Section-->
  <formPage v-if="page === 'edit-category-page'" :categoryData="categoryData" v-on:switchPage="switchPage"
    :modifyType="'edit-category'" v-on:saveEditedCategoryHandler="saveEditedCategoryHandler" />
</template>

<style scoped>

</style>