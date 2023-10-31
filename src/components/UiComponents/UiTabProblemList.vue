<template>
  <div>
    <div class="non-scrollable">
      <UiProblemCardAddButton @clicked="svgMarkerStore.createNewProblem()" />
      <div class="row">
        <q-select
          class="col-10"
          v-model="model"
          dense
          outlined
          :options="options"
          behavior="menu"
          color="black"
        />
        <q-btn
          disable
          class="q-ml-md"
          padding="xs"
          icon="filter_alt"
        />
      </div>
    </div>
    <div class="scrollable-list">

      <!-- <UiProblemCard
        v-for="(value, key) in firebaseProblems"
        :key="key"
        :problemId="value.problemId"
        :problemName="value.name"
        :problemGrade="value.grade"
        :problemGradeNum="value.gradeNum"
        :problemDate="value.createdAt"
        :problemDescription="value.description"
        :problemCreator="value.setter"
        :problemSet="value.set"
        :showDetails="false"
        :currentProblem="svgMarkerStore.currentProblem"
        @click="pickProblem(key.toString())"
      /> -->



      <UiProblemCard
        v-for="item in sortedProblems"
        :key="item.problemId"
        :problemId="item.problemId"
        :problemName="item.name"
        :problemGrade="item.grade"
        :problemGradeNum="item.gradeNum"
        :problemDate="item.createdAt"
        :problemDescription="item.description"
        :problemCreator="item.setter"
        :problemSet="item.set"
        :showDetails="false"
        :currentProblem="svgMarkerStore.currentProblem"
        @click="pickProblem(item.problemId)"
      />


    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useSvgMarkerStore } from "../../stores/SvgMarkerStore";
import type HoldMarkerFB from "../../types/Problem";
import UiProblemCard from "./UiProblemCard.vue";
import UiProblemCardAddButton from "./UiProblemCardAddButton.vue";

const svgMarkerStore = useSvgMarkerStore();
// const firebaseProblems = computed(() => {
//   return svgMarkerStore.problemsFB;
// });

const model = ref("Nyeste først");

const options = ["Nyeste først", "Eldste først", "Grad stigende", "Grad synkende"];

const pickProblem = (key: string) => {
  svgMarkerStore.currentProblem = key;
  svgMarkerStore.tab = "tab3";
  // select first hold of problem
  svgMarkerStore.selectedHoldFBId = Object.keys(
    svgMarkerStore.problemsFB[key].problemHolds,
  )[0];
};

const sortedProblems = computed(() => {
  const filteredObjects = Object.values(svgMarkerStore.problemsFB).filter(
    (a) => a.set === svgMarkerStore.currentSet,
  );
  console.log(filteredObjects);
  let sortArray: HoldMarkerFB[] = [];
  if (model.value === "Nyeste først") {
    sortArray = Object.values(filteredObjects).sort((a, b) => b.createdAtNum - a.createdAtNum);
  }else if(model.value === "Eldste først"){
    sortArray = Object.values(filteredObjects).sort((b, a) => b.createdAtNum - a.createdAtNum);
  }else if(model.value === "Grad stigende"){
    sortArray = Object.values(filteredObjects).sort((b, a) => b.gradeNum - a.gradeNum);
  }else if (model.value === "Grad synkende"){
    sortArray = Object.values(filteredObjects).sort((a, b) => b.gradeNum - a.gradeNum);
  }

  return sortArray


});

// const readHoldsFromFirebase = async () => {
//   svgMarkerStore.fetchProblemHoldsFromObject();
// };
</script>

<style scoped>
.non-scrollable {
  height: 120px;
}

.scrollable-list {
  overflow-y: auto;
  height: calc(100vh - 210px);
}
</style>
