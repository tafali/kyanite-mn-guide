<template>
  <v-container>
    <v-row class="text-center">

      <v-col class="mb-4">
        <p class="caption" >We need a few  
            <v-chip
              class="ma-2"
              color="indigo"
              text-color="white"
              small
            >
              <v-avatar left>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-avatar>
              address
            </v-chip>
            You can generate them with <code>getnewaddress</code>. 
            or if you want <code>getnewaddress addr_name</code>
            <br/>
            And send some coin to the address that will be used for "Fee Address"
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Name Prefix"
          outlined
          v-model="namePrefix"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <code>getnewaddress {{namePrefix}}_owner</code>
        <v-btn x-small dark color="indigo" v-if="!d.manuel" @click="newAddress('owner')">
          Run <v-icon small>mdi-arrow-right-drop-circle</v-icon>
        </v-btn>
        <v-text-field
          label="Owner Address"
          :rules="[rules.required, rules.kyanaddr]"
          outlined
          v-model="d.addrOwner"
        ></v-text-field>
      </v-col>


      <v-col cols="6">
        <code>getnewaddress {{namePrefix}}_voting</code>
        <v-btn x-small dark color="indigo" v-if="!d.manuel" @click="newAddress('voting')">
          Run <v-icon small>mdi-arrow-right-drop-circle</v-icon>
        </v-btn>
        <v-text-field
          label="Voting Address"
          :rules="[rules.required, rules.kyanaddr]"
          outlined
          v-model="d.addrVoting"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <code>getnewaddress {{namePrefix}}_payout</code>
        <v-btn x-small dark color="indigo" v-if="!d.manuel" @click="newAddress('payout')">
          Run <v-icon small>mdi-arrow-right-drop-circle</v-icon>
        </v-btn>
        <v-text-field
          label="Payout Address"
          :rules="[rules.required, rules.kyanaddr]"
          outlined
          v-model="d.addrPayout"
        ></v-text-field>
      </v-col>

      <v-col cols="6">
        <code>getnewaddress {{namePrefix}}_fee</code>
        <v-btn x-small dark color="indigo" v-if="!d.manuel" @click="newAddress('fee')">
          Run <v-icon small>mdi-arrow-right-drop-circle</v-icon>
        </v-btn>
        <v-text-field
          label="Fee Address (If you want, you can use 'Payout Address)"
          :rules="[rules.required, rules.kyanaddr]"
          outlined
          v-model="d.addrFee"
          hint="This is optional. If you want, you can use 'Payout Address'"
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
          :disabled="d.addrOwner.length === 0 || d.addrVoting.length === 0 || d.addrPayout.length === 0 "
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
      namePrefix:'mn01',
      message: '',
      rules: {
          required: value => !!value || 'Required.',
          kyanaddr: value => {
            const pattern = /^K[a-z0-9]+$/ig
            return pattern.test(value) || 'Invalid KYAN Address.'
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
      newAddress(tip) {
        window.ipcRenderer.invoke('rpc', 
          {
            'jsonrpc': '2.0', 
            'id': 'kmg' + parseInt(Math.random() * 100000), 
            'method': 'getnewaddress',
            'params': [this.namePrefix + '_' + tip] 
          }
          )
          .then((result) => {
            if(result.success){
              if(!result.result.error){
                if(tip === 'owner')
                  this.d.addrOwner = result.result.result
                else if(tip === 'voting')
                  this.d.addrVoting = result.result.result
                else if(tip === 'payout')
                  this.d.addrPayout = result.result.result
                else if(tip === 'fee')
                  this.d.addrFee = result.result.result
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
