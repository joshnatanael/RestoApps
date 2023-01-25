<script>
export default{
  props: ["modifyType"],
  emits: ["switchPage"],
  methods: {
    switchPage(page){
      this.$emit("switchPage", page)
    },
    cancelHandler(){
      if(this.modifyType === "add-food" || this.modifyType === "edit-food"){
        this.switchPage('menu-page')
      }
      else{
        this.switchPage('category-page')
      }
    }
  }
}
</script>

<template>
  <button @click="cancelHandler" class="mt-4 bg-white p-4 rounded-full w-2/5 border-2 border-black border-solid" type="button">Cancel</button>
</template>