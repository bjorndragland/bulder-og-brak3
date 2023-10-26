// import type HoldMarker from '../types/HoldMarker'
import type State from "../types/State";
import type HoldMarkerFB from "../types/HoldMarkerFB";
import type WallSets from "../types/WallSets";

import { defineStore } from "pinia";
import db from "../firebase/init";
import { get, set, ref as dbRef } from "firebase/database";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

export const useSvgMarkerStore = defineStore("SvgMarkerStore", {
  state: (): State => ({
    lastSizeNum: 1,
    lastTypeNum: 1,
    selectedHoldFBId: "0",
    appState: "info",
    currentSet: "222222",
    showSet: "222222",
    currentProblem: "",
    problemsFB: {},
    problemsLocal: {},
    problemSortOrder: [],
    problemHoldsFB: {},
    setsFB: {},
    newProblem: {},
    wallWidth: 3.1,
    markerScale: 4,
    zoomFactor: 100,
    isLoading: true,
    problemImageUrl: "null",
    newSetImageUrl: "null",
    setImageUrls: {},
    tab: "tab2",
    addSetDialog: false,
  }),
  getters: {
    getHoldSizeOfSelected: (state: State) => {
      if (Object.keys(state.problemsFB).length > 0) {
        return state.problemsFB[state.currentProblem].problemHolds[
          state.selectedHoldFBId
        ].sizeNum;
      } else {
        return 0;
      }
    },

    getHoldTypeOfSelected: (state: State) => {
      if (Object.keys(state.problemsFB).length > 0) {
        return state.problemsFB[state.currentProblem].problemHolds[
          state.selectedHoldFBId
        ].typeNum;
      } else {
        return 0;
      }
    },
  },
  actions: {
    async fetchImageUrl(imagePath: string) {
      const storage = getStorage();
      const imageRef = storageRef(storage, imagePath);

      try {
        const url = await getDownloadURL(imageRef);
        this.problemImageUrl = url;
      } catch (error) {
        console.error("error");
      }
    },

    async fetchUserData() {
      const auth = getAuth();
      if (auth.currentUser) {
        // await this.fetchUser(auth.currentUser.uid);
        console.log("User is authenticated");
      } else {
        console.log("User is not authenticated");
      }
    },

    async fetchSetsFromFB() {
      const setsRef = dbRef(db, "sets");
      const snapshot = await get(setsRef);
      if (snapshot.exists()) {
        this.setsFB = snapshot.val();
      }
    },

    async fetchSetImageUrlsFromFB() {
      const storage = getStorage();
      const keysOfSets = Object.keys(this.setsFB) as (keyof WallSets)[];

      for (const item of keysOfSets) {
        const tempUrl = this.setsFB[item].image;
        const imageRef = storageRef(storage, tempUrl);
        try {
          const url = await getDownloadURL(imageRef);
          this.setImageUrls[item] = url;
        } catch (error) {
          console.error("error");
        }
      }
    },

    async saveSetBackToFirebase() {
      console.log("loggins");
    },

    async fetchProblemsFromFB() {
      const problemsRef = dbRef(db, "problems");
      const snapshot = await get(problemsRef);
      if (snapshot.exists()) {
        this.problemsFB = snapshot.val();
        // hent holds fra første problem
        const firstProblemId = Object.keys(snapshot.val())[0];
        this.currentProblem = firstProblemId;
        this.selectedHoldFBId = Object.keys(
          this.problemsFB[firstProblemId].problemHolds,
        )[0];

        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    },

    async saveProblemBackToFirebase() {
      const idToRef = this.currentProblem;
      const objProbToSave = this.problemsFB[this.currentProblem];

      objProbToSave.problemHolds =
        this.problemsFB[this.currentProblem].problemHolds;
      this.problemsFB[this.currentProblem];
      set(dbRef(db, "problems/" + idToRef), objProbToSave);
    },

    deleteCurrentProblemFromFB: function () {
      const idToRef = this.currentProblem;
      set(dbRef(db, "problems/" + idToRef), null);
    },
    deleteCurrentProblemFromLocal: function () {
      const idToRef = this.currentProblem;
      delete this.problemsFB[idToRef];
    },

    createNewProblem: function () {
      const auth = getAuth();
      let userIdFB: string;

      if (auth.currentUser) {
        userIdFB = auth.currentUser.uid;
      } else {
        userIdFB = "tom";
      }
      const newProbObject = {
        name: "ny bulder",
        description: "",
        grade: "5",
        gradeNum: 4,
        createdAt: this.inputTodaysDate().dateString,
        createdAtNum: this.inputTodaysDate().dateNum,
        setter: "Bjørn",
        image: "",
        set: "334",
        updatedAt: this.inputTodaysDate().dateString,
        updatedAtNum: this.inputTodaysDate().dateNum,
        userId: userIdFB,
        problemHolds: {} as Record<string, HoldMarkerFB>,
      };

      const tempHoldSpecArray = [
        { sizeNum: 3, typeNum: 2 },
        { sizeNum: 2, typeNum: 1 },
        { sizeNum: 2, typeNum: 0 },
        { sizeNum: 1, typeNum: 3 },
      ];

      for (let i = 0; i < 4; i++) {
        const randomId = Math.floor(Math.random() * 10000000).toString();
        newProbObject.problemHolds[randomId] = {
          posX: 300,
          posY: 300 + i * 180,
          sizeNum: tempHoldSpecArray[i].sizeNum,
          typeNum: tempHoldSpecArray[i].typeNum,
        };
        this.selectedHoldFBId = randomId;
      }

      const idRandom = Math.round(Math.random() * 1000000000).toString();
      console.log(idRandom);

      this.problemsFB[idRandom] = newProbObject;
      this.currentProblem = idRandom;

      this.appState = "edit";
      this.tab = "tab3";
    },

    createNewSet: function () {
      const auth = getAuth();
      let userIdFB: string;

      if (auth.currentUser) {
        userIdFB = auth.currentUser.uid;
      } else {
        userIdFB = "tom";
      }

      const newSetObject = {
        active: false,
        createdAt: this.inputTodaysDate().dateString,
        createdAtNum: this.inputTodaysDate().dateNum,
        description: "ny",
        endedAt: "01/01/2025",
        endedAtNum: 1698858101972,
        image: "",
        imageSize: {
          height: "",
          width: "",
        },
        name: "ny",
        updatedAt: this.inputTodaysDate().dateString,
        updatedAtNum: this.inputTodaysDate().dateNum,
        userId: userIdFB,
      };

      const idSetRandom = Math.round(Math.random() * 1000000).toString();
      this.setsFB[idSetRandom] = newSetObject;
      this.showSet = idSetRandom;
    },

    inputTodaysDate: function () {
      const curDate = new Date();
      const curDateNow = Date.now();
      const inputYear = curDate.getFullYear();
      const inputMonth = curDate.getMonth() + 1;
      let inputMonthString;
      const inputDay = curDate.getDate();
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
      const fullInputDate = `${inputDayString}/${inputMonthString}/${inputYear}`;
      // return fullInputDate;
      return { dateString: fullInputDate, dateNum: curDateNow };
    },

    moveMarkerFBX: function (id: string, valueX: number) {
      this.problemsFB[this.currentProblem].problemHolds[id].posX =
        Math.round(valueX);
    },
    moveMarkerFBY: function (id: string, valueY: number) {
      this.problemsFB[this.currentProblem].problemHolds[id].posY =
        Math.round(valueY);
    },

    nudgeMarkerXPlusFB: function () {
      this.problemsFB[this.currentProblem].problemHolds[
        this.selectedHoldFBId
      ].posX += 3;
    },

    nudgeMarkerXMinusFB: function () {
      this.problemsFB[this.currentProblem].problemHolds[
        this.selectedHoldFBId
      ].posX -= 3;
    },

    nudgeMarkerYPlusFB: function () {
      this.problemsFB[this.currentProblem].problemHolds[
        this.selectedHoldFBId
      ].posY -= 3;
    },

    nudgeMarkerYminusFB: function () {
      this.problemsFB[this.currentProblem].problemHolds[
        this.selectedHoldFBId
      ].posY += 3;
    },

    setHoldSizeOfSelected: function (value: number) {
      this.problemsFB[this.currentProblem].problemHolds[
        this.selectedHoldFBId
      ].sizeNum = value;

      this.lastSizeNum = value;
    },

    setHoldTypeOfSelected: function (value: number) {
      this.problemsFB[this.currentProblem].problemHolds[
        this.selectedHoldFBId
      ].typeNum = value;

      this.lastTypeNum = value;
    },

    deleteSelectedHold: function () {
      const holdToDelete: string = this.selectedHoldFBId;
      const arrOfHolds = Object.keys(
        this.problemsFB[this.currentProblem].problemHolds,
      );
      for (const holdId of arrOfHolds) {
        if (holdId !== holdToDelete) {
          // set another hold as selected
          this.selectedHoldFBId = holdId;
          break;
        }
      }
      // do not allow to delete ALL holds, leave 1
      if (arrOfHolds.length > 2) {
        delete this.problemsFB[this.currentProblem].problemHolds[holdToDelete];
      }
    },
  },
});
