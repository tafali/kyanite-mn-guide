<template>
  <v-container>

    <v-row class="text-center">
      <v-col class="mb-4">
        <p>Please copy and paste your <code>rpcuser</code> and <code>rpcpassword</code> for Kyanite from kyan.conf file located in Kyanite Wallet data directory.</p>
        <p>Leave blank if you do not have <code>rpcuser</code> and <code>rpcpassword</code> sections in kyan.conf file or if kyan.conf file is empty.</p>
        <p>Test Result : {{testResult}}</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="my-kyanite-rpcuser"
          outlined
          v-model="v.rpcUser"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="my-kyanite-rpcpassword"
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

    <v-row>
       <v-col cols="12">
          <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="testConnection"
          absolute
          right
          >
          Test Connection
          <v-icon right dark>mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
   </v-row>

  </v-container>
</template>

<script>
	import RpcConfig from '../plugins/dashrpc/rpc_config'
	export default {
		props: {
      nextf: { type: Function },
		},

		data: () => ({
      v: {
        rpcUser:RpcConfig.user,
        rpcPassword:RpcConfig.pass,
      },
      testResult:''
		}),

		methods: {
      testConnection(){
        window.ipcRenderer.invoke('rpc', 
          {
            'jsonrpc': '2.0', 
            'id': 'kmg' + parseInt(Math.random() * 100000), 
            'method': 'getnetworkinfo', //getinfo
            'params': [] 
          }
          )
        .then((result) => {
          console.log(result)
          this.testResult = result
        })
      },

      next(){
        this.nextf(this.v)
      }
		}
	}
</script>
