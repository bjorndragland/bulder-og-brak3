<template>
  <div class="down-scaled">
    <svg viewBox="0 0 1352 1513">
      <defs>
        <filter
          id="bwfilter"
          filterUnits="objectBoundingBox"
          color-interpolation-filters="sRGB"
        >
          <!-- saturation -->
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <image
        id="svgimage2"
        :href="wallImage"
        width="1352"
        height="1513"
        x="0"
        y="0"
        preserveAspectRatio="xMidYMid meet"
        filter="url(#bwfilter)"
      />
      <rect x="0" y="0" width="1352" height="1513" fill="white" opacity="0.3" />
      <g v-for="(value, key) in objOfHoldsFB2" :key="key">
        <SvgHoldMarker
          :markerX="value.posX"
          :markerY="value.posY"
          :markerSizeNum="value.sizeNum"
          :markerId="key.toString()"
          :markerTypeNum="value.typeNum"
          :markerThumb="true"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSvgMarkerStore } from "../../stores/SvgMarkerStore";
import SvgHoldMarker from "./SvgHoldMarker.vue";

const svgMarkerStore = useSvgMarkerStore();
const wallImage = svgMarkerStore.setImageUrls[svgMarkerStore.currentSet];

// const objOfHoldsFB = computed(() => {
//   if (svgMarkerStore.problemHoldsFB) {
//     return svgMarkerStore.problemHoldsFB;
//   } else {
//     return null;
//   }
// });

const objOfHoldsFB2 = computed(() => {
  if (svgMarkerStore.problemsFB) {
    return svgMarkerStore.problemsFB[props.problemId].problemHolds;
  } else {
    return null;
  }
});

const props = defineProps({
  problemId: {
    required: true,
    type: String,
  },
});
</script>

<style scoped>
.down-scaled {
  width: 64px;
}

svg {
  width: 100%;
}
</style>
