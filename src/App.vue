<template>
  <v-app>
    <v-app-bar
      app
      color="teal"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Kyanite Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/kyanlogo.svg')"
          transition="scale-transition"
          width="50"
        />
        <v-img
          alt="Kyanite Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/kyanname.svg')"
          transition="scale-transition"
          width="80"
        />
      </div>
    </v-app-bar>

    <v-main>
      <component :is="c" :nextf="entryNext" :backf="entryBack" :d="d"></component>
    </v-main>
  </v-app>
</template>

<script>
import RpcConfig from './components/RpcConfig';
import Collateral from './components/Collateral';
import BLS from './components/BLS';
import Server from './components/Server';
import Address from './components/Address';
import Prepare from './components/Prepare';
import Sign from './components/Sign';
import Submit from './components/Submit';

export default {
  name: 'App',

  components: {
    RpcConfig, Collateral, BLS, Server, Address, Prepare, Sign, Submit
  },

  data: () => ({
    c : 'RpcConfig',
    d : {
		manuel:false,

		collateralHash:'',
		collateralIndex:'',

		blsSecret:'',
		blsPublic:'',

		serverIp:'',
		serverPort:'7577',

		addrOwner:'',
		addrVoting:'',
		addrPayout:'',
		addrFee:'',

		prepTx:'',
		prepCollateralAddress:'',
		prepSignMessage:'',
		signAnswer:''
    }
  }),

  methods: {
    entryNext() {
		if(this.c === 'RpcConfig'){
			this.c = 'Collateral'
		} else if(this.c === 'Collateral'){
			this.c = 'BLS'
		} else if(this.c === 'BLS'){
			this.c = 'Server'
		} else if(this.c === 'Server'){
			this.c = 'Address'
		} else if(this.c === 'Address'){
			this.c = 'Prepare'
		} else if(this.c === 'Prepare'){
			this.c = 'Sign'
		} else if(this.c === 'Sign'){
			this.c = 'Submit'
		} else if(this.c === 'Submit'){
			this.d = {
				manuel:false,

				collateralHash:'',
				collateralIndex:'',

				blsSecret:'',
				blsPublic:'',

				serverIp:'',
				serverPort:'7577',

				addrOwner:'',
				addrVoting:'',
				addrPayout:'',
				addrFee:'',

				prepTx:'',
				prepCollateralAddress:'',
				prepSignMessage:'',
				signAnswer:''
			}
			this.c = 'RpcConfig'
		}
	},
    entryBack() {
		if(this.c === 'Collateral'){
			this.c = 'RpcConfig'
		} else if(this.c === 'BLS'){
			this.c = 'Collateral'
		} else if(this.c === 'Server'){
			this.c = 'BLS'
		} else if(this.c === 'Address'){
			this.c = 'Server'
		} else if(this.c === 'Prepare'){
			this.c = 'Address'
		} else if(this.c === 'Sign'){
			this.c = 'Prepare'
		} else if(this.c === 'Submit'){
			this.c = 'Sign'
		}
    }
  }
};
</script>
