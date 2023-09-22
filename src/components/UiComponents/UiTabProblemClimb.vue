<template>
  <q-tabs v-model="svgMarkerStore.appState" inline-label no-caps dense stretch>
    <q-tab name="info" icon="info" label="Info" />
    <q-tab name="edit" icon="mode_edit" label="Endre" />
  </q-tabs>
  <div>
    <div class="freePlace">
      <q-btn padding="sm" fab color="black" @click="zoomInOut">
        <SvgIconZoomIn v-if="svgMarkerStore.zoomFactor == 100" />
        <SvgIconZoomOut v-else />
      </q-btn>
    </div>
    <div class="fitIt">
      <SvgCanvas class="q-mt-xs" />
    </div>
  </div>
  <q-tab-panels v-model="svgMarkerStore.appState" animated>
    <q-tab-panel name="info" class="q-px-none q-py-xs">
      <UiProblemCard
        :problemName="selectedProbFB.name"
        :problemGrade="selectedProbFB.grade"
        :problemGradeNum="selectedProbFB.gradeNum"
        :problemDate="selectedProbFB.createdAt"
        :problemDescription="selectedProbFB.description"
        :problemCreator="selectedProbFB.setter"
        :showDetails="true"
      />

      <!-- <UiProblemPrevNext /> -->
    </q-tab-panel>

    <q-tab-panel name="edit" class="q-px-none q-py-xs">
      <q-card flat class="my-card">
        <UiMarkerEditor />
        <UiGradeSlider v-model="selectedProbFB.gradeNum" />
        <q-card-section class="q-pt-xs">
          <p class="q-mb-none q-mt-md">Problemnavn</p>
          <q-input v-model="selectedProbFB.name" color="black" dense outlined />

          <p class="q-mb-none q-mt-md">Kreatør</p>
          <q-input
            v-model="selectedProbFB.setter"
            color="black"
            dense
            outlined
          />

          <p class="q-mb-none q-mt-md">Beskrivelse</p>
          <q-input
            v-model="selectedProbFB.description"
            color="black"
            dense
            outlined
          />

          <p class="q-mb-none q-mt-md">Dato</p>
          <q-input
            v-model="selectedProbFB.createdAt"
            color="black"
            dense
            outlined
          />

          <q-btn
            class="q-mb-none q-mt-md"
            color="red"
            label="Slett"
            icon="delete"
            @click="deleteCurrentProblem"
          />

          <q-btn class="q-mb-none q-mt-md" color="black" label="avbryt" />

          <q-btn
            class="q-mb-none q-mt-md"
            color="green"
            label="lagre"
            icon="done"
            @click="saveBackToFirebase"
          />
        </q-card-section>
      </q-card>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSvgMarkerStore } from "../../stores/SvgMarkerStore";
import SvgCanvas from "@/components/SvgComponents/SvgCanvas.vue";
import UiProblemCard from "./UiProblemCard.vue";

import SvgIconZoomIn from "@/components/SvgComponents/SvgIconZoomIn.vue";
import SvgIconZoomOut from "@/components/SvgComponents/SvgIconZoomOut.vue";
import UiMarkerEditor from "./UiMarkerEditor.vue";
import UiGradeSlider from "./UiGradeSlider.vue";
// import UiProblemPrevNext from './UiProblemPrevNext.vue'

const svgMarkerStore = useSvgMarkerStore();

const zoomInOut = () => {
  if (svgMarkerStore.zoomFactor == 100) {
    svgMarkerStore.zoomFactor = 160;
  } else {
    svgMarkerStore.zoomFactor = 100;
  }
};

const selectedProbFB = computed(() => {
  return svgMarkerStore.problemsFB[svgMarkerStore.currentProblem];
});

const deleteCurrentProblem = function () {
  svgMarkerStore.deleteCurrentProblemFromFB();
  svgMarkerStore.tab = "tab2";
  svgMarkerStore.deleteCurrentProblemFromLocal();
};

const saveBackToFirebase = () => {
  svgMarkerStore.saveInfoBackToFirebase();
};
</script>

<style scoped>
.fitIt {
  /* width: 120%; */
  overflow: scroll;
}

.freePlace {
  position: absolute;
  top: 50px;
  left: 22px;
}
</style>
