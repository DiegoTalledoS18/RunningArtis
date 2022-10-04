<script>
  export default {
    methods:{
      goRoute(route){
        this.$router.push("/"+route)
      }
    }
  }
</script>

<template>
  <pv-toast/>
  <pv-toolbar>
    <template #start>
      <h3 style="margin: 0;color: cornflowerblue">Running Artist</h3>
    </template>

    <template #end>
      <pv-button style="border-radius: 2rem" @click="goRoute('home')">Home</pv-button>
      <pv-button style="border-radius: 2rem" @click="goRoute('business/challenges')">Challenges</pv-button>
    </template>
  </pv-toolbar>
  <router-view></router-view>
</template>

<style scoped>
</style>
