<template>
  <svg
    id="MainCanvas"
    xmlns="http://www.w3.org/2000/svg"
    :height="heightString"
    :width="widthString"
    viewBox="0 0 1352 1513"
    @mousedown="startDragM($event)"
    @touchstart="startDragT($event)"
    @mousemove="dragM($event)"
    @touchmove="dragT($event)"
    @mouseup="endDrag()"
    @touchend="endDrag()"
    @mouseleave="endDrag()"
  >
    <!-- fill="#43a047" -->
    <rect
      v-if="svgMarkerStore.appState == 'edit'"
      fill="#f44336"
      x="0"
      y="0"
      width="1352"
      height="1513"
    />

    <image
      id="svgimage"
      :href="wallImage"
      width="1342"
      height="1503"
      x="5"
      y="5"
      preserveAspectRatio="xMidYMid meet"
    />
    <rect
      x="0"
      y="0"
      width="1352"
      height="1513"
      fill="grey"
      fill-opacity="0"
      pointer-events="visible"
      @mouseup="newMarker($event)"
    />

    <g
      v-for="(value, key) in objOfHoldsFB"
      :key="key"
    >
      <SvgHoldMarker
        :markerX="value.posX"
        :markerY="value.posY"
        :markerSize="value.size"
        :markerSizeNum="value.sizeNum"
        :markerId="Number(key)"
        :markerType="value.type"
        :markerTypeNum="value.typeNum"
        :markerThumb="false"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
// hjemmevegg.jpg 1367 x 1616
// redpoint_1_red.jpg 1402 x 1408
// hjemmeveggen_3_red.jpg 1342 x 1503

import { computed, ref } from "vue";
// import myImage from '../../assets/hjemmeveggen_2_red.jpg';
// import myImage from '../../assets/hjemmevegg1.jpg';
// import myImage from '../../assets/redpoint_1_red.jpg';
import { useSvgMarkerStore } from "../../stores/SvgMarkerStore";
import SvgHoldMarker from "./SvgHoldMarker.vue";
import type HoldMarkerFB from "../../types/HoldMarkerFB";

import type { HoldTypeTerm } from "../../types/HoldTypeTerm.js";

const svgMarkerStore = useSvgMarkerStore();
const wallImage = svgMarkerStore.imageUrl;
const offsetX = ref(0);
const offsetY = ref(0);
const dragging = ref(false);
const currentSel = ref("");
const coordX = ref(0);
const coordY = ref(0);

const widthString = computed(() => {
  return `${svgMarkerStore.zoomFactor}%`;
});

const heightString = computed(() => {
  return `${svgMarkerStore.zoomFactor}%`;
});

const newMarker = function (e: MouseEvent) {
  if (svgMarkerStore.appState == "edit") {
    let svgRect: any = e.target;
    let pt: SVGPoint = svgRect.parentElement.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    let svgP: SVGPoint = pt.matrixTransform(
      svgRect.parentElement.getScreenCTM().inverse(),
    );
    // let randomId = Math.floor(Math.random() * 10000000).toString();
    let randomNumberId = Math.floor(Math.random() * 10000000);
    let newHoldMarkerFB: HoldMarkerFB = {
      posX: Math.round(svgP.x),
      posY: Math.round(svgP.y),
      size: svgMarkerStore.lastSize,
      sizeNum: svgMarkerStore.lastSizeNum,
      type: svgMarkerStore.lastType as HoldTypeTerm,
      typeNum: svgMarkerStore.lastTypeNum,
    };
    svgMarkerStore.problemHoldsFB[randomNumberId] = newHoldMarkerFB;
    svgMarkerStore.selectedHoldFBId = randomNumberId;
  }
};

