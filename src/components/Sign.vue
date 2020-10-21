<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <p>Please run this command in your  
            <v-chip
              class="ma-2"
              color="indigo"
              text-color="white"
              small
            >
              wallet
            </v-chip>

            <br/>
            <code>signmessage 
               {{d.prepCollateralAddress}}  
               {{d.prepSignMessage}}
            </code>
            <v-btn icon color="indigo" v-if="!d.manuel" @click="signMessage()">
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

    <v-row>
      <v-col>
        <p>Answer should be like this:
            <br/>
            <v-subheader>
              <pre>
              ILqOusy....
              </pre>
            </v-subheader>
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Answer"
          :rules="[rules.required]"
          outlined
          v-model="v.signAnswer"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
          <v-btn
          :disabled="v.signAnswer.length === 0"
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
        signAnswer:''
      },
      message: '',
      rules: {
          required: value => !!value || 'Required.'
        }
    }),

    methods: {
      next(){
        this.nextf(this.v)
      },
      signMessage() {
        window.ipcRenderer.invoke('rpc', 
          {
            'jsonrpc': '2.0', 
            'id': 'kmg' + parseInt(Math.random() * 100000), 
            'method': 'signmessage',
            'params': [this.d.prepCollateralAddress, this.d.prepSignMessage] 
          }
          )
          .then((result) => {
            if(result.success){
              if(!result.result.error){
                this.v.signAnswer = result.result.result
              } else{
                this.message = result.result.error.code + " : " + result.result.error.message
              }
            } else {
              let err = JSON.parse(result.result)
              this.message = err.error.code + " : " + err.error.message
            }
          })
      }
    }
  }
</script>
