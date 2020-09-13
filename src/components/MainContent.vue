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
          @click.prevent="convertTextToWord"
        >
          読み込み
        </v-btn>
        <v-btn
          v-if="convertedText.length > 0"
          outlined
          color="success"
          :disabled="load"
          @click.prevent="runWordInstaller"
        >
          速読開始
        </v-btn>
      </v-container>
    </v-card>
    <v-spacer></v-spacer>
    <v-card>
      <v-container>
        <v-text-field
          v-model="timeInterval"
          type="number"
          label="速度(ms)"
        ></v-text-field>
        <v-slider
          max="2000"
          v-model="timeInterval"
        ></v-slider>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import TinySegmenter from 'tiny-segmenter'
const segmenter = new TinySegmenter()

export default {
  name: 'MainContent',
  data() {
    return {
      word: 'ここにワードが表示されます',
      text: '',
      convertedText: [],
      runnerIndex: 0,
      timeInterval: 500,
      stop: false,
      load: false
    }
  },
  methods: {
    convertTextToWord() {
      this.load = true;

      this.convertedText = segmenter.segment(this.text);

      this.load = false;
    },
    runWordInstaller() {
      this.load = true;
      this.runnerIndex = 0;

      let interval = setInterval(() => {
        this.runner();
        if (this.runnerIndex >= this.convertedText.length || this.stop) {
          clearInterval(interval);
        }
      }, this.timeInterval)

      this.load = false;
    },
    runner() {
      this.word = this.convertedText[this.runnerIndex]
      this.runnerIndex++
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  }
}
</script>