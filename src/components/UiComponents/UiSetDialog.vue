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
        <q-input
          v-model="selectedSetFB.description"
          color="black"
          dense
          outlined
        />

        <p class="q-mb-none q-mt-md">Aktiv</p>
        <q-checkbox keep-color v-model="val" color="blue-8" />

        <p class="q-mb-none q-mt-md">Startdato</p>
        <div class="row">
          <q-input
            class="q-pr-sm"
            dense
            outlined
            hide-bottom-space
            v-model="selectedSetFB.createdAt"
            mask="##/##/####"
            :rules="[dateRule]"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="selectedSetFB.createdAt"
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
            class="q-px-xs q-mr-xs"
            padding="sm"
            @click="selectedSetFB.createdAt = svgMarkerStore.inputTodaysDate()"
            >i dag</q-btn
          >
        </div>

        <p class="q-mb-none q-mt-md">Sluttdato</p>
        <div class="row">
          <q-input
            class="q-pr-sm"
            dense
            outlined
            hide-bottom-space
            v-model="selectedSetFB.endedAt"
            mask="##/##/####"
            :rules="[dateRule]"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="selectedSetFB.endedAt"
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
            class="q-px-xs q-mr-xs"
            padding="sm"
            @click="selectedSetFB.endedAt = svgMarkerStore.inputTodaysDate()"
            >i dag</q-btn
          >
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useSvgMarkerStore } from "../../stores/SvgMarkerStore";
const svgMarkerStore = useSvgMarkerStore();
const file = ref<File | null>(null);
// const desc = ref("halloen");
const val = ref(false);
// const dateStarted = ref("01/02/2023");
// const dateEnded = ref("23/07/2023");

const dateRule = (val: string) => {
  const pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return pattern.test(val) || "Date format must be DD/MM/YYYY";
};

const selectedSetFB = computed(() => {
  return svgMarkerStore.setsFB[svgMarkerStore.showSet];
});
</script>

<style scoped></style>