const startDragM = function (e: MouseEvent) {
  if (svgMarkerStore.appState == "edit") {
    let offset;
    const clickedElement = e.target as SVGGraphicsElement;
    const clickedById = document.getElementById((e.target as HTMLElement).id)!;
    currentSel.value = (e.target as HTMLElement).id;
    if (clickedElement.classList.contains("draggableC")) {
      offset = getMousePosition(e, clickedElement);
      offset.x -= parseFloat(clickedById.getAttribute("cx")!);
      offset.y -= parseFloat(clickedById.getAttribute("cy")!);
      offsetX.value = offset.x;
      offsetY.value = offset.y;
      dragging.value = true;
      svgMarkerStore.selectedHoldFBId = Number(currentSel.value);
    }
  }
};

const startDragT = function (e: TouchEvent) {
  if (svgMarkerStore.appState == "edit") {
    let offset;
    const clickedElement = e.target as SVGGraphicsElement;
    const clickedById = document.getElementById((e.target as HTMLElement).id)!;
    currentSel.value = (e.target as HTMLElement).id;
    if (clickedElement.classList.contains("draggableC")) {
      offset = getTouchPosition(e, clickedElement)!;
      offset.x -= parseFloat(clickedById.getAttribute("cx")!);
      offset.y -= parseFloat(clickedById.getAttribute("cy")!);
      offsetX.value = offset.x;
      offsetY.value = offset.y;
      dragging.value = true;
      svgMarkerStore.selectedHoldFBId = Number(currentSel.value);
    }
  }
};

const dragM = function (e: MouseEvent) {
  if (svgMarkerStore.appState == "edit") {
    let theSelectedOne;
    let coord;
    if (dragging.value) {
      theSelectedOne = document.getElementById(currentSel.value) as any;
      coord = getMousePosition(e, theSelectedOne);
      coordX.value = coord.x - offsetX.value;
      coordY.value = coord.y - offsetY.value;
      svgMarkerStore.moveMarkerFBX(Number(currentSel.value), coordX.value);
      svgMarkerStore.moveMarkerFBY(Number(currentSel.value), coordY.value);
    }
  }
};

const dragT = function (e: TouchEvent) {
  if (svgMarkerStore.appState == "edit") {
    let theSelectedOne;
    let coord;
    if (dragging.value) {
      e.preventDefault();
      theSelectedOne = document.getElementById(currentSel.value) as any;
      coord = getTouchPosition(e, theSelectedOne)!;
      coordX.value = coord.x - offsetX.value;
      coordY.value = coord.y - offsetY.value;
      svgMarkerStore.moveMarkerFBX(Number(currentSel.value), coordX.value);
      svgMarkerStore.moveMarkerFBY(Number(currentSel.value), coordY.value);
    }
  }
};

const endDrag = function () {
  if (svgMarkerStore.appState == "edit") {
    if (dragging.value) {
      dragging.value = false;
      currentSel.value = "";
    }
  }
};

const getMousePosition = (evt: MouseEvent, svg: SVGGraphicsElement) => {
  let CTM = svg.getScreenCTM()!;
  return {
    x: (evt.clientX - CTM.e) / CTM.a,
    y: (evt.clientY - CTM.f) / CTM.d,
  };
};

const getTouchPosition = (evt: TouchEvent, svg: SVGGraphicsElement) => {
  let CTM = svg.getScreenCTM()!;
  if (evt.touches.length > 0) {
    const touch = evt.touches[0];
    return {
      x: (touch.clientX - CTM.e) / CTM.a,
      y: (touch.clientY - CTM.f) / CTM.d,
    };
  }
};

const objOfHoldsFB = computed(() => {
  if (svgMarkerStore.problemHoldsFB) {
    return svgMarkerStore.problemHoldsFB;
  } else {
    return null;
  }
});
</script>

<style scoped>
.svg-edit {
  cursor: pointer;
}

.svg-zoom1 {
  width: 100%;
  height: 100%;
  transition:
    width 0.3s,
    height 0.3s ease-in-out;
}

.svg-zoom2 {
  width: 160%;
  height: 160%;
  transition:
    width 0.3s,
    height 0.3s ease-in-out;
}
</style>
