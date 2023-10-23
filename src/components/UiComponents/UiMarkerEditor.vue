<template>
  <q-card flat class="my-card bg-grey-3">
    <!-- <p class="text-caption q-px-sm q-pt-xs q-mb-none ">Markører</p> -->
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

        <q-btn
          class="q-px-sm q-mx-xs"
          color="red"
          icon="delete_outline"
          @click="deleteSelected"
        />
      </div>

      <q-btn-toggle
        class="q-my-md"
        v-model="typeOfHolds"
        toggle-color="grey-9"
        :ripple="false"
        :options="[
          { value: 0, slot: 'one' },
          { value: 1, slot: 'two' },
          { value: 2, slot: 'three' },
          { value: 3, slot: 'four' },
        ]"
      >
        <template v-slot:one>
          <div class="hold-start hold-common"></div>
          <br />
          <div class="text-center">Start</div>
        </template>
        <template v-slot:two>
          <div class="hold-midt hold-common"></div>
          <br />
          <div class="text-center">Midt</div>
        </template>

        <template v-slot:three>
          <div class="hold-topp hold-common"></div>
          <br />
          <div class="text-center">Topp</div>
        </template>
        <template v-slot:four>
          <div class="hold-fot hold-common"></div>
          <br />
          <div class="text-center">Fot</div>
        </template>
      </q-btn-toggle>

      <q-slider
        v-model="sizeOfHolds"
        class="q-my-md q-px-sm"
        color="black"
        markers
        :marker-labels="objMarkerLabel"
        snap
        :min="0"
        :max="4"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSvgMarkerStore } from "../../stores/SvgMarkerStore";
const svgMarkerStore = useSvgMarkerStore();

const objMarkerLabel = { 0: "XS", 1: "S", 2: "M", 3: "L", 4: "XL" };

const deleteSelected = () => {
  svgMarkerStore.deleteSelectedHold();
};

const sizeOfHolds = computed({
  get() {
    return svgMarkerStore.getHoldSizeOfSelected;
  },
  set(value) {
    svgMarkerStore.setHoldSizeOfSelected(value);
  },
});

const typeOfHolds = computed({
  get() {
    return svgMarkerStore.getHoldTypeOfSelected;
  },
  set(value) {
    svgMarkerStore.setHoldTypeOfSelected(value);
  },
});
</script>

<style scoped>
.move-left {
  transform: translate(-5px 0px);
}

.hold-common {
  margin-left: 6px;
  margin-right: 6px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: inline-block;
}

.hold-start {
  background-color: #8bc34a;
}

.hold-midt {
  background-color: #039be5;
}

.hold-topp {
  background-color: #ab47bc;
}

.hold-fot {
  background-color: #fb8c00;
}
</style>
