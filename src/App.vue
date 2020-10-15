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
      <component :is="c" :nextf="entryNext" :d="d"></component>
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
    RpcConfig,Collateral,BLS,Server,Address,Prepare,Sign,Submit
  },

  data: () => ({
    c : 'RpcConfig',
    d : {
		manuel:true,

		collateralHash:'',
		collateralIndex:'',

		blsSecret:'',
		blsPublic:'',

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
    entryNext(v) {
		if(this.c === 'RpcConfig'){
			this.d.manuel = v.manuel
			this.c = 'Collateral'
		} else if(this.c === 'Collateral'){
			this.d.collateralHash = v.collateralHash
			this.d.collateralIndex = v.collateralIndex
			this.c = 'BLS'
		} else if(this.c === 'BLS'){
			this.d.blsSecret = v.blsSecret
			this.d.blsPublic = v.blsPublic
			this.c = 'Server'
		} else if(this.c === 'Server'){
			this.c = 'Address'
		} else if(this.c === 'Address'){
			this.d.addrOwner = v.addrOwner
			this.d.addrVoting = v.addrVoting
			this.d.addrPayout = v.addrPayout
			this.d.addrFee = v.addrFee
			this.c = 'Prepare'
		} else if(this.c === 'Prepare'){
			this.d.prepTx = v.prepTx
			this.d.prepCollateralAddress = v.prepCollateralAddress
			this.d.prepSignMessage = v.prepSignMessage
			this.c = 'Sign'
		} else if(this.c === 'Sign'){
			this.d.signAnswer = v.signAnswer
			this.c = 'Submit'
		}
    }
  }
};
</script>
