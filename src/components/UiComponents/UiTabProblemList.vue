<template>
  <div>
    <div class="non-scrollable">
      <UiProblemCardAddButton @clicked="addProblem" />
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
        <q-btn class="q-ml-md" padding="xs" icon="filter_alt" />
      </div>
    </div>
    <div class="scrollable-list">
      <UiProblemCard
        v-for="(value, key) in firebaseProblems"
        :key="key"
        :problemId="key.toString()"
        :problemName="value.name"
        :problemGrade="value.grade"
        :problemGradeNum="value.gradeNum"
        :problemDate="value.createdAt"
        :problemDescription="value.description"
        :problemCreator="value.setter"
        :showDetails="false"
        :currentProblem="svgMarkerStore.currentProblem"
        @click="pickProblem(key.toString())"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useSvgMarkerStore } from "../../stores/SvgMarkerStore";
import UiProblemCard from "./UiProblemCard.vue";
import UiProblemCardAddButton from "./UiProblemCardAddButton.vue";

const svgMarkerStore = useSvgMarkerStore();
const firebaseProblems = computed(() => {
  return svgMarkerStore.problemsFB;
});

const model = ref("Nyeste først");

const options = ["Nyeste først", "Grad stigende", "Grad synkende"];

const pickProblem = (key: string) => {
  svgMarkerStore.currentProblem = key;
  svgMarkerStore.tab = "tab3";
  // select first hold of problem
  svgMarkerStore.selectedHoldFBId = Object.keys(
    svgMarkerStore.problemsFB[key].problemHolds,
  )[0];
};

// const readHoldsFromFirebase = async () => {
//   svgMarkerStore.fetchProblemHoldsFromObject();
// };

const addProblem = function () {
  svgMarkerStore.createNewProblem();
};
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
