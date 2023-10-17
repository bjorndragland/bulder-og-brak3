<template>
  <g :transform-origin="originString" :transform="scaleString">
    <circle
      :id="props.markerId.toString()"
      class="draggableC"
      :cx="props.markerX"
      :cy="props.markerY"
      :r="sizeToRadius"
      :fill="typeToColor"
      :fill-opacity="showFill"
      :stroke="typeToColor"
      stroke-width="4px"
      pointer-events="visible"
    />

    <circle
      :id="props.markerId.toString()"
      class="draggableC"
      :cx="props.markerX"
      :cy="props.markerY"
      :r="sizeToRadius - 1"
      fill="grey"
      fill-opacity="0"
      stroke="white"
      stroke-width="2px"
      stroke-opacity="1"
      pointer-events="visible"
      stroke-dasharray="4 2"
    />

    <g v-if="holdIsSelected && svgMarkerStore.appState == 'edit'">
      <!-- upper left tick -->
      <polyline
        :stroke="typeToColor"
        stroke-width="4px"
        fill="none"
        :points="`${markerX - sizeToRadius - 2},${markerY - sizeToRadius / 2} ${
          markerX - sizeToRadius - 2
        },
                ${markerY - sizeToRadius - 2} ${markerX - sizeToRadius / 2}, ${
                  markerY - sizeToRadius - 2
                }`"
      />
      <polyline
        stroke="white"
        stroke-width="2px"
        fill="none"
        :points="`${markerX - sizeToRadius - 1},${markerY - sizeToRadius / 2} ${
          markerX - sizeToRadius - 1
        },
                ${markerY - sizeToRadius - 1} ${markerX - sizeToRadius / 2}, ${
                  markerY - sizeToRadius - 1
                }`"
      />

      <!-- upper right tick -->
      <polyline
        :stroke="typeToColor"
        stroke-width="4px"
        fill="none"
        :points="`${markerX + sizeToRadius + 2},${markerY - sizeToRadius / 2} ${
          markerX + sizeToRadius + 2
        },
                ${markerY - sizeToRadius - 2} ${markerX + sizeToRadius / 2}, ${
                  markerY - sizeToRadius - 2
                }`"
      />
      <polyline
        stroke="white"
        stroke-width="2px"
        fill="none"
        :points="`${markerX + sizeToRadius + 1},${markerY - sizeToRadius / 2} ${
          markerX + sizeToRadius + 1
        },
                ${markerY - sizeToRadius - 1} ${markerX + sizeToRadius / 2}, ${
                  markerY - sizeToRadius - 1
                }`"
      />

      <!-- lower left tick -->
      <polyline
        :stroke="typeToColor"
        stroke-width="4px"
        fill="none"
        :points="`${markerX - sizeToRadius - 2},${markerY + sizeToRadius / 2} ${
          markerX - sizeToRadius - 2
        },
                ${markerY + sizeToRadius + 2} ${markerX - sizeToRadius / 2}, ${
                  markerY + sizeToRadius + 2
                }`"
      />
      <polyline
        stroke="white"
        stroke-width="2px"
        fill="none"
        :points="`${markerX - sizeToRadius - 1},${markerY + sizeToRadius / 2} ${
          markerX - sizeToRadius - 1
        },
                ${markerY + sizeToRadius + 1} ${markerX - sizeToRadius / 2}, ${
                  markerY + sizeToRadius + 1
                }`"
      />

      <!-- lower right tick -->
      <polyline
        :stroke="typeToColor"
        stroke-width="4px"
        fill="none"
        :points="`${markerX + sizeToRadius + 2},${markerY + sizeToRadius / 2} ${
          markerX + sizeToRadius + 2
        },
                ${markerY + sizeToRadius + 2} ${markerX + sizeToRadius / 2}, ${
                  markerY + sizeToRadius + 2
                }`"
      />
      <polyline
        stroke="white"
        stroke-width="2px"
        fill="none"
        :points="`${markerX + sizeToRadius + 1},${markerY + sizeToRadius / 2} ${
          markerX + sizeToRadius + 1
        },
                ${markerY + sizeToRadius + 1} ${markerX + sizeToRadius / 2}, ${
                  markerY + sizeToRadius + 1
                }`"
      />
    </g>
  </g>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSvgMarkerStore } from "@/stores/SvgMarkerStore";

const svgMarkerStore = useSvgMarkerStore();

// const radiusFactor = computed(() => {
//   return 4
// })

const originString = computed(() => {
  return props.markerX + " " + props.markerY;
});
const scaleString = computed(() => {
  let scaleComponent = svgMarkerStore.markerScale;
  return `scale(${scaleComponent} ${scaleComponent})`;
});

const props = defineProps({
  markerId: {
    required: true,
    type: Number,
  },
  markerX: {
    required: true,
    type: Number,
  },
  markerY: {
    required: true,
    type: Number,
  },
  markerSize: {
    required: true,
    type: String,
  },
  markerSizeNum: {
    required: true,
    type: Number,
  },
  markerType: {
    required: true,
    type: String,
  },
  markerTypeNum: {
    required: true,
    type: Number,
  },
  markerThumb: {
    required: true,
    type: Boolean,
  },
});

const showFill = computed(() => {
  if (props.markerThumb) {
    return 1;
  } else {
    return 0;
  }
});

const sizeToRadius = computed(() => {
  let theRadius: number = 10;
  if (props.markerSizeNum === 0) {
    theRadius = 10;
  } else if (props.markerSizeNum === 1) {
    theRadius = 13;
  } else if (props.markerSizeNum === 2) {
    theRadius = 16;
  } else if (props.markerSizeNum === 3) {
    theRadius = 21;
  } else if (props.markerSizeNum === 4) {
    theRadius = 26;
  }
  return theRadius;
});

const typeToColor = computed(() => {
  let theColor: string = "#039be5";
  if (props.markerTypeNum === 0) {
    theColor = "#8bc34a";
  } else if (props.markerTypeNum === 1) {
    theColor = "#039be5";
  } else if (props.markerTypeNum === 2) {
    theColor = "#ab47bc";
  } else if (props.markerTypeNum === 3) {
    theColor = "#fb8c00";
  }
  return theColor;
});

const holdIsSelected = computed(() => {
  // debugger;
  if (props.markerId === svgMarkerStore.selectedHoldFBId) {
    return true;
  } else {
    return false;
  }
});
</script>

<style scoped></style>
