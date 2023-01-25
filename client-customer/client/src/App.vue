<script>
import NavBar from './components/NavBar.vue';
import loader from './components/loader.vue';
import {mapState} from 'pinia';
import {useCounterStore} from '@/stores/counter';
export default{
  components: {
    NavBar,
    loader
  },
  computed: {
    ...mapState(useCounterStore, ["loadStatus"])
  }
}
</script>

<template>
  <loader v-if="loadStatus"/>
  <NavBar/>
  <router-view/>
</template>

<style>

</style>