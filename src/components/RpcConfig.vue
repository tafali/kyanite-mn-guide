<template>
  <v-container>

    <v-row>
      <v-col class="mb-4">
        <v-checkbox
          v-model="d.manuel"
        > <template v-slot:label> <span class="teal--text darken-2 bold"> I want to setup manually </span> </template>
        </v-checkbox>

		<div v-if="!d.manuel">
			<p> Please copy and paste your <code>rpcuser</code> and <code>rpcpassword</code> 
				for Kyanite from <code>kyan.conf</code> file located in Kyanite Wallet data directory. If <code>kyan.conf</code> file is empty or there is no lines for <code>rpcuser</code> and <code>rpcpassword</code> please add these lines and set a username and a strong password to them as shown in the example below. Please also add a <code>server=1</code> line to your <code>kyan.conf</code> file and restart the wallet for it to be able to accept rpc commands. 
			</p>
			<p class="teal text-center">
				<span class="pa-3 white--text">To run commands, you can use </span>
				<v-btn x-small dark color="indigo">
          Run <v-icon right small>mdi-arrow-right-drop-circle</v-icon>
        </v-btn>
				<span class="white--text">button next to the command.</span>
			</p>
			<p>
			<span class="teal--text darken-2 bold">Example:</span><br>
				<code>rpcuser=my-kyanite-rpc-user</code><br>
				<code>rpcpassword=f8b0faff31638e7179f3e8ad4f50a753b1392b07f36fdf4756610855daf9c4ba</code><br>
				<v-alert v-if="testResult"
					type="error"
				>
				{{testResult}}
				</v-alert>
			</p>
		</div>
        <p v-if="d.manuel" class="teal--text">You can copy commands and run on your wallet debug console.</p>
      </v-col>
    </v-row>

    <v-row v-if="!d.manuel">
      <v-col cols="5">
        <v-text-field
          label="IP"
          :rules="[rules.required]"
          outlined
          v-model="rpcIp"
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-text-field
          label="Port"
          :rules="[rules.required, rules.port]"
          outlined
          v-model="rpcPort"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="!d.manuel">
      <v-col cols="5">
        <v-text-field
          label="RPC User"
          :rules="[rules.required]"
          outlined
          v-model="rpcUser"
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-text-field
          label="RPC Password"
          :rules="[rules.required]"
          outlined
          v-model="rpcPassword"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="d.manuel || (rpcIp && rpcPort && rpcUser && rpcPassword)">
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
      d: Object
		},

    beforeMount: function() {
      window.ipcRenderer.invoke('RpcConfig', null)
            .then((result) => {
              this.rpcIp = result.host
              this.rpcPort = result.port
              this.rpcUser = result.user
              this.rpcPassword = result.pass
            });
    },

		data: () => ({
      rpcIp:'', 
      rpcPort:'',
      rpcUser:'',
      rpcPassword:'',
      testResult:'',
      rules: {
          required: value => !!value || 'Required.',
          port: value => {
            const pattern = /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
            return pattern.test(value) || 'Invalid port.'
          }
        }
		}),

		methods: {
      next(){

        if(this.d.manuel){
          this.nextf()
        } else{
          window.ipcRenderer.invoke('RpcConfig', {
                                                user: this.rpcUser,
                                                pass: this.rpcPassword,
                                                host: this.rpcIp,
                                                port: this.rpcPort
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
                    this.nextf()
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
