<template>
  <v-app style="background: #3a506b">
    <Navbar />
    <router-view class="mb-12" absolute></router-view>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default {
  name: 'App',

  components: {
    Navbar,
    Footer
  },

  data: () => ({
    //
  })
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Delius+Swash+Caps&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Merriweather&family=Roboto+Slab:wght@100;300;400;500&display=swap');

@import url("https://fonts.googleapis.com/css2?family=Kurale&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300&display=swap");
</style>
