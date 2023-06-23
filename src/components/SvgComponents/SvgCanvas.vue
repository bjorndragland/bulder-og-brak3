<template>
  <svg
    id="MainCanvas"
    xmlns="http://www.w3.org/2000/svg"
    :height="heightString"
    :width="widthString"
    viewBox="0 0 1402 1408"
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
      height="400"
      width="320"
    />

    <image
      id="svgimage"
      :href="wallImage"
      width="1402"
      height="1408"
      x="5"
      y="5"
      preserveAspectRatio="xMidYMid meet"
    />
    <rect
      x="0"
      y="0"
      width="1402"
      height="1408"
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
        :markerId="key.toString()"
        :markerType="value.type"
      />
    </g>

  </svg>
</template>

<script setup lang="ts">

// hjemmevegg.jpg 1367 x 1616
// redpoint_1_red.jpg 1402 x 1408

import { computed, ref } from 'vue';
// import myImage from '../../assets/hjemmevegg.jpg';
import myImage from '../../assets/redpoint_1_red.jpg';
import { useSvgMarkerStore } from '../../stores/SvgMarkerStore'
import SvgHoldMarker from './SvgHoldMarker.vue'
import type HoldMarkerFB from '../../types/HoldMarkerFB'

import type { HoldTypeTerm } from '../../types/HoldTypeTerm.js'
const wallImage = myImage;
const svgMarkerStore = useSvgMarkerStore()

const offsetX = ref(0);
const offsetY = ref(0);
const dragging = ref(false);
const currentSel = ref('');
const coordX = ref(0);
const coordY = ref(0);

const widthString = computed(() => {
  return `${svgMarkerStore.zoomFactor}%`
})

const heightString = computed(() => {
  return `${svgMarkerStore.zoomFactor}%`
})

const newMarker = function (e: MouseEvent) {
  if (svgMarkerStore.appState == 'edit') {
    let svgRect: any = e.target;
    let pt: SVGPoint = svgRect.parentElement.createSVGPoint();
    pt.x = e.clientX
    pt.y = e.clientY
    let svgP: SVGPoint = pt.matrixTransform(svgRect.parentElement.getScreenCTM().inverse())
    let randomId = (Math.floor(Math.random() * 10000000)).toString()
    let randomNumberId = Math.floor(Math.random() * 10000000)
    let newHoldMarkerFB: HoldMarkerFB = {
      posX: Math.round(svgP.x),
      posY: Math.round(svgP.y),
      size: svgMarkerStore.lastSize,
      type: svgMarkerStore.lastType as HoldTypeTerm
    }
    svgMarkerStore.problemHoldsFB[randomNumberId] = newHoldMarkerFB
    svgMarkerStore.selectedHoldId = randomId;
    svgMarkerStore.selectedHoldFBId = randomNumberId;

  }
}

const startDragM = function (e: MouseEvent) {
  if (svgMarkerStore.appState == 'edit') {
    let offset
    const clickedElement = e.target as SVGGraphicsElement
    const clickedById = document.getElementById((e.target as HTMLElement).id)!
    currentSel.value = (e.target as HTMLElement).id;
    if (clickedElement.classList.contains('draggableC')) {
      offset = getMousePosition(e, clickedElement);
      offset.x -= parseFloat(clickedById.getAttribute("cx")!);
      offset.y -= parseFloat(clickedById.getAttribute("cy")!);
      offsetX.value = offset.x;
      offsetY.value = offset.y;
      dragging.value = true;
      svgMarkerStore.selectedHoldId = currentSel.value;
      svgMarkerStore.selectedHoldFBId = Number(currentSel.value);
    }
  }
}

const startDragT = function (e: TouchEvent) {
  if (svgMarkerStore.appState == 'edit') {
    let offset
    const clickedElement = e.target as SVGGraphicsElement
    const clickedById = document.getElementById((e.target as HTMLElement).id)!
    currentSel.value = (e.target as HTMLElement).id;
    if (clickedElement.classList.contains('draggableC')) {
      offset = getTouchPosition(e, clickedElement)!;
      offset.x -= parseFloat(clickedById.getAttribute("cx")!);
      offset.y -= parseFloat(clickedById.getAttribute("cy")!);
      offsetX.value = offset.x;
      offsetY.value = offset.y;
      dragging.value = true
      svgMarkerStore.selectedHoldId = currentSel.value
      svgMarkerStore.selectedHoldFBId = Number(currentSel.value);
    }
  }
}


const dragM = function (e: MouseEvent) {
  if (svgMarkerStore.appState == 'edit') {
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
}

const dragT = function (e: TouchEvent) {
  if (svgMarkerStore.appState == 'edit') {
    let theSelectedOne;
    let coord;
    if (dragging.value) {
      e.preventDefault()
      theSelectedOne = document.getElementById(currentSel.value) as any;
      coord = getTouchPosition(e, theSelectedOne)!;
      coordX.value = coord.x - offsetX.value;
      coordY.value = coord.y - offsetY.value;
      svgMarkerStore.moveMarkerFBX(Number(currentSel.value), coordX.value);
      svgMarkerStore.moveMarkerFBY(Number(currentSel.value), coordY.value);
    }
  }
}


const endDrag = function () {
  if (svgMarkerStore.appState == 'edit') {
    if (dragging.value) {
      dragging.value = false;
      currentSel.value = '';
    }
  }
}

const getMousePosition = (evt: MouseEvent, svg: SVGGraphicsElement) => {
  let CTM = svg.getScreenCTM()!;
  return {
    x: (evt.clientX - CTM.e) / CTM.a,
    y: (evt.clientY - CTM.f) / CTM.d,
  };
}

const getTouchPosition = (evt: TouchEvent, svg: SVGGraphicsElement) => {
  let CTM = svg.getScreenCTM()!;
  if (evt.touches.length > 0) {
    const touch = evt.touches[0]
    return {
      x: (touch.clientX - CTM.e) / CTM.a,
      y: (touch.clientY - CTM.f) / CTM.d,
    };
  }

}


const objOfHoldsFB = computed(() => {
  if (svgMarkerStore.problemHoldsFB) {
    return svgMarkerStore.problemHoldsFB
  }else{
    return null
  }
})

</script>

<style scoped></style>