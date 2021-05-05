import {
  OK,
  NO_RECORD,
  UNPROCESSABLE_ENTITY,
} from '../const/util'
import axios from 'axios';
import { API } from '@/const/api';

const state = {
  keyword: '',
  successful: false,
  name: null,
  icon: null,
  rating: null,
  photo: null,
  vicinity: null,
  userRatingsTotal: null,
  priceLevel: null,
  ratingStar: null,
  lat: null,
  lng: null,
  placeId: null,
  modal: false,
  distance: null,
  direction: null,
  walking: null,
  bycicle: null,
  car: null,
  errorMessages: null,
  errorModal: false,
}

const getters = {}

const mutations = {
  setErrorMessages(state, value) {
    state.errorMessages = value
    state.errorModal = true
  },
  setNearBySearch(state, value) {
    state.successful = true
    state.name = value.name
    state.icon = value.icon
    state.rating = value.rating
    state.photo = value.photo
    state.vicinity = value.vicinity
    state.userRatingsTotal = value.userRatingsTotal
    state.priceLevel = value.priceLevel
    state.ratingStar = value.ratingStar
    state.lat = value.lat
    state.lng = value.lng
    state.placeId = value.placeId
    state.errorMessages = null
    state.modal = true
  },
  setKeyword(state, value) {
    state.keyword = value
  },
  setModal(state, value) {
    state.modal = value
  },
  undoErrorMessages(state) {
    state.errorMessages = null
  },
  setDistance(state, value) {
    state.distance = value.distance
    state.direction = value.direction
    state.walking = value.ways.walking
    state.bycicle = value.ways.bycicle
    state.car = value.ways.car
  },
  setGooglePlace(state, value) {
    state.successful = true
    state.name = value.name
    state.icon = value.icon
    state.rating = value.rating
    state.photo = value.photo
    state.vicinity = value.vicinity
    state.userRatingsTotal = value.userRatingsTotal
    state.priceLevel = value.priceLevel
    state.lat = value.lat
    state.lng = value.lng
    state.placeId = value.placeId
    state.ratingStar = value.ratingStar
  },
  resetParam(state) {
    state.successful = false
    state.name = null
    state.icon = null
    state.rating = null
    state.photo = null
    state.vicinity = null
    state.userRatingsTotal = null
    state.priceLevel = null
    state.lat = null
    state.lng = null
    state.placeId = null
    state.ratingStar = null
  }
}

const actions = {
  // Get nearBySearch
  async getNearBySearch(context, params) {
    const res = await axios.get(API.NEAR_BY_SEARCH, params)
    const resData = res.data

    if (res.status === OK) {
      context.commit('setNearBySearch', resData)
    }

    if (res.status === NO_RECORD) {
      context.commit('undoErrorMessages')
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
  // Get google place
  async getGooglePlace(context, params) {
    const res = await axios.get(API.GOOGLE_PLACE, params)
    const resData = res.data

    if (res.status === OK) {
      context.commit('setGooglePlace', resData)
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