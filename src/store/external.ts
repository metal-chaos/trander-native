import {
  OK,
  NO_RECORD,
  UNPROCESSABLE_ENTITY,
} from '../const/util'
import axios from 'axios';
import { ServiceStorage } from "@/services/common/storage";

import {
  DIRECTION_TYPE
} from '../const/external'
import { API } from '@/const/api';


const state = {
  cityName: null,
  cityId: null,
  region: null,
  countryCode: null,
  lat: null,
  lng: null,
  currentLat: 0,
  currentLng: 0,
  wikiDataId: null,
  icon: false,
  modal: false,
  settingModal: false,
  rangeOfDistance: [0, 100],
  msg: '車や電車で遠出しましょう',
  errorMessages: null,
  errorModal: false,
  suggestPushing: false,
  distance: null,
  direction: null,
  walking: null,
  bycicle: null,
  car: null,
  geoLocationModal: false,
  geoLocationSetting: null,
  directionType: DIRECTION_TYPE.NONE.NUM,
  settingDirection: false,
  hotels: null,
  hotelsShowing: false,
  facilities: null,
  weathers: null,
  wiki: null,
  searchingUrl: null,
}

const getters = {}

const mutations = {
  setNewLocation(state, value) {
    state.cityName = value.city
    state.cityId = value.id
    state.region = value.region
    state.countryCode = value.countryCode
    state.lat = value.latitude
    state.lng = value.longitude
    state.wikiDataId = value.wikiDataId
    state.icon = true
    state.modal = true
    setTimeout(() => state.suggestPushing = true, 5000)
    state.distance = value.distance
    state.direction = value.direction
    state.walking = value.ways.walking
    state.bycicle = value.ways.bycicle
    state.car = value.ways.car
  },
  setModal(state, value) {
    state.modal = value
  },
  setSettingModal(state, value) {
    state.settingModal = value
  },
  setRangeOfDistance(state, value) {
    state.rangeOfDistance = value
  },
  setMsg(state, value) {
    state.msg = value
  },
  setCurrentLocation(state, value) {
    state.currentLat = value.lat
    state.currentLng = value.lng
    state.lat = value.lat
    state.lng = value.lng
  },
  setSetting(state, value) {
    state.rangeOfDistance = value.distance
    state.directionType = value.directionType
  },
  setErrorMessages(state, value) {
    state.errorMessages = value
    state.errorModal = true
  },
  setErrorModal(state, value) {
    state.errorModal = value
  },
  setSuggestPushing(state, value) {
    state.suggestPushing = value
  },
  setGeoLocationModal(state, value) {
    state.geoLocationModal = value
  },
  setGeoLocationSetting(state, value) {
    state.geoLocationModal = true
    state.geoLocationSetting = value
  },
  setSettingDirection(state, value) {
    state.settingDirection = value
  },
  setDirectionType(state, value) {
    state.directionType = value
    state.settingDirection = false
  },
  setHotel(state, value) {
    state.hotels = value
    state.hotelsShowing = true
  },
  setFacility(state, value) {
    state.facilities = value
  },
  setWeather(state, value) {
    state.weathers = value
  },
  setWiki(state, value) {
    state.wiki = value
  },
  setCityById(state, value) {
    state.cityName = value.city
    state.region = value.region
    state.countryCode = value.countryCode
    state.lat = value.latitude
    state.lng = value.longitude
    state.wikiDataId = value.wikiDataId
  },
  setDistance(state, value) {
    state.distance = value.distance
    state.direction = value.direction
    state.walking = value.ways.walking
    state.bycicle = value.ways.bycicle
    state.car = value.ways.car
  },
  setSearchingUrl(state, value) {
    state.searchingUrl = value
  },
}

