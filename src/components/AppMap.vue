<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import { onMounted, onUnmounted, ref } from 'vue'
import mapData from '@/config/mapdata'
import markerSvg from '@/assets/marker.svg'

let mapInstance: google.maps.Map | null

const root = ref<HTMLElement | null>(null)

// Create google map loader
function initLoader() {
  const loaderOptions = {
    apiKey: 'AIzaSyA1Krb9T9-F1KMysusQqc3b_Hk6YRL-0YU',
    version: 'weekly'
  }

  return {
    loader: new Loader(loaderOptions)
  }
}

// Initialize a google map instance and add some markers
async function initMap(el: HTMLElement): Promise<void> {
  await initLoader().loader.load()

  mapInstance = new google.maps.Map(el, {
    center: { lat: 49.2036649, lng: -122.9084825 },
    zoom: 12,
    zoomControl: false,
    fullscreenControl: false,
    scaleControl: false,
    streetViewControl: false,
    mapTypeControl: false
  })

  // Add some markers
  mapData.forEach(point => {
    const marker: google.maps.Marker = new google.maps.Marker({
      position: new google.maps.LatLng(point.location.lat, point.location.lon),
      label: { text: `${point.label}`, color: '#fff', className: 'map-marker-label' },
      icon: markerSvg
    })

    marker.setMap(mapInstance)
  })
}

onMounted(async () => {
  await initMap(root.value as HTMLElement)
})

onUnmounted(() => {
  mapInstance = null
})

</script>

<template>
  <div ref="root" class="app-map" />
</template>

<style lang="scss">
.app-map {
  position: absolute;
  width: 100%;
  height: 100%;
}

.map-marker-label {
  position: relative;
  top: -5px;
}
</style>
