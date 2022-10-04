<template>
  <div style="display: flex; justify-content: space-evenly;margin-top: 5rem">
    <pv-card style="border-radius: 1rem;padding: 1rem">
      <template #title>Individual Challenges</template>
      <template #content>
        <p>Cantidad: {{ individualChallenges }}</p>
      </template>
    </pv-card>
    <pv-card style="border-radius: 1rem;padding: 1rem">
      <template #title>Team Challenges</template>
      <template #content>
        <p>Cantidad: {{ teamChallenges }}</p>
      </template>
    </pv-card>
  </div>

</template>

<script>
import {ChallengesServices} from "@/services/challenges-services";
export default {
  name: "home",
  data(){
    return{
      challenges:null,
      individualChallenges:0,
      teamChallenges:0,
    }
  },
  methods:{
    getNumbers(len){
      console.log(len)
      for(let i=0;i<len;i++){
        if(this.challenges[i].challengeType==="individual"){
          this.individualChallenges++
        }
        else {
          this.teamChallenges++
        }
      }
    }
  },
  created() {
    new ChallengesServices().getChallenges().then(response=>{
      this.challenges=response.data
      this.getNumbers(response.data.length)
    })
  }
}
</script>

<style scoped>

</style>