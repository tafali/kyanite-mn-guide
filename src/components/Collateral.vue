<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/kyanlogo.svg')"
          class="my-3"
          contain
          height="100"
        />
      </v-col>

      <v-col class="mb-4">
        <h2>
          Welcome to Kyanite MasterNode Installation
        </h2> 
        <p>Please send collateral and get 
            <v-chip
              class="ma-2"
              color="indigo"
              text-color="white"
              small
            >
              <v-avatar left>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-avatar>
              MasterNode Outputs
            </v-chip>  
            with <code>masternode outputs</code> 
            <v-btn icon color="indigo" v-if="!d.manuel" @click="masternodeOutputs()">
              <v-icon>mdi-arrow-right-drop-circle</v-icon>
            </v-btn>
        </p>

      </v-col>
    </v-row>

    <v-row v-if="message">
      <v-col cols="12">
          {{message}}
      </v-col>
    </v-row>

    <v-row v-if="mouts.length">
      <v-col cols="12">
        <v-select
          :items="mouts"
          v-model="selectedoutput"
          label="Outputs"
          outlined
          @change="selectOutput"
        >
        </v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="9">
        <v-text-field
          label="Collateral Hash"
          :rules="[rules.required, rules.hash64]"
          outlined
          hint="For example, a138b262dc3e3....."
          v-model="v.collateralHash"
        ></v-text-field>
      </v-col>

      <v-col cols="3">
        <v-text-field
          label="Collateral Index"
          :rules="[rules.required, rules.number]"
          outlined
          hint="Number, like 0, 1, 2 ..."
          v-model="v.collateralIndex"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
          <v-btn
          :disabled="v.collateralHash.length === 0 || v.collateralIndex.length === 0 "
          color="blue-grey"
          class="ma-2 white--text"
          @click="next"
          absolute
          right
          >
          Next
          <v-icon right dark>mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  export default {
    props: {
      nextf: { type: Function },
      d: Object
    },

    data: () => ({
      v: {
        collateralHash:'',
        collateralIndex:''
      },
      message: '',
      mouts: [],
      selectedoutput:'',
      rules: {
          required: value => !!value || 'Required.',
          hash64: value => {
            const pattern = /^[a-f0-9]{64}$/gm
            return pattern.test(value) || 'Invalid hash.'
          },
          number: value => {
            const pattern = /^\d+$/gm
            return pattern.test(value) || 'Invalid number.'
          }
        }
    }),

    methods: {
      next(){
        this.nextf(this.v)
      },
      selectOutput(){
        if(this.selectedoutput.indexOf(':') != -1){
          [this.v.collateralHash, this.v.collateralIndex] = this.selectedoutput.split(':')
        } else {
          [this.v.collateralHash, this.v.collateralIndex] = ['', '']
        }
      },
      masternodeOutputs() {
        window.ipcRenderer.invoke('rpc', 
          {
            'jsonrpc': '2.0', 
            'id': 'kmg' + parseInt(Math.random() * 100000), 
            'method': 'masternode',
            'params': ['outputs'] 
          }
          )
          .then((result) => {
            this.mouts = []
            this.selectedoutput = ''

            if(result.success){
              let outs =  result.result

              if(outs.length == 0){
                  this.message = 'There is no masternode output'
              } else {
                outs.forEach(e => {
                  let [key, ind] = Object.entries(e)[0]
                  this.mouts.push(key + ':' + ind)
                }); 
              }
            } else {
              this.message = result.result
            }
          })
      }
    }
  }
</script>
