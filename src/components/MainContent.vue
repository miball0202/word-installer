<template>
  <v-container>
    <v-row
      justify="center"
      align-content="center"
    >
      <v-col>
        <v-card outlined>
          <v-card-text class="text-center">
            {{ word }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <br>
    <v-card>
      <v-container>
        <v-textarea
          outlined
          label="速読したい文章"
          v-model="text"
        />
        <v-label
          small
        >
        <span v-if="convertedText.length > 0">
          {{ Number(progress).toFixed() }}
        </span>
        <span v-else>
          0
        </span>
         / 100%
        </v-label>
        <v-progress-linear
          color="light-blue"
          :value="progress"
        />
        <br>
        <v-btn
          outlined
          color="primary"
          @click.prevent="convertTextToWord"
        >
          読み込み
        </v-btn>
        <v-btn
          v-if="convertedText.length > 0"
          outlined
          color="success"
          @click.prevent="runWordInstaller"
        >
          再生
        </v-btn>
        <v-btn
          v-if="running || convertedText.length > 0"
          outlined
          color="yellow"
          @click.prevent="pauseRunner"
        >
          一時停止
        </v-btn>
        <v-btn
          v-if="running || convertedText.length > 0"
          outlined
          color="error"
          @click.prevent="stopRunner"
        >
          停止
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
          max="500"
          v-model="timeInterval"
        ></v-slider>
        <v-text-field
          v-model="range"
          type="number"
          label="最大文字数"
        ></v-text-field>
        <v-slider
          max="25"
          v-model="range"
        ></v-slider>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import kuromoji from 'kuromoji'

export default {
  name: 'MainContent',
  data() {
    return {
      word: 'ここにワードが表示されます',
      text: '',
      convertedText: [],
      runnerIndex: 0,
      timeInterval: 300,
      range: 7,
      stop: false,
      load: false,
      running: false,
      builder: kuromoji.builder({ dictPath: '/dict' })
    }
  },
  computed: {
    progress() {
      return (this.runnerIndex / this.convertedText.length) * 100
    },
    shouldStop() {
      return (this.runnerIndex >= this.convertedText.length) || !this.running
    }
  },
  methods: {
    async convertTextToWord() {
      this.load = true;

      await this.builder.build((err, tokenizer) => {
        if (err) {
          throw err
        } else {
          this.convertedText = tokenizer.tokenize(this.text)
        }
      });

      this.load = false;
    },
    runWordInstaller() {
      this.load = true;
      this.running = true;

      let interval = setInterval(() => {
        this.runner();
        if (this.shouldStop) {
          clearInterval(interval);
        }
      }, this.timeInterval)
    },
    runner() {
      let displayWord = ""
      let analyzing = true
      while (analyzing) {
        if (!this.convertedText[this.runnerIndex]) {
          this.load = false;
          this.running = false;
          this.runnerIndex = 0;
          break;
        }

        let currentObj = this.convertedText[this.runnerIndex]
        let posDetial1 = currentObj.pos_detail_1
        let pos = currentObj.pos

        if (posDetial1 === "読点" || posDetial1 === "句点" || posDetial1 === "括弧閉") {
          analyzing = false;
        }

        displayWord += currentObj.surface_form
        this.runnerIndex++

        if (displayWord.length >= 3 && (pos === '名詞' || pos === '副詞' || pos === '連体詞' || pos === '動詞' || pos === '助詞')) {
          analyzing = false;
        }

        if (displayWord.length >= this.range) {
          analyzing = false
        }
      }
      this.word = displayWord;
    },
    stopRunner() {
      this.running = false;
      this.runnerIndex = 0;
      this.word = 'ここにワードが表示されます';
    },
    pauseRunner() {
      this.running = false;
    },
  }
}
</script>