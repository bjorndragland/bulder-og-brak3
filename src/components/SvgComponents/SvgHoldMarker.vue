<template>
  <g
    :transform-origin="originString"
    :transform="scaleString"
  >
    <circle
      :id="props.markerId"
      class="draggableC"
      :cx="props.markerX"
      :cy="props.markerY"
      :r="sizeToRadius"
      fill="grey"
      fill-opacity="0"
      :stroke="typeToColor"
      stroke-width="4px"
      pointer-events="visible"
    />

    <circle
      :id="props.markerId"
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
        :points="`${markerX - sizeToRadius - 2},${markerY - sizeToRadius / 2} ${markerX - sizeToRadius - 2},
        ${markerY - sizeToRadius - 2} ${markerX - sizeToRadius / 2}, ${markerY - sizeToRadius - 2}`"
      />
      <polyline
        stroke="white"
        stroke-width="2px"
        fill="none"
        :points="`${markerX - sizeToRadius - 1},${markerY - sizeToRadius / 2} ${markerX - sizeToRadius - 1},
        ${markerY - sizeToRadius - 1} ${markerX - sizeToRadius / 2}, ${markerY - sizeToRadius - 1}`"
      />

      <!-- upper right tick -->
      <polyline
        :stroke="typeToColor"
        stroke-width="4px"
        fill="none"
        :points="`${markerX + sizeToRadius + 2},${markerY - sizeToRadius / 2} ${markerX + sizeToRadius + 2},
        ${markerY - sizeToRadius - 2} ${markerX + sizeToRadius / 2}, ${markerY - sizeToRadius - 2}`"
      />
      <polyline
        stroke="white"
        stroke-width="2px"
        fill="none"
        :points="`${markerX + sizeToRadius + 1},${markerY - sizeToRadius / 2} ${markerX + sizeToRadius + 1},
        ${markerY - sizeToRadius - 1} ${markerX + sizeToRadius / 2}, ${markerY - sizeToRadius - 1}`"
      />

      <!-- lower left tick -->
      <polyline
        :stroke="typeToColor"
        stroke-width="4px"
        fill="none"
        :points="`${markerX - sizeToRadius - 2},${markerY + sizeToRadius / 2} ${markerX - sizeToRadius - 2},
        ${markerY + sizeToRadius + 2} ${markerX - sizeToRadius / 2}, ${markerY + sizeToRadius + 2}`"
      />
      <polyline
        stroke="white"
        stroke-width="2px"
        fill="none"
        :points="`${markerX - sizeToRadius - 1},${markerY + sizeToRadius / 2} ${markerX - sizeToRadius - 1},
        ${markerY + sizeToRadius + 1} ${markerX - sizeToRadius / 2}, ${markerY + sizeToRadius + 1}`"
      />

      <!-- lower right tick -->
      <polyline
        :stroke="typeToColor"
        stroke-width="4px"
        fill="none"
        :points="`${markerX + sizeToRadius + 2},${markerY + sizeToRadius / 2} ${markerX + sizeToRadius + 2},
        ${markerY + sizeToRadius + 2} ${markerX + sizeToRadius / 2}, ${markerY + sizeToRadius + 2}`"
      />
      <polyline
        stroke="white"
        stroke-width="2px"
        fill="none"
        :points="`${markerX + sizeToRadius + 1},${markerY + sizeToRadius / 2} ${markerX + sizeToRadius + 1},
        ${markerY + sizeToRadius + 1} ${markerX + sizeToRadius / 2}, ${markerY + sizeToRadius + 1}`"
      />
    </g>
  </g>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSvgMarkerStore } from '@/stores/SvgMarkerStore';

const svgMarkerStore = useSvgMarkerStore()

// const radiusFactor = computed(() => {
//   return 4
// })

const originString = computed(() => {
  return props.markerX + " " + props.markerY
})
const scaleString = computed(()=>{
  let scaleComponent = svgMarkerStore.markerScale
  return `scale(${scaleComponent} ${scaleComponent})`
})

const props = defineProps(
  {
    markerId: {
      required: true,
      type: String
    },
    markerX: {
      required: true,
      type: Number
    },
    markerY: {
      required: true, type: Number
    },
    markerSize: {
      required: true,
      type: String
    },
    markerType: {
      required: true,
      type: String
    }
  }
)

const sizeToRadius = computed(() => {
  let theRadius: number = 10
  if (props.markerSize === "XS") {
    theRadius = 10
  } else if (props.markerSize === "S") {
    theRadius = 13
  } else if (props.markerSize === "M") {
    theRadius = 16
  } else if (props.markerSize === "L") {
    theRadius = 21
  } else if (props.markerSize === "XL") {
    theRadius = 26
  }
  return theRadius
})

const typeToColor = computed(() => {
  let theColor: string = "#039be5"
  if (props.markerType === "start") {
    theColor = "#8bc34a"
  } else if (props.markerType === "middle") {
    theColor = "#039be5"
  } else if (props.markerType === "end") {
    theColor = "#ab47bc"
  } else if (props.markerType === "foot") {
    theColor = "#fb8c00"
  }
  return theColor
})

const holdIsSelected = computed(() => {
  // debugger;
  if (props.markerId === svgMarkerStore.selectedHoldId) { return true } else {
    return false
  }
})

</script>

<style scoped></style>