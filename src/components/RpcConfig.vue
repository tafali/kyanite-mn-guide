<template>
  <v-container>

    <v-row class="text-center">
      <v-col class="mb-4">
        <v-checkbox
          v-model="v.manuel"
          label="I want to do by manuel"
        ></v-checkbox>

        <p v-if="!v.manuel">Please copy and paste your <code>rpcuser</code> and <code>rpcpassword</code> 
          for Kyanite from kyan.conf file located in Kyanite Wallet data directory. <br>
          And add <code>server=1</code> to your kyan.conf file and restart wallet
          <br>
          <v-alert v-if="testResult"
            type="error"
          >
          {{testResult}}
          </v-alert>
        </p>

        <p v-if="v.manuel">You can copy commands and run on your wallet debug console.</p>
      </v-col>
    </v-row>

    <v-row v-if="!v.manuel">
      <v-col cols="5">
        <v-text-field
          label="IP"
          outlined
          v-model="v.rpcIp"
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-text-field
          label="Port"
          outlined
          v-model="v.rpcPort"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="!v.manuel">
      <v-col cols="5">
        <v-text-field
          label="RPC User"
          outlined
          v-model="v.rpcUser"
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-text-field
          label="RPC Password"
          outlined
          v-model="v.rpcPassword"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
          <v-btn
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
		},

    beforeMount: function() {
      window.ipcRenderer.invoke('RpcConfig', null)
            .then((result) => {
              this.v.rpcIp = result.host
              this.v.rpcPort = result.port
              this.v.rpcUser = result.user
              this.v.rpcPassword = result.pass
            });
    },

		data: () => ({
      v: {
        rpcIp:'', 
        rpcPort:'',
        rpcUser:'',
        rpcPassword:'',
        manuel:false
      },
      testResult:''
		}),

		methods: {
      next(){

        if(this.v.manuel){
          this.nextf(this.v)
        } else{
          window.ipcRenderer.invoke('RpcConfig', {
                                                user: this.v.rpcUser,
                                                pass: this.v.rpcPassword,
                                                host: this.v.rpcIp,
                                                port: this.v.rpcPort
                                              })
            .then((/*result*/) => {

              window.ipcRenderer.invoke('rpc', 
                {
                  'jsonrpc': '2.0', 
                  'id': 'kmg' + parseInt(Math.random() * 100000), 
                  'method': 'getnetworkinfo', //getinfo
                  'params': [] 
                }
                )
                .then((result) => {
                  if(result.success){
                    this.nextf(this.v)
                  } else {
                    this.testResult = result.result
                  }
                })
            });

          }
      }
		}
	}
</script>
