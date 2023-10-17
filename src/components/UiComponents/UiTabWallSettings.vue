<template>
  <div>
    <div class="non-scrollable">
      <UiSetCardAddButton @clicked="addSet" />
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
      <UiSetCard
        v-for="(value, key) in firebaseSets"
        :key="key"
        :setName="value.name"
        :setActive="value.active"
      />
    </div>
  </div>

  <UiSetAddDialog />

  <!-- <q-input
    v-model="svgMarkerStore.wallWidth"
    color="black"
    dense
    outlined
  />

  <q-file
    v-model="file"
    dense
  /> -->
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useSvgMarkerStore } from "../../stores/SvgMarkerStore";
import UiSetCard from "./UiSetCard.vue";
import UiSetAddDialog from "./UiSetAddDialog.vue";

import UiSetCardAddButton from "./UiSetCardAddButton.vue";

const svgMarkerStore = useSvgMarkerStore();
// const file = ref(null);
const model = ref("Nyeste først");
const options = ["Nyeste først", "Grad stigende", "Grad synkende"];

const firebaseSets = computed(() => {
  return svgMarkerStore.setsFB;
});

const addSet = function () {
  svgMarkerStore.addSetDialog = true;
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
