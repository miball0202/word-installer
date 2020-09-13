<template>
  <v-app style="background:#202425;">
    <v-app-bar
      app
      color="main_color"
    >
      <div class="d-flex align-center">
        わーどいんすとーら
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <MainContent/>
    </v-main>
  </v-app>
</template>

<script>
import MainContent from './components/MainContent';

export default {
  name: 'App',
  components: {
    MainContent,
  },
};
</script>
