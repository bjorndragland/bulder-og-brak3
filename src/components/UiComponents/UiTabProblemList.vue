<template>
  <div>
    <q-btn
          label="hent data"
          @click="readFromFirebase"
        />

        <UiProblemCardAdd @clicked="addProblem" />

        <q-select
          v-model="model"
          dense
          outlined
          :options="options"
          behavior="menu"
          color="black"
        />



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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSvgMarkerStore } from '../../stores/SvgMarkerStore'
import UiProblemCard from './UiProblemCard.vue'
import UiProblemCardAdd from './UiProblemCardAdd.vue'

const svgMarkerStore = useSvgMarkerStore();
const firebaseProblems = computed(() => {
  return svgMarkerStore.problemsFB
})

const model = ref('Nyeste først')

const options = [
  'Nyeste først', 'Grad stigende', 'Grad synkende'
]

const readFromFirebase = async () => {
  svgMarkerStore.fetchProblemsFromFB()
}

const pickProblemHolds = (key: number | string) => {
  readHoldsFromFirebase(key);
  svgMarkerStore.currentProblem = key
  svgMarkerStore.tab = "tab3"
}

const readHoldsFromFirebase = async (key: string | number) => {
  svgMarkerStore.fetchProblemHoldsFromFB(key);
}

const addProblem = function () {
  svgMarkerStore.createNewProblem();
}

</script>

<style scoped>

</style>