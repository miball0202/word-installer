<template>
  <v-container>
    <v-row
      justify="center"
      align-content="center"
    >
      <v-col>
        <v-card outlined>
          <v-card-text justify-center>
            {{ word }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-card>
      <v-container>
        <v-textarea
          outlined
          label="速読したい文章"
          v-model="text"
          :disabled="load"
        />
        <v-btn
          outlined
          color="primary"
          :disabled="load"
        >
          速読開始
        </v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'MainContent',
  data() {
    return {
      word: 'ここにワードが表示されます',
      text: '',
      convertedText: '',
      load: false
    }
  },
  methods: {
    convertTextToWord() {
      this.load = true;
    }
  }
}
</script>