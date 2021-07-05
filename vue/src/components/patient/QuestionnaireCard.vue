<template>
  <div class="flex-row" style="width: 1400px; padding-top: 20px">
    <b-form-group class="profile" style="width: 800px; margin: auto; margin-bottom: 40px; padding-bottom: 20px;">
      <div style="font-size: 25px; color: #2c3e50">{{ $t('questionnaire')}}</div>
      <div>{{ $t('questionnaire-message')}}</div>
      <b-card class="labels" bg-variant="white" style="border: 0px;">
        <b-form-group
            label="Показники"
            label-cols-lg="4"
            label-align-sm="left"
            class="mb-1"
        ><b-form-group
            label="Варіанти"
            label-cols-lg="5"
            label-align-sm="left"
            class="mb-1"
        >
          <b-form-group
              label="Значення"
              label-cols-lg="6"
              label-align-sm="left"
              class="mb-1"
          ></b-form-group>
        </b-form-group>
        </b-form-group>
        <div style="width: 720px; height: 1px; background-color: #58ABB7;"/>

        <b-form-group
            label-cols-lg="4"
            label="Плач"
            label-size="md"
            label-class="font-weight-bold pt-0"
            class="mb-0">
          <b-form-group
              label=""
              label-cols-lg="5"
              label-align-sm="left"
              class="mb-0">
            <b-form-radio-group
                v-model="value_cry"
                :options="optionsCry"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                style="margin-bottom: 13px;"
                class="pt-2"
                :state="stateCry"
                stacked>
              <b-form-invalid-feedback :state="stateCry">{{$t("message-invalid")}}</b-form-invalid-feedback>
              <b-form-valid-feedback :state="stateCry">{{$t("message-valid")}}</b-form-valid-feedback>
            </b-form-radio-group>
          </b-form-group>
        </b-form-group>

        <div style="width: 715px; height: 1px; background-color: lightgray;"/>
        <b-form-group
            label-cols-lg="4"
            label="Пітливість"
            label-size="md"
            label-class="font-weight-bold pt-0"
            class="mb-0">
          <b-form-group
              label="Локалізація:"
              label-cols-lg="5"
              label-align-sm="left"
              class="mb-0">
            <b-form-radio-group
                v-model="value_localizationOfSwearing"
                :options="optionsLocalizationOfSwearing"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                style="margin-bottom: 13px;"
                class="pt-2"
                :state="statelocalizationOfSwearing"
                stacked>
              <b-form-invalid-feedback :state="statelocalizationOfSwearing">{{$t("message-invalid")}}</b-form-invalid-feedback>
              <b-form-valid-feedback :state="statelocalizationOfSwearing">{{$t("message-valid")}}</b-form-valid-feedback>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group
              label="Запах:"
              label-cols-lg="5"
              label-align-sm="left"
              class="mb-0">
            <b-form-radio-group
                v-model="value_smellOfSwearing"
                :options="optionsSmellOfSwearing"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                style="margin-bottom: 13px;"
                class="pt-2"
                :state="stateSmellOfSwearing"
                stacked>
              <b-form-invalid-feedback :state="stateSmellOfSwearing">{{$t("message-invalid")}}</b-form-invalid-feedback>
              <b-form-valid-feedback :state="stateSmellOfSwearing">{{$t("message-valid")}}</b-form-valid-feedback>
            </b-form-radio-group>
          </b-form-group>
        </b-form-group>
        <div style="width: 715px; height: 1px; background-color: lightgray;"/>

        <b-form-group
            label-cols-lg="4"
            label="Стул"
            label-size="md"
            label-class="font-weight-bold pt-0"
            class="mb-0">
          <b-form-group
              label="Частота:"
              label-cols-lg="5"
              label-align-sm="left"
              class="mb-0">
            <b-form-radio-group
                id="frequencyOfFaces"
                v-model="value_frequencyOfFaces"
                :options="optionsFrequencyOfFaces"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                style="margin-bottom: 13px;"
                class="pt-2"
                :state="stateFrequenceOfFaces"
                stacked>
              <b-form-invalid-feedback :state="stateFrequenceOfFaces">{{$t("message-invalid")}}</b-form-invalid-feedback>
              <b-form-valid-feedback :state="stateFrequenceOfFaces">{{$t("message-valid")}}</b-form-valid-feedback>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group
              label="Колір:"
              label-cols-lg="5"
              label-align-sm="left"
              class="mb-0">
            <b-form-radio-group
                id="colorOfFaces"
                v-model="value_colorOfFaces"
                :options="optionsColorOfFaces"
                value-field="item"
                text-field="name"
                :disabled="disableGroupFaces"
                disabled-field="notEnabled"
                style="margin-bottom: 13px;"
                class="pt-2"
                :state="stateColorOfFaces"
                stacked>
              <b-form-invalid-feedback :state="stateColorOfFaces">{{$t("message-invalid")}}</b-form-invalid-feedback>
              <b-form-valid-feedback :state="stateColorOfFaces">{{$t("message-valid")}}</b-form-valid-feedback>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group
              label="Консистенція:"
              label-cols-lg="5"
              label-align-sm="left"
              class="mb-0">
            <b-form-radio-group
                id="faces"
                v-model="value_faces"
                :options="optionsFaces"
                value-field="item"
                text-field="name"
                :disabled="disableGroupFaces"
                disabled-field="notEnabled"
                style="margin-bottom: 13px;"
                class="pt-2"
                :state="stateFaces"
                stacked>
              <b-form-invalid-feedback :state="stateFaces">{{$t("message-invalid")}}</b-form-invalid-feedback>
              <b-form-valid-feedback :state="stateFaces">{{$t("message-valid")}}</b-form-valid-feedback>
            </b-form-radio-group>
          </b-form-group>
        </b-form-group>
        <div style="width: 715px; height: 1px; background-color: lightgray;"/>

        <b-form-group
            label-cols-lg="4"
            label="Сеча"
            label-size="md"
            label-class="font-weight-bold pt-0"
            class="mb-0">
          <b-form-group
              label="Частота:"
              label-cols-lg="5"
              label-align-sm="left"
              class="mb-0">
            <b-form-radio-group
                v-model="value_frequencyOfUrination"
                :options="optionsFrequencyOfUrination"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                style="margin-bottom: 13px;"
                class="pt-2"
                :state="stateFrequenceOfUrination"
                stacked>
              <b-form-invalid-feedback :state="stateFrequenceOfUrination">{{$t("message-invalid")}}</b-form-invalid-feedback>
              <b-form-valid-feedback :state="stateFrequenceOfUrination">{{$t("message-valid")}}</b-form-valid-feedback>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group
              label="Колір:"
              label-cols-lg="5"
              label-align-sm="left"
              class="mb-0">
            <b-form-radio-group
                id="colorOfUrination"
                v-model="value_colorOfUrination"
                :options="optionsColorOfUrination"
                value-field="item"
                text-field="name"
                :disabled="disableGroupUrination"
                disabled-field="notEnabled"
                style="margin-bottom: 13px;"
                class="pt-2"
                :state="stateColorOfUrination"
                stacked>
              <b-form-invalid-feedback :state="stateColorOfUrination">{{$t("message-invalid")}}</b-form-invalid-feedback>
              <b-form-valid-feedback :state="stateColorOfUrination">{{$t("message-valid")}}</b-form-valid-feedback>
            </b-form-radio-group>
          </b-form-group>
        </b-form-group>
        <div style="width: 715px; height: 1px; background-color: lightgray;"/>

        <b-form-group
            label-cols-lg="4"
            label="Кормління"
            label-size="md"
            label-class="font-weight-bold pt-0"
            class="mb-0">
          <b-form-group
              label="Частота:"
              label-cols-lg="5"
              label-align-sm="left"
              class="mb-0">
            <b-form-radio-group
                v-model="value_feed"
                :options="optionsFeed"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                style="margin-bottom: 13px;"
                class="pt-2"
                :state="stateFeed"
                stacked>
              <b-form-invalid-feedback :state="stateFeed">{{$t("message-invalid")}}</b-form-invalid-feedback>
              <b-form-valid-feedback :state="stateFeed">{{$t("message-valid")}}</b-form-valid-feedback>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group
              label="Вид:"
              label-cols-lg="5"
              label-align-sm="left"
              class="mb-0">
            <b-form-radio-group
                v-model="value_typeFeed"
                :options="optionsTypeFeed"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                style="margin-bottom: 13px;"
                class="pt-2"
                :state="stateTypeFeed"
                stacked>
              <b-form-invalid-feedback :state="stateTypeFeed">{{$t("message-invalid")}}</b-form-invalid-feedback>
              <b-form-valid-feedback :state="stateTypeFeed">{{$t("message-valid")}}</b-form-valid-feedback>
            </b-form-radio-group>
          </b-form-group>
        </b-form-group>
        <div style="width: 715px; height: 1px; background-color: lightgray;"/>

        <b-form-group
            label-cols-lg="4"
            label="Дихання"
            label-size="md"
            label-class="font-weight-bold pt-0"
            class="mb-0">
          <b-form-group
              label=""
              label-cols-lg="5"
              label-align-sm="left"
              class="mb-0">
            <b-form-radio-group
                v-model="value_breath"
                :options="optionsBreath"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                style="margin-bottom: 13px;"
                class="pt-2"
                :state="stateBreath"
                stacked>
              <b-form-invalid-feedback :state="stateBreath">{{$t("message-invalid")}}</b-form-invalid-feedback>
              <b-form-valid-feedback :state="stateBreath">{{$t("message-valid")}}</b-form-valid-feedback>
            </b-form-radio-group>
          </b-form-group>
        </b-form-group>
        <div style="width: 715px; height: 1px; background-color: lightgray;"/>

        <b-form-group
            label-cols-lg="4"
            label="Шкіра"
            label-size="md"
            label-class="font-weight-bold pt-0"
            class="mb-0">
          <b-form-group
              label=""
              label-cols-lg="5"
              label-align-sm="left"
              class="mb-0">
          <b-form-radio-group
              v-model="value_skin"
              :options="optionsSkin"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
              style="margin-bottom: 13px;"
              class="pt-2"
              :state="stateSkin"
              stacked>
            <b-form-invalid-feedback :state="stateSkin">{{$t("message-invalid")}}</b-form-invalid-feedback>
            <b-form-valid-feedback :state="stateSkin">{{$t("message-valid")}}</b-form-valid-feedback>
          </b-form-radio-group>
          </b-form-group>
        </b-form-group>
        <div style="width: 715px; height: 1px; background-color: lightgray;"/>
        <b-button style=" width: 100%; margin-top: 15px" type="submit" v-on:click="onSubmit"
                  :variant="acceptableVerificationStyle" :disabled="acceptableVerification">{{ $t('send') }}</b-button>
      </b-card>

      <b-card-text style="font-size: 20px">Оцінка стану системою: {{ this.valueLabel }}/10</b-card-text>
      <div style="color: #ff2e00">{{ $t('questionnaire-message')}}</div>



    </b-form-group>
  </div>
