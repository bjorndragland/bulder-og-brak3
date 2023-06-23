// import type HoldMarker from '../types/HoldMarker'
import type State from '../types/State'

import { defineStore } from 'pinia'
import db from '../firebase/init'
import { get, set, ref as dbRef } from 'firebase/database';

export const useSvgMarkerStore = defineStore('SvgMarkerStore', {
  state: (): State => ({
    lastSize: "S",
    lastType: "middle",
    selectedHoldId: "",
    selectedHoldFBId: 0,
    appState: 'info',
    currentSet: "s10001",
    currentProblem: 0,
    problemsFB: {},
    problemSortOrder: [],
    problemHoldsFB: {},
    newProblem: {},
    newProblemHolds: {},
    wallWidth: 3.1,
    markerScale: 4,
    zoomFactor: 100,
    isLoading: true,
    holdSizeDefaults: [
      { id: 0, name: "XS", radius: 10 },
      { id: 1, name: "S", radius: 13 },
      { id: 2, name: "M", radius: 16 },
      { id: 3, name: "L", radius: 21 },
      { id: 4, name: "XL", radius: 26 },
    ],

    tab: 'tab2'


  }),
  getters: {

  },
  actions: {

    async fetchProblemsFromFB() {
      const problemsRef = dbRef(db, 'problems');
      const snapshot = await get(problemsRef);
      if (snapshot.exists()) {
        this.problemsFB = snapshot.val()
        // hent holds fra første problem
        const firstProblemId = Object.keys(snapshot.val())[0];
        this.fetchProblemHoldsFromFB(firstProblemId);
        this.currentProblem = firstProblemId
        this.isLoading = false
      } else {
        this.isLoading = false

      }
    },


    async fetchProblemHoldsFromFB(key: string | number) {
      const problemHoldsRef = dbRef(db, 'problemHolds');
      const snapshot = await get(problemHoldsRef);
      if (snapshot.exists()) {
        if (snapshot.val()[key]) {
          this.problemHoldsFB = snapshot.val()[key]
        } else {
          this.problemHoldsFB = {}
        }
      }
    },

    async saveInfoBackToFirebase() {
      const objHoldsToSave = this.problemHoldsFB
      const idToRef = this.currentProblem
      set(dbRef(db, 'problemHolds/' + idToRef),
        objHoldsToSave
      )
      const objProbToSave = this.problemsFB[this.currentProblem]
      set(dbRef(db, 'problems/' + idToRef),
        objProbToSave
      )
    },

    deleteCurrentProblemFromFB: function () {
      const idToRef = this.currentProblem
      set(dbRef(db, 'problemHolds/' + idToRef),
        null
      )
      set(dbRef(db, 'problems/' + idToRef),
        null
      )
    },
    deleteCurrentProblemFromLocal: function () {
      const idToRef = this.currentProblem;
      this.problemHoldsFB = {};
      delete this.problemsFB[idToRef];
    },

    createNewProblem: function () {
      console.log("says for it")
      const newProbObject = {
        name: "ny bulder",
        description: "",
        grade: "5",
        gradeNum: 4,
        createdAt: "i dag",
        setter: "Bjørn",
        image: "",
        set: "334",
        updatedAt: "i dag"
      }

      const idRandom = Math.round(Math.random() * 1000000000).toString()
      console.log(idRandom);

      this.problemsFB[idRandom] = newProbObject
      // this.problemHoldsFB[idRandom] = newProbHoldsObject
      this.currentProblem = idRandom
    },

    moveMarkerFBX: function (id: number, valueX: number) {
      this.problemHoldsFB[id].posX = valueX
    },
    moveMarkerFBY: function (id: number, valueY: number) {
      this.problemHoldsFB[id].posY = valueY

    },


    nudgeMarkerXPlusFB: function () {
      this.problemHoldsFB[this.selectedHoldFBId].posX += 3
    },

    nudgeMarkerXMinusFB: function () {
      this.problemHoldsFB[this.selectedHoldFBId].posX -= 3
    },

    nudgeMarkerYPlusFB: function () {
      this.problemHoldsFB[this.selectedHoldFBId].posY -= 3
    },

    nudgeMarkerYminusFB: function () {
      this.problemHoldsFB[this.selectedHoldFBId].posY += 3
    },


    changeHoldSizeOfSelected: function (holdSizeNum: number) {
      const result = this.holdSizeDefaults.find(({ id }) => id === holdSizeNum)
      this.problemHoldsFB[this.selectedHoldFBId].size = result!.name
      this.lastSize = result!.name
    },

    changeHoldTypeOfSelected: function (holdType: string) {
      this.problemHoldsFB[this.selectedHoldFBId].type = holdType
      this.lastType = holdType
    },

    deleteSelectedHold: function () {
      delete this.problemHoldsFB[this.selectedHoldFBId]
    },

    // sortProblems: function (sorting: string) {
    // }

  }
})