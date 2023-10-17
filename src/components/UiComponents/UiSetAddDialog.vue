<template>
  <q-dialog
    v-model="svgMarkerStore.addSetDialog"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Legg til vegg/sett
          <q-btn
            @click="svgMarkerStore.addSetDialog = false"
            round
            flat
            class="q-px-xs q-mr-xs bg-white float-right"
            icon="close"
          ></q-btn>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <p class="q-mb-none q-mt-md">Last opp bilde</p>

        <q-file v-model="file" dense outlined>
          <template v-slot:append>
            <q-icon name="image" />
          </template>
        </q-file>

        <p class="q-mb-none q-mt-md">Beskrivelse</p>
        <q-input v-model="desc" color="black" dense outlined />

        <p class="q-mb-none q-mt-md">Aktiv</p>
        <q-checkbox keep-color v-model="val" color="green-10" />

        <p class="q-mb-none q-mt-md">Startdato</p>
        <q-input
          dense
          outlined
          v-model="dateStarted"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="dateStarted" color="light-blue-9">
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

        <p class="q-mb-none q-mt-md">Sluttdato</p>
        <q-input
          dense
          outlined
          v-model="dateEnded"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="dateEnded" color="light-blue-9">
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

        <q-btn @click="dateStarted = inputTodaysDate()">klikk for i dag</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSvgMarkerStore } from "../../stores/SvgMarkerStore";
const svgMarkerStore = useSvgMarkerStore();
const file = ref(null);
const desc = ref("halloen");
const val = ref(false);
const dateStarted = ref("2023/02/01");
const dateEnded = ref("2023/07/01");

const inputTodaysDate = function () {
  let curDate = new Date();
  let inputYear = curDate.getFullYear();
  let inputMonth = curDate.getMonth() + 1;
  let inputMonthString;
  let inputDay = curDate.getDate();
  let inputDayString;
  if (inputMonth < 10) {
    inputMonthString = `0${inputMonth}`;
  } else {
    inputMonthString = inputMonth.toString();
  }
  if (inputDay < 10) {
    inputDayString = `0${inputDay}`;
  } else {
    inputDayString = inputDay.toString();
  }
  let fullInputDate = `${inputYear}/${inputMonthString}/${inputDayString}`;
  return fullInputDate;
};
</script>

<style scoped></style>
