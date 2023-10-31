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
    <!-- <div
      v-if="svgMarkerStore.appState == 'edit'"
      class="bg-grey-9 text-white instruction-text"
    >
      <q-icon name="info" class="q-ml-sm" />
      Klikk på bildet for å legge til, eller dra for å flytte på markør
    </div> -->
  </div>
  <q-tab-panels v-model="svgMarkerStore.appState" animated>
    <q-tab-panel name="info" class="q-px-none q-py-xs">
      <UiProblemCard
        :problemId="selectedProbFB.problemId"
        :problemName="selectedProbFB.name"
        :problemGrade="selectedProbFB.grade"
        :problemGradeNum="selectedProbFB.gradeNum"
        :problemDate="selectedProbFB.createdAt"
        :problemDescription="selectedProbFB.description"
        :problemCreator="selectedProbFB.setter"
        :problemSet="selectedProbFB.set"
        :showDetails="true"
        :currentProblem="svgMarkerStore.currentProblem"
      />

      <UiProblemPrevNext />
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
          <div class="row">
            <q-input
              class="q-pr-sm"
              dense
              outlined
              hide-bottom-space
              v-model="createDate"
              :rules="[dateRule]"
              mask="##/##/####"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <!-- v-model="dateProblemCreate" -->
                    <q-date
                      v-model="createDate"
                      color="light-blue-9"
                      mask="DD/MM/YYYY"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="light-blue-9"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-btn
              disabled
              class="q-px-xs q-mr-xs"
              padding="sm"
              @click="
                selectedProbFB.createdAt =
                  svgMarkerStore.inputTodaysDate().dateString
              "
              >i dag</q-btn
            >
          </div>

          <!-- <q-btn @click="dateProblemCreate = inputTodaysDate()">i dag</q-btn> -->

          <q-btn
            class="q-mb-none q-mt-md"
            color="blue"
            label="Kopier til nyeste sett"
            @click="deleteCurrentProblem"
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
            @click="saveProblemBackToFirebase"
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
import UiProblemPrevNext from "./UiProblemPrevNext.vue";
const svgMarkerStore = useSvgMarkerStore();
// const dateProblemCreate = ref("01/02/2023");

const dateRule = (val: string) => {
  const pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return pattern.test(val) || "Date format must be DD/MM/YYYY";
};

const createDate = computed({
  get() {
    const date = new Date(
      svgMarkerStore.problemsFB[svgMarkerStore.currentProblem].createdAtNum,
    );
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  },
  set(value) {
    const [day, month, year] = value.split("/").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    svgMarkerStore.problemsFB[svgMarkerStore.currentProblem].createdAtNum =
      date.getTime();
  },
});

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

const saveProblemBackToFirebase = () => {
  svgMarkerStore.saveProblemBackToFirebase();
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

.instruction-text {
  font-size: 0.8em;
}
</style>
