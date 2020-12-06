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
            <code>protx register_submit  
               {{d.prepTx}}  
               {{d.signAnswer}}
            </code>
            <v-btn x-small dark color="indigo" v-if="!d.manuel" @click="submitReg()">
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
      <v-col>
        <p>Answer should be like this:
            <br/>
            <v-subheader>
              <pre>
              9d2e443....
              </pre>
            </v-subheader>
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p>And, Done!</p>
        <p>To check, you can use this command in your 
          <v-chip
            class="ma-2"
            color="indigo"
            text-color="white"
            small
          >
            server
          </v-chip>

          <code>./kyan-cli masternode status</code>
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
          <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="newNode"
          absolute
          right
          >
          Install New Node
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
      },
      message: ''
    }),

    methods: {
      newNode(){
        this.nextf(this.v)
      },
      submitReg() {
        window.ipcRenderer.invoke('rpc', 
          {
            'jsonrpc': '2.0', 
            'id': 'kmg' + parseInt(Math.random() * 100000), 
            'method': 'protx',
            'params': ['register_submit', this.d.prepTx, this.d.signAnswer] 
          }
          )
          .then((result) => {
            if(result.success){
              if(!result.result.error){
                this.message = 'Answer :' + result.result.result
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
