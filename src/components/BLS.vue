<template>
  <v-container>
    <v-row class="text-center">

      <v-col class="mb-4">
        <p>Please generate a  
            <v-chip
              class="ma-2"
              color="indigo"
              text-color="white"
              small
            >
              <v-avatar left>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-avatar>
              BLS key pair
            </v-chip>  
            with <code>bls generate</code>
            <v-btn x-small dark color="indigo" v-if="!d.manuel" @click="blsGenerate()">
              Run <v-icon small>mdi-arrow-right-drop-circle</v-icon>
            </v-btn>
        </p>
      </v-col>
    </v-row>

    <v-row v-if="message">
      <v-col cols="12">
          {{message}}
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Secret"
          :rules="[rules.required, rules.hash]"
          outlined
          v-model="d.blsSecret"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Public"
          :rules="[rules.required, rules.hash]"
          outlined
          v-model="d.blsPublic"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
          <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="back"
          absolute
          left
          >
          <v-icon left dark>mdi-arrow-left</v-icon>
          Back
          </v-btn>
          <v-btn
          :disabled="d.blsSecret.length === 0 || d.blsPublic.length === 0 "
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
      backf: { type: Function },
      d: Object
    },

    data: () => ({
      message: '',
      rules: {
          required: value => !!value || 'Required.',
          hash: value => {
            const pattern = /^[a-f0-9]+$/gm
            return pattern.test(value) || 'Invalid hash.'
          }
        }
    }),

    methods: {
      next(){
        this.nextf()
      },
      back(){
        this.backf()
      },
      blsGenerate() {
        window.ipcRenderer.invoke('rpc', 
          {
            'jsonrpc': '2.0', 
            'id': 'kmg' + parseInt(Math.random() * 100000), 
            'method': 'bls',
            'params': ['generate'] 
          }
          )
          .then((result) => {
            if(result.success){
              if(!result.result.error){
                let blso =  result.result.result
                      /*{
                        "secret": "52f35cd3d977a505485f2474e7e71ef3f60f859603d72ad6b0fa7f7bd163e144",
                        "public": "885d01d746c3e4d2093b0975de2d8c1f3e5a2c3e8fdaaed929f86fc9fbb278a095248163c101a2456650b415776b7990"
                      }*/
                      
                this.d.blsSecret = blso.secret
                this.d.blsPublic = blso.public
              } else{
                this.message = result.result.error.code + " : " + result.result.error.message
              }
            } else {
              this.message = result.result
            }
          })
      }
    }
  }
</script>
