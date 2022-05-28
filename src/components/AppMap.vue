<script setup lang="ts">
import { Loader } from "@googlemaps/js-api-loader"
import { onMounted, onUnmounted, ref } from 'vue'
import mapData from '@/assets/map/mapdata'
import markerSvg from '@/assets/marker.svg'

const markers: google.maps.Marker[] = [];
let mapInstance: google.maps.Map

const root = ref<HTMLElement | null>(null)

// Create google map loader
function initLoader() {
  const loaderOptions = {
    apiKey: 'AIzaSyA1Krb9T9-F1KMysusQqc3b_Hk6YRL-0YU',
    version: 'weekly',
  }

  return {
    loader: new Loader(loaderOptions)
  }
}

function addMarker(position: google.maps.LatLng) {
  const marker = new google.maps.Marker({
    position,
    map: mapInstance
  })

  markers.push(marker)
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

    // const infowindow = new google.maps.InfoWindow({
    //   content: `<h1>Hello world</h1>`
    // })

    // marker.addListener('click', () => {
    //   infowindow.open({
    //     anchor: marker,
    //     map: mapInstance,
    //     shouldFocus: false
    //   }) 
    // })

    marker.setMap(mapInstance)
  })
}

onMounted(async () => {
  await initMap(root.value as HTMLElement)
})

onUnmounted(() => {
})

</script>

<template>
  <div ref="root" class="app-map"></div>
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
