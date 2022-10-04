<template>
  <div>
    <div class="card">
      <pv-toolbar class="mb-4">
        <template #start>
          <pv-button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="showAddChallengeDialog" />
        </template>
      </pv-toolbar>
      <!--div>
        <pv-data-table :value="challenges" responsiveLayout="scroll">
          <pv-column field="id" header="Code"></pv-column>
          <pv-column field="title" header="Name"></pv-column>
          <pv-column field="businessId" header="Category"></pv-column>
          <pv-column field="urlToImage" header="Quantity"></pv-column>
          <pv-column field="challengeType" header="Quantity"></pv-column>
        </pv-data-table>
      </div-->
      <pv-data-table
          ref="dt"
          :value="challenges"
          datakey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 15]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tutorials"
          responsiveLayout="scroll"
       style="margin: 1.5rem">
        <template #header>
          <div class="table-header flex flex-column md:flex-row md:justify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">Manage Challenges</h5>
          </div>
        </template>

        <pv-column field="id" header="id" :sortable="true" style="min-width: 12rem"></pv-column>
        <pv-column field="title" header="Title" :sortable="true" style="min-width: 16rem"></pv-column>
        <pv-column field="businessId" header="BusinessId" :sortable="true" style="min-width: 16rem"></pv-column>
        <pv-column header="Image">
          <template #body="slotProps">
            <img src="{{slotProps.data.urlToImage.stringify()}}" class="product-image" />
          </template>
        </pv-column>
        <pv-column field="challengeType" header="ChallengeType" :sortable="true" style="min-width: 12rem">
          <template #body="slotProps">
            <pv-tag v-if="slotProps.data.challengeType === 'team'" severity="success">{{ slotProps.data.challengeType.toUpperCase()}}</pv-tag>
            <pv-tag v-else severity="info">{{ slotProps.data.challengeType.toUpperCase() }}</pv-tag>
          </template>
        </pv-column>
        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <pv-button icon="pi pi-pencil" class="p-button-text p-button-rounded" @click="showEditChallengeDialog(slotProps.data)"/>
            <pv-button icon="pi pi-trash" class="p-button-text p-button-rounded" @click="showDeleteChallengeDialog(slotProps.data)"/>
          </template>
        </pv-column>

        <pv-dialog v-model:visible="addChallengeDialog" :style="{ width: '450px'}" header="Add Challenge" :modal="true" class="p-fluid">
          <template #header>Add a Challenge</template>
          <div class="field" style="margin: 2rem 0">
            <span class="p-float-label">
              <pv-input-text type="text" id="title" v-model="challengeTitle" required="true"/>
              <label for="title">Title</label>
            </span>
          </div>
          <div class="field mt-3" style="margin: 2rem 0">
            <span class="p-float-label">
              <pv-input-text type="number" id="businessId" v-model="challengeBusinessId" required="true"/>
              <label for="title">BusinessID</label>
            </span>
          </div>
          <div class="field mt-3" style="margin: 2rem 0">
            <pv-dropdown v-model="selectedChallengeType" :options="challengeType" optionLabel="name" optionValue="name" placeholder="Select type"></pv-dropdown>
          </div>
          <template #footer>
            <pv-button :label="'Cancel'.toUpperCase()" icon="pi pi-times" class="p-button-text" @click="CancelChallenge" />
            <pv-button :label="'Save'.toUpperCase()" icon="pi pi-check" class="p-button-text" @click="saveNewChallenge" />
          </template>
        </pv-dialog>
        <pv-dialog v-model:visible="editChallengeDialog" :style="{ width: '450px'}" header="Edit Challenge" :modal="true" class="p-fluid">
          <div class="field" style="margin: 2rem 0">
            <span class="p-float-label">
              <pv-input-text type="text" id="title" v-model="challengeTitle" required="true"/>
              <label for="title">Title</label>
            </span>
          </div>
          <div class="field mt-3" style="margin: 2rem 0">
            <span class="p-float-label">
              <pv-input-text type="number" id="businessId" v-model="challengeBusinessId" required="true"/>
              <label for="title">BusinessID</label>
            </span>
          </div>
          <div class="field mt-3" style="margin: 2rem 0">
            <pv-dropdown v-model="selectedChallengeType" :options="challengeType" optionLabel="name" optionValue="name" placeholder="Select type"></pv-dropdown>
          </div>
          <template #footer="slotProps">
            <pv-button :label="'Cancel'.toUpperCase()" icon="pi pi-times" class="p-button-text" @click="CancelChallenge" />
            <pv-button :label="'Save'.toUpperCase()" icon="pi pi-check" class="p-button-text" @click="editChallenge" />
          </template>
        </pv-dialog>
        <pv-dialog v-model:visible="deleteChallengeDialog" :style="{ width: '450px'}" header="Delete Challenge" :modal="true" class="p-fluid">
          <template #header="slotProps"> Delete {{challengeTitle}} ?</template>
          <template #footer="slotProps">
            <pv-button :label="'Cancel'.toUpperCase()" icon="pi pi-times" class="p-button-text" @click="CancelChallenge" />
            <pv-button :label="'Save'.toUpperCase()" icon="pi pi-check" class="p-button-text" @click="deleteChallenge" />
          </template>
        </pv-dialog>


      </pv-data-table>
    </div>
  </div>