</template>

<style>
.profile {
  border: 1px;
  border-style: solid;
  border-color: #5FDBE9;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #FFFFFF;
  color: #248F99;
  box-shadow: 0px 4px 8px  #58ABB7;
}
.labels {
  text-align: start;
  color: #2c3e50;
}
.mb-0 {
  padding-top: 5px;
}
</style>

<script>

import axios from "axios";

export default {
  data() {
    return {
      valueLabel: 0,
      cry: [ {item: "long", coefficient: "0.4"},
        {item: "short", coefficient: "0.5"},
        {item: "none", coefficient: "0.1"}
      ],

      localizationOfSwearing: [ {item: "none", coefficient: "0.15"},
        {item: "all", coefficient: "0.3"},
        {item: "part", coefficient: "0.15"}
      ],
      smellOfSwearing: [ {item: "strong", coefficient: "0.25"},
        {item: "pungent", coefficient: "0.1"},
        {item: "none", coefficient: "0.05"}
      ],

      frequencyOfUrination: [
        {item: "often", coefficient: "0.15"},
        {item: "normal", coefficient: "0.01"},
        {item: "seldom", coefficient: "0.15"},
        {item: "none", coefficient: "0.22"}
      ],
      colorOfUrination: [ {item: "yellow", coefficient: "0.01"},
        {item: "red", coefficient: "0.2"},
        {item: "dark", coefficient: "0.26"}
      ],

      faces: [ {item: "greasy", coefficient: "0.15"},
        {item: "normal", coefficient: "0.01"},
        {item: "mucus", coefficient: "0.15"}
      ],
      frequencyOfFaces: [
        {item: "often", coefficient: "0.11"},
        {item: "normal", coefficient: "0.01"},
        {item: "seldom", coefficient: "0.11"},
        {item: "none", coefficient: "0.15"}
      ],
      colorOfFaces: [ {item: "brown", coefficient: "0.01"},
        {item: "green", coefficient: "0.1"},
        {item: "black", coefficient: "0.2"}
      ],

      feed: [ {item: "often", coefficient: "0.2"},
        {item: "normal", coefficient: "0.08"},
        {item: "seldom", coefficient: "0.2"},
        {item: "none", coefficient: "0.25"}
      ],
      typeFeed: [ {item: "natural", coefficient: "0.08"},
        {item: "artificial", coefficient: "0.09"},
        {item: "dietary", coefficient: "0.1"}
      ],

      breath: [ {item: "rapid", coefficient: "0.24"},
        {item: "wheezing", coefficient: "0.32"},
        {item: "regular", coefficient: "0.04"},
        {item: "intermittent", coefficient: "0.4"}
      ],

      skin: [ {item: "normal", coefficient: "0.04"},
        {item: "intertrigo", coefficient: "0.16"},
        {item: "irritation", coefficient: "0.16"},
        {item: "rash", coefficient: "0.4"},
        {item: "itch", coefficient: "0.24"}
      ],

      weight_cry: 2,
      weight_swearing: 5,
      weight_urination: 10,
      weight_faces: 10,
      weight_feed: 5,
      weight_breath: 10,
      weight_skin: 3,

      minCry: Math.pow(2, 0.1),
      maxCry: Math.pow(2, 0.5),

      minSwearing: Math.pow(5, (0.15 + 0.5)),
      maxSwearing: Math.pow(5, (0.3 + 0.25)),

      minUrination: Math.pow(10, (0.01 + 0.01)),
      maxUrination: Math.pow(10, (0.22 + 0.26)),

      minFaces: Math.pow(10, (0.01 + 0.01 + 0.01)),
      maxFaces: Math.pow(10, (0.15 + 0.15 + 0.2)),

      minFeed: Math.pow(5, (0.01 + 0.01)),
      maxFeed: Math.pow(5, (0.25 + 0.1)),

      minBreath: Math.pow(10, 0.04),
      maxBreath: Math.pow(10, 0.4),

      minSkin: Math.pow(3, 0.04),
      maxSkin: Math.pow(3, 0.4),

      minCoefficient: 1,
      maxCoefficient: 1,

      value_cry: '',
      value_localizationOfSwearing: '',
      value_smellOfSwearing: '',
      value_frequencyOfUrination: '',
      value_colorOfUrination: '',
      value_faces: '',
      value_frequencyOfFaces: '',
      value_colorOfFaces: '',
      value_feed: '',
      value_typeFeed: '',
      value_breath: '',
      value_skin: '',

      coefficient_cry: '',
      coefficient_localizationOfSwearing: '',
      coefficient_smellOfSwearing: '',
      coefficient_frequencyOfUrination: '',
      coefficient_colorOfUrination: '',
      coefficient_faces: '',
      coefficient_frequencyOfFaces: '',
      coefficient_colorOfFaces: '',
      coefficient_feed: '',
      coefficient_typeFeed: '',
      coefficient_breath: '',
      coefficient_skin: '',

      value: null,
      optionsCry: [
        {name: this.$t("long"), item: "long"},
        {name: this.$t("short"), item: "short"},
        {name: this.$t("none"), item: "none"}
      ],
      optionsLocalizationOfSwearing: [
        {name: this.$t("none"), item: "none"},
        {name: this.$t("all"), item: "all"},
        {name: this.$t("part"), item: "part"}
      ],
      optionsSmellOfSwearing: [
        {name: this.$t("strong"), item: "strong"},
        {name: this.$t("pungent"), item: "pungent"},
        {name: this.$t("none"), item: "none"}
      ],
      optionsFrequencyOfUrination: [
        {name: this.$t("often"), item: "often"},
        {name: this.$t("normal"), item: "normal"},
        {name: this.$t("seldom"), item: "seldom"},
        {name: this.$t("none"), item: "none"}
      ],
      optionsColorOfUrination: [
        {name: this.$t("yellow"), item: "yellow"},
        {name: this.$t("red"), item: "red"},
        {name: this.$t("dark"), item: "dark"}
      ],
      optionsFaces: [
        {name: this.$t("greasy"), item: "greasy"},
        {name: this.$t("normal"), item: "normal"},
        {name: this.$t("mucus"), item: "mucus"}
      ],
      optionsFrequencyOfFaces: [
        {name: this.$t("often"), item: "often"},
        {name: this.$t("normal"), item: "normal"},
        {name: this.$t("seldom"), item: "seldom"},
        {name: this.$t("none"), item: "none"}
      ],
      optionsColorOfFaces: [
        {name: this.$t("brown"), item: "brown"},
        {name: this.$t("green"), item: "green"},
        {name: this.$t("black"), item: "black"}
      ],
      optionsFeed: [
        {name: this.$t("often"), item: "often"},
        {name: this.$t("normal"), item: "normal"},
        {name: this.$t("seldom"), item: "seldom"},
        {name: this.$t("none"), item: "none"}
      ],
      optionsTypeFeed: [
        {name: this.$t("natural"), item: "natural"},
        {name: this.$t("artificial"), item: "artificial"},
        {name: this.$t("dietary"), item: "dietary"}
      ],
      optionsBreath: [
        {name: this.$t("rapid"), item: "rapid"},
        {name: this.$t("wheezing"), item: "wheezing"},
        {name: this.$t("regular"), item: "regular"},
        {name: this.$t("intermittent"), item: "intermittent"}
      ],
      optionsSkin: [
        {name: this.$t("normal"), item: "normal"},
        {name: this.$t("intertrigo"), item: "intertrigo"},
        {name: this.$t("irritation"), item: "irritation"},
        {name: this.$t("rash"), item: "rash"},
        {name: this.$t("itch"), item: "itch"}
      ]
    }
  },

  computed: {
    statelocalizationOfSwearing() {
      return Boolean(this.value_localizationOfSwearing)
    },
    stateFrequenceOfFaces() {
      return Boolean(this.value_frequencyOfFaces)
    },
    stateColorOfFaces() {
      return Boolean(this.value_colorOfFaces)
    },
    stateFaces() {
      return Boolean(this.value_faces)
    },
    stateFrequenceOfUrination() {
      return Boolean(this.value_frequencyOfUrination)
    },
    stateColorOfUrination() {
      return Boolean(this.value_colorOfUrination)
    },
    stateFeed() {
      return Boolean(this.value_feed)
    },
    stateTypeFeed() {
      return Boolean(this.value_typeFeed)
    },
    stateBreath() {
      return Boolean(this.value_breath)
    },
    stateSkin() {
      return Boolean(this.value_skin)
    },
    stateCry() {
      return Boolean(this.value_cry)
    },
    stateSmellOfSwearing() {
      return Boolean(this.value_smellOfSwearing)
    },
    disableGroupFaces() {
      return Boolean(this.value_frequencyOfFaces === "none")
    },
    disableGroupUrination() {
      return Boolean(this.value_frequencyOfUrination === "none")
    },
    acceptableVerificationStyle() {
      return this.value_cry.length > 0 && this.value_localizationOfSwearing.length > 0 && this.value_smellOfSwearing.length > 0 &&
      this.value_frequencyOfFaces.length > 0 && this.value_frequencyOfUrination.length > 0 && this.value_feed.length > 0
      && this.value_typeFeed.length > 0 && this.value_breath.length > 0  && this.value_skin.length > 0 ? "info" : "outline-info";
    },
    acceptableVerification() {
      return !(this.value_cry.length > 0 && this.value_localizationOfSwearing.length > 0 && this.value_smellOfSwearing.length > 0 &&
          this.value_frequencyOfFaces.length > 0 && this.value_frequencyOfUrination.length > 0 && this.value_feed.length > 0
          && this.value_typeFeed.length > 0 && this.value_breath.length > 0  && this.value_skin.length > 0);
    }
  },

  methods: {
    searchCoefficient(object, coefficient) {
      for(let i = 0; i < object.length; i++) {
        if(object[i].item === coefficient) {
          return object[i].coefficient
        }
      }
    },
    getMinMaxCoefficient() {
      this.minCoefficient = this.minCry + this.minSwearing + this.minUrination
          + this.minFaces + this.minFeed + this.minBreath + this.minSkin
      this.maxCoefficient = this.maxCry + this.maxSwearing + this.maxUrination
          + this.maxFaces + this.maxFeed + this.maxBreath + this.maxSkin
    },
    getCoefficients() {
      this.coefficient_cry = this.searchCoefficient(this.cry, this.value_cry)
      this.coefficient_localizationOfSwearing = this.searchCoefficient(this.localizationOfSwearing, this.value_localizationOfSwearing)
      this.coefficient_smellOfSwearing = this.searchCoefficient(this.smellOfSwearing, this.value_smellOfSwearing)
      this.coefficient_frequenceOfUrination = this.searchCoefficient(this.frequencyOfUrination, this.value_frequencyOfUrination)
      this.coefficient_colorOfUrination = this.searchCoefficient(this.colorOfUrination, this.value_colorOfUrination)
      this.coefficient_faces = this.searchCoefficient(this.faces, this.value_faces)
      this.coefficient_frequenceOfFaces = this.searchCoefficient(this.frequencyOfFaces, this.value_frequencyOfFaces)
      this.coefficient_colorOfFaces = this.searchCoefficient(this.colorOfFaces, this.value_colorOfFaces)
      this.coefficient_feed = this.searchCoefficient(this.feed, this.value_feed)
      this.coefficient_typeFeed = this.searchCoefficient(this.typeFeed, this.value_typeFeed)
      this.coefficient_breath = this.searchCoefficient(this.breath, this.value_breath)
      this.coefficient_skin = this.searchCoefficient(this.skin, this.value_skin)
    },
    getFirstValue() {
      let resultArray = []
      let result = 1
      resultArray.push(Math.pow(this.weight_cry, this.coefficient_cry))
      resultArray.push(Math.pow(this.weight_swearing, parseFloat(this.coefficient_localizationOfSwearing) + parseFloat(this.coefficient_smellOfSwearing)))
      resultArray.push(Math.pow(this.weight_urination, parseFloat(this.coefficient_frequenceOfUrination) + parseFloat(this.coefficient_colorOfUrination)))
      resultArray.push(Math.pow(this.weight_faces, parseFloat(this.coefficient_faces) + parseFloat(this.coefficient_frequenceOfFaces) + parseFloat(this.coefficient_colorOfFaces)))
      resultArray.push(Math.pow(this.weight_feed, parseFloat(this.coefficient_feed) + parseFloat(this.coefficient_typeFeed)))
      resultArray.push(Math.pow(this.weight_breath, this.coefficient_breath))
      resultArray.push(Math.pow(this.weight_skin, this.coefficient_skin))

      for(let i = 0; i < resultArray.length; i++) {
        result += resultArray[i]
      }
      return result
    },
    getEvaluation() {
      let step = (this.maxCoefficient - this.minCoefficient)/10
      let currentValue =  + this.minCoefficient + step
      let value = this.getFirstValue()
      for(let i = 1; i <= 10; i++) {
        if(value < currentValue) {
          return i
        }
        currentValue += step
      }
    },
    onSubmit() {
      this.getCoefficients()
      this.getMinMaxCoefficient()
      this.valueLabel = this.getEvaluation()
      const url = "http://localhost:5000/"
       axios
           .post(url + 'questionnaire', {
             patientId: localStorage.patientId,
             cry: this.value_cry,
             localizationOfSwearing: this.value_localizationOfSwearing,
             smellOfSwearing: this.value_smellOfSwearing,
             frequenceOfUrination: this.value_frequencyOfUrination,
             colorOfUrination: this.value_colorOfUrination,
             faces: this.value_faces,
             frequenceOfFaces: this.value_frequencyOfFaces,
             colorOfFaces: this.value_colorOfFaces,
             feed: this.value_feed,
             typeFeed: this.value_typeFeed,
             breath: this.value_breath,
             skin: this.value_skin,
             ast: this.valueLabel
           })
           .then(response => {
             if (response.status === 200)
             this.$toast.info("Данні збережено")
           })
    }
  }
}
</script>