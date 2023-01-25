import { defineStore } from 'pinia';
import axios from 'axios';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    baseUrl: `https://restaurantapp-db-production.up.railway.app/customers/`,
    food: [],
    favourites: [],
    register: {
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: ""
    },
    login: {
      email: "",
      password: ""
    },
    user: "Guest",
    profileBarScrolled: false,
    foodDetail: {},
    categories: [],
    totalFood: 0,
    loadStatus: false,
    barcodeLink: "",
    deployedLink: `https://restoapp-customer-v1.web.app`
  }),
  getters: {
  },
  actions: {
    errorNotification(error){console.log(error);
      let errorMessage = "Internal Server Error";
      if(error === "Please sign in first!"){
        errorMessage = "Please sign in first!";
      }
      else if (error.response.status === 401) {
        if (!error.response.data.message.name) {
          errorMessage = error.response.data.message;
        }
        else {
          errorMessage = error.response.data.message.name;
        }
      }
      else if (error.response.status === 403 || error.response.status === 404) {
        this.router.push('/notFound');
        errorMessage = error.response.data.message;
      }
      else if (error.response.data.message === "Already exist") {
        errorMessage = "Already added to favourites";
      }
      else if (error.response.status === 400) {
        if(Array.isArray(error.response.data)){
          errorMessage = error.response.data.message[0];
        }
        else{
          errorMessage = error.response.data.message;
        }
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
    okNotification(message){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        toast: true,
        title: message,
        showConfirmButton: false,
        timer: 1500
      })
    },
    async registerHandler(){
      try {
        const {username, email, password, phoneNumber, address} = this.register;
        this.loadStatus = true;
        await axios({
          method: "POST",
          url: `${this.baseUrl}register`,
          data: {
            username,
            email,
            password,
            phoneNumber,
            address
          }
        })
        this.loadStatus = false;
        this.router.push('/login');
        this.okNotification("Successfully Registered!")
        this.register.username = "";
        this.register.email = "";
        this.register.password = "";
        this.register.phoneNumber = "";
        this.register.addres = "";
      } catch (error) {
        this.loadStatus = false;
        this.errorNotification(error);
      }
    },
    async loginHandler(){
      try {
        this.loadStatus = true;
        const {data} = await axios({
          method: "POST",
          url: `${this.baseUrl}login`,
          data: {
            email: this.login.email,
            password: this.login.password
          }
        })
        localStorage.setItem("access_token", data.access_token);
        this.fetchUserData();
        this.router.push('/');
        this.loadStatus = false;
        this.okNotification("Successfully Logged in!")
        this.login.email = "";
        this.login.password = "";
      } catch (error) {
        this.loadStatus = false;
        this.errorNotification(error);
      }
    },
    async fetchFood(payload){
      try {
        this.loadStatus = true;
        const {data} = await axios({
          method: 'GET',
          url: `${this.baseUrl}food`,
          params: payload
        })
        this.food = data.food;
        this.totalFood = data.totalFood;
        this.loadStatus = false;
      } catch (error) {
        this.loadStatus = false;
        this.errorNotification(error);
      }
    },
    async addToFavourite(id){
      try {
        if(!localStorage.access_token){
          this.errorNotification("Please sign in first!");
          return this.router.push('/login')
        }
        this.loadStatus = true;
        await axios({
          method: "POST",
          url: `${this.baseUrl}favourites/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.router.push('/favourites')
        this.loadStatus = false;
        this.okNotification("Successfully added to favourite!")
      } catch (error) {
        this.loadStatus = false;
        this.errorNotification(error);
      }
    },
    async fetchFavouritesFood(){
      try {
        this.loadStatus = true;
        const {data} = await axios({
          method: 'GET',
          url: `${this.baseUrl}favourites`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.favourites = data;
        this.loadStatus = false;
      } catch (error) {
        this.loadStatus = false;
        this.errorNotification(error);
      }
    },
    async fetchUserData(){
      try {
        this.loadStatus = true;
        const {data} = await axios({
          method: "GET",
          url: `${this.baseUrl}users`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        if(data.user){
          this.user = data.user;
        }
        this.loadStatus = false;
      } catch (error) {
        this.loadStatus = false;
        this.errorNotification(error);
      }
    },
    logoutHandler(){
      this.loadStatus = true;
      localStorage.removeItem("access_token");
      this.user = "Guest";
      this.router.push('/login');
      this.profileBarScrolled = false;
      this.loadStatus = false;
      this.okNotification("Successfully logged out!")
    },
    hideProfileBar() {
      if (this.profileBarScrolled) {
        return this.profileBarScrolled = false
      }
      this.profileBarScrolled = true;
    },
    async fetchFoodDetail(id){
      try {
        this.loadStatus = true;
        const {data} = await axios({
          method: 'GET',
          url: `${this.baseUrl}food/${id}`,
        })
        this.foodDetail = data;
        this.loadStatus = false;
      } catch (error) {
        this.loadStatus = false;
        this.errorNotification(error);
      }
    },
    async deleteFavourite(id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        this.loadStatus = true;
        axios({
          method: "DELETE",
          url: `${this.baseUrl}favourites/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
          .then(_=>{
            this.fetchFavouritesFood();
            this.loadStatus = false;
          })
          .catch(error=>{
            this.loadStatus = false;
            this.errorNotification(error);
          })
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
        localStorage.setItem("access_token", data.access_token);
        this.fetchUserData();
        this.router.push('/');
        this.loadStatus = false;
        this.okNotification("Successfully logged in!")
      } catch (error) {
        this.loadStatus = false;
        this.errorNotification(error);
      }
    },
    formatNumber(number){
      return number.toLocaleString("da-DK")
    },
    async fetchCategories(){
      try {
        this.loadStatus = true;
        const {data} = await axios({
          method: "GET",
          url: `${this.baseUrl}categories`,
        })
        this.categories = data;
        this.loadStatus = false;
      } catch (error) {
        this.loadStatus = false;
        this.errorNotification(error);
      }
    },
    async fetchBarcode(path){
      try {
        this.loadStatus = true;
        const {data} = await axios({
          method: "GET",
          url: `https://api.happi.dev/v1/qrcode?data=${this.deployedLink}${path}&width=&dots=000000&bg=FFFFFF&apikey=99f3b3dKIpuVbgVCFpsTrCiVuino1oVK7lAKZqSMh5D09Q7NnRmp9CXm`,
        })
        this.barcodeLink = data.qrcode;
        this.loadStatus = false;
      } catch (error) {
        this.loadStatus = false;
        this.errorNotification(error.text);
      }
    }
  }
})