const actions = {
  async getLoading(context, data) {
    const apiToken = await ServiceStorage.getItem(ServiceStorage.KEY_API_TOKEN);
    const settingParam = {
      params: {
        apiToken: apiToken.value,
      }
    }
    const res = await axios.get(API.SETTING, settingParam)

    if (res.status === OK && Object.keys(res.data).length) {
      const settings = {
        distance: [
          res.data.min_distance,
          res.data.max_distance
        ],
        directionType: res.data.direction_type,
      }
      context.commit('setSetting', settings)
    }

    // TODO:
    // レスポンスが空の時の処理
    // Error handling

    // 現在地をセット
    context.commit('setCurrentLocation', data.param)
    // 現在地権限モーダルの削除
    context.commit('setGeoLocationModal', false)
  },
  async setNewLocation(context, { data }) {
    context.commit('setSuggestPushing', false)
    const res = await axios.post(API.GEO_DB_CITIES, data)

    // レスポンスが空ではない時の処理
    if (res.status === OK && res.data.status === OK) {
      const resData = res.data.data[0]
      context.commit('setNewLocation', resData)
    }

    // レスポンスが空の処理
    if (res.status === OK && res.data.status === NO_RECORD) {
      const errors = res.data.errors.message
      context.commit('setErrorMessages', errors)
    }
  },
  async setSetting(context, { states, parameters }) {
    context.commit('setSetting', states)
    context.commit('setSettingModal', false)
    await axios.post(API.SETTING, parameters)
  },
  async setDirectionType(context, data) {
    context.commit('setDirectionType', data)
  },
  // Hotel
  async getHotel(context, params) {
    const res = await axios.get(API.HOTEL, params)
    const resData = res.data

    if (res.status === OK) {
      context.commit('setHotel', resData)
    }

    if (res.status === NO_RECORD) {
      return false;
    }

    if (res.status === UNPROCESSABLE_ENTITY) {
      const resErrors = res.data.errors
      context.commit('setErrorMessages', resErrors)
    }
  },
  // Facility
  async getFacility(context, params) {
    const res = await axios.get(API.FACILITY, params)
    const resData = res.data

    if (res.status === OK) {
      context.commit('setFacility', resData)
    }

    if (res.status === NO_RECORD) {
      return false;
    }

    if (res.status === UNPROCESSABLE_ENTITY) {
      const resErrors = res.data.errors
      context.commit('setErrorMessages', resErrors)
    }
  },
  // Weather
  async getWeather(context, params) {
    const res = await axios.get(API.WEATHER, params)
    const resData = res.data

    if (res.status === OK) {
      context.commit('setWeather', resData)
    }

    if (res.status === NO_RECORD) {
      return false;
    }

    if (res.status === UNPROCESSABLE_ENTITY) {
      const resErrors = res.data.errors
      context.commit('setErrorMessages', resErrors)
    }
  },
  // Wiki
  async getWiki(context, params) {
    const res = await axios.get(API.WIKI_CITY, params)
    const resData = res.data

    if (res.status === OK) {
      context.commit('setWiki', resData)
    }

    if (res.status === NO_RECORD) {
      return false;
    }

    if (res.status === UNPROCESSABLE_ENTITY) {
      const resErrors = res.data.errors
      context.commit('setErrorMessages', resErrors)
    }
  },
  // Get geo-db-cities
  async getCityById(context, params) {
    const res = await axios.get(API.GEO_DB_CITIES, params)
    const resData = res.data

    if (res.status === OK) {
      context.commit('setCityById', resData)
    }

    if (res.status === NO_RECORD) {
      return false;
    }

    if (res.status === UNPROCESSABLE_ENTITY) {
      const resErrors = res.data.errors
      context.commit('setErrorMessages', resErrors)
    }
  },
  // Get distance
  async getDistance(context, params) {
    const res = await axios.get(API.DISTANCE, params)
    const resData = res.data

    if (res.status === OK) {
      context.commit('setDistance', resData)
    }

    if (res.status === NO_RECORD) {
      return false;
    }

    if (res.status === UNPROCESSABLE_ENTITY) {
      const resErrors = res.data.errors
      context.commit('setErrorMessages', resErrors)
    }
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}