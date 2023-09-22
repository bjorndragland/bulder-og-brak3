<template>
  <q-card flat class="my-card bg-grey-3">
    <!-- <p class="text-caption q-px-xs q-my-xs q-pt-xs q-mb-none ">Takmarkør</p> -->
    <!-- <p class="text-caption q-px-sm q-my-xs q-pt-xs q-mb-none ">Finjustering</p> -->
    <q-card-section>
      <div class="q-mt-none q-mb-md flex">
        <div>
          <q-btn
            class="q-px-xs q-mr-xs bg-white"
            icon="west"
            @click="svgMarkerStore.nudgeMarkerXMinusFB()"
          />
          <q-btn
            class="q-px-xs q-mx-xs bg-white"
            icon="south"
            @click="svgMarkerStore.nudgeMarkerYminusFB()"
          />
          <!-- icon="arrow_drop_up" -->
          <q-btn
            class="q-px-xs q-mx-xs bg-white"
            icon="north"
            @click="svgMarkerStore.nudgeMarkerYPlusFB()"
          />
          <q-btn
            class="q-px-xs q-ml-xs bg-white"
            icon="east"
            @click="svgMarkerStore.nudgeMarkerXPlusFB()"
          />
        </div>
        <q-space />
        <!-- <q-btn
          color="red"
          no-caps
          label="Slett markør"
          @click="deleteSelected"
        /> -->

        <q-btn
          class="q-px-sm q-mx-xs"
          color="red"
          icon="delete_outline"
          @click="deleteSelected"
        />
      </div>

      <q-slider
        v-model="sizeModel"
        class="q-my-md"
        color="black"
        markers
        :marker-labels="objMarkerLabel"
        snap
        :min="0"
        :max="4"
        @change="selectSize"
      />

      <q-btn-group push class="q-my-sm">
        <q-btn
          v-for="color in colors"
          :key="color.label"
          :label="color.label"
          :color="color.color"
          @click="selectColor(color.holdType)"
        />
      </q-btn-group>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSvgMarkerStore } from "../../stores/SvgMarkerStore";
const svgMarkerStore = useSvgMarkerStore();

const sizeModel = ref(0);
const objMarkerLabel = { 0: "XS", 1: "S", 2: "M", 3: "L", 4: "XL" };

const deleteSelected = () => {
  svgMarkerStore.deleteSelectedHold();
};

const colors = [
  { color: "light-green-6", label: "start", holdType: "start" },
  { color: "light-blue-7", label: "midt", holdType: "middle" },
  { color: "purple-5", label: "topp", holdType: "end" },
  { color: "orange-7", label: "fot", holdType: "foot" },
];

const selectSize = () => {
  svgMarkerStore.changeHoldSizeOfSelected(sizeModel.value);
};

const selectColor = (holdType: string) => {
  svgMarkerStore.changeHoldTypeOfSelected(holdType);
};
</script>

<style scoped></style>
