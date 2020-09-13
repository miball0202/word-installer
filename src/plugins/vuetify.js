import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
  },
  themes: {
    dark: {
      main_color: '#282E2E',
      sub_color: '#1E2324',
      background: '#202425'
    },
  },
});
