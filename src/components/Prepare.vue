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
               ipport  
               {{d.addrOwner}}  
               {{d.blsPublic}}  
               {{d.addrVoting}}  
               0  
               {{d.addrPayout}}  
               {{d.addrFee}}  <!-- Alert user about this address. It should have coins to pay the transaction fees in it. Also alert that if this address is given blank, payoutAddress will be used for the transaction fees. -->
            </code>
        </p>
      </v-col>
    </v-row>

    <v-row>
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
          outlined
          v-model="v.prepTx"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Collateral Address"
          outlined
          v-model="v.prepCollateralAddress"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Sign Message"
          outlined
          v-model="v.prepSignMessage"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
          <v-btn
          :disabled="v.prepTx.length === 0 || v.prepCollateralAddress.length === 0 || v.prepSignMessage.length === 0 "
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
        prepTx:'',
        prepCollateralAddress:'',
        prepSignMessage:''
      }
    }),

    methods: {
      next(){
        this.nextf(this.v)
      }
    }
  }
</script>
