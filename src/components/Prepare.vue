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
            <code>protx register_prepare 
               {{d.collateralHash}}  
               {{d.collateralIndex}}  
               {{d.serverIp}}:{{d.serverPort}}   
               {{d.addrOwner}}  
               {{d.blsPublic}}  
               {{d.addrVoting}}  
               0  
               {{d.addrPayout}}  
               {{d.addrFee}}  <!-- Alert user about this address. It should have coins to pay the transaction fees in it. Also alert that if this address is given blank, payoutAddress will be used for the transaction fees. -->
            </code>
            <v-btn x-small dark color="indigo" v-if="!d.manuel" @click="registerPrepare()">
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

    <v-row v-if="false">
      <v-col cols="12">
        <p>Answer should be like this:
        <br/>
        <v-subheader>
          <pre>
          {
            "tx": "030001000....",
            "collateralAddress": "KooQo8...",
            "signMessage": "KXSS7h2s...."
          }
          </pre>
        </v-subheader>
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Tx"
          :rules="[rules.required]"
          outlined
          v-model="d.prepTx"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Collateral Address"
          :rules="[rules.required]"
          outlined
          v-model="d.prepCollateralAddress"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Sign Message"
          :rules="[rules.required]"
          outlined
          v-model="d.prepSignMessage"
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
          :disabled="d.prepTx.length === 0 || d.prepCollateralAddress.length === 0 || d.prepSignMessage.length === 0 "
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
          required: value => !!value || 'Required.'
        }
    }),

    methods: {
      next(){
        this.nextf()
      },
      back(){
        this.backf()
      },
      registerPrepare() {
        window.ipcRenderer.invoke('rpc', 
          {
            'jsonrpc': '2.0', 
            'id': 'kmg' + parseInt(Math.random() * 100000), 
            'method': 'protx',
            'params': ['register_prepare', this.d.collateralHash, this.d.collateralIndex, this.d.serverIp+':'+this.d.serverPort,
                       this.d.addrOwner, this.d.blsPublic, this.d.addrVoting, 0, this.d.addrPayout, this.d.addrFee] 
          }
          )
          .then((result) => {
            if(result.success){
              if(!result.result.error){
                let po =  result.result.result
                      /*{
                        "tx": "030001000....",
                        "collateralAddress": "KooQo8...",
                        "signMessage": "KXSS7h2s...."
                      }*/
                this.d.prepTx = po.tx
                this.d.prepCollateralAddress = po.collateralAddress
                this.d.prepSignMessage = po.signMessage
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