</template>


<script>
import {ChallengesServices} from "@/services/challenges-services";
export default {
  name: "challenges",

  data(){
    return{
      challenges:null,
      selectedChallenges: null,
      challenge: {},
      filters: {},
      addChallengeDialog:false,
      editChallengeDialog:false,
      deleteChallengeDialog:false,
      challengeType:[
        {name: "individual"},
        {name: "team"}
      ],
      selectedChallengeType:null,
      challengeTitle:null,
      challengeBusinessId:null,
      challengeId:null

    }
  },
  methods:{
    showAddChallengeDialog(){
      this.addChallengeDialog=true
      this.resetInfo()
    },
    showDeleteChallengeDialog(data){
      this.challengeId=data.id
      this.challengeTitle=data.title
      this.deleteChallengeDialog=true
    },
    showEditChallengeDialog(data){
      this.challengeId=data.id
      this.challengeTitle=data.title
      this.challengeBusinessId=data.businessId
      this.selectedChallengeType=data.challengeType
      this.editChallengeDialog=true

    },
    saveNewChallenge(){
      this.challengeBusinessId=parseInt(this.challengeBusinessId)
      new ChallengesServices().postChallenge(this.challengeTitle,this.challengeBusinessId,"",this.selectedChallengeType).then(response=>{
        console.log("Challenge added successfully")
        this.challenges.push(response.data)
        this.$toast.add({severity:'success', summary: 'Challenge added', detail:'successfully', life: 3000});
      })
      this.resetInfo()
      this.addChallengeDialog=false
    },
    editChallenge(){
      console.log(this.challengeId)
      this.challengeBusinessId=parseInt(this.challengeBusinessId,)
      new ChallengesServices().updateChallenge(this.challengeId,this.challengeTitle,this.challengeBusinessId,"",this.selectedChallengeType).then(response=>{
        console.log("Challenge edited successfully")
        this.challenges[this.findIndexById(response.data.id)]=response.data;
        this.resetInfo()
        this.editChallengeDialog=false
      })

    },
    deleteChallenge(){
      new ChallengesServices().deleteChallenge(this.challengeId).then(response=>{
        console.log("Challenge deleted successfully")
        this.challenges = this.challenges.filter(
            (t) => t.id !== this.challengeId
        );
        this.resetInfo()
        this.deleteChallengeDialog=false
      })

    },
    CancelChallenge(){
      this.resetInfo()
      this.addChallengeDialog=false
      this.editChallengeDialog=false
      this.deleteChallengeDialog=false
    },
    resetInfo(){
      this.challengeId=null
      this.challengeTitle=null
      this.challengeBusinessId=null
      this.selectedChallengeType=null
    },
    findIndexById(id) {
      return this.challenges.findIndex((challenge) => challenge.id === id);
    }
  },
  created() {
    new ChallengesServices().getChallenges().then(response=>{
      this.challenges=response.data;
      console.log(this.challenges)
    })
  }
}
</script>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
  width: 50px;
  margin: 0 auto 2rem auto;
  display: block;
}


</style>