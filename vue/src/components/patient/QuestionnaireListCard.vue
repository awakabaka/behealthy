<template>
  <div class="justify-content-center" style="margin: auto; max-width: 1550px">
    <b-card class="profile" style="width: 1400px;">
      <div class="row">
        <b-card-text style="margin-bottom: 10px; color: #355454;  margin-right: auto; margin-left: 30px;">{{$t('ast')}}{{ visit_data.ast }}</b-card-text>
        <b-card-text style="margin-bottom: 10px; color: #355454;  margin-right: auto; margin-right: 30px;">{{ $d(new Date(visit_data.time), "long") }}</b-card-text>
      </div>
      <div class="flex-row" style="border: 1px; border-style: dotted; border-color: #355454; margin-bottom: 15px;"/>
      <div class="row">
        <div class="column">
          <b-card-text style="margin-bottom: 10px; line-break: strict; text-align: left">{{ $t('cry') }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; text-align: left">{{ $t('localizationOfSwearing') }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; text-align: left">{{ $t('smellOfSwearing') }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; text-align: left">{{ $t('frequenceOfUrination') }}</b-card-text>
        </div>
        <div class="column" style="margin-left: 40px">
          <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ $t(visit_data.cry) }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ $t(visit_data.localizationOfSwearing) }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ $t(visit_data.smellOfSwearing) }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ $t(visit_data.frequenceOfUrination) }}</b-card-text>
        </div>
        <div class="column" style="margin-left: 150px">
          <b-card-text style="margin-bottom: 10px; line-break: strict; text-align: left">{{ $t('colorOfUrination') }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; text-align: left">{{ $t('faces') }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; text-align: left">{{ $t('frequenceOfFaces') }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; text-align: left">{{ $t('colorOfFaces') }}</b-card-text>
        </div>
        <div class="column" style="margin-left: 40px">
          <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ $t(visit_data.colorOfUrination) }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ $t(visit_data.faces) }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ $t(visit_data.frequenceOfFaces) }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ $t(visit_data.colorOfFaces) }}</b-card-text>
        </div>
        <div class="column" style="margin-left: 150px">
          <b-card-text style="margin-bottom: 10px; line-break: strict; text-align: left">{{ $t('feed') }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; text-align: left">{{ $t('typeFeed') }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; text-align: left">{{ $t('breath') }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; text-align: left">{{ $t('skin') }}</b-card-text>
        </div>
        <div class="column" style="margin-left: 40px">
          <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ $t(visit_data.feed) }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ $t(visit_data.typeFeed) }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ $t(visit_data.breath) }}</b-card-text>
          <b-card-text style="margin-bottom: 10px; color: #355454; text-align: left">{{ $t(visit_data.skin) }}</b-card-text>
        </div>
      </div>
    </b-card>
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
  background-color: #FFFFFF;
  color: #248F99;
  box-shadow: 0px 4px 8px  #58ABB7;
}
.column {
  margin-left: 30px;
  text-align: left;

}
</style>

<script>

export default {
  data() {
    return {
    }
  },
  props: {
    visit_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
}
</script>