<template>
  <div>
    <div class="non-scrollable">
      <UiProblemCardAdd @clicked="addProblem" />
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
        <q-btn class="q-ml-md" flat padding="xs" icon="filter_alt" />
      </div>
    </div>
    <div class="scrollable-list">
      <UiProblemCard
        v-for="(value, key) in firebaseProblems"
        :key="key"
        :problemName="value.name"
        :problemGrade="value.grade"
        :problemGradeNum="value.gradeNum"
        :problemDate="value.createdAt"
        :problemDescription="value.description"
        :problemCreator="value.setter"
        :showDetails="false"
        @click="pickProblemHolds(key)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useSvgMarkerStore } from "../../stores/SvgMarkerStore";
import UiProblemCard from "./UiProblemCard.vue";
import UiProblemCardAdd from "./UiProblemCardAdd.vue";

const svgMarkerStore = useSvgMarkerStore();
const firebaseProblems = computed(() => {
  return svgMarkerStore.problemsFB;
});

const model = ref("Nyeste først");

const options = ["Nyeste først", "Grad stigende", "Grad synkende"];

const pickProblemHolds = (key: number | string) => {
  // readHoldsFromFirebase(key);
  svgMarkerStore.currentProblem = key;
  svgMarkerStore.tab = "tab3";
  readHoldsFromFirebase();
};

const readHoldsFromFirebase = async () => {
  svgMarkerStore.fetchProblemHoldsFromObject();
};

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
