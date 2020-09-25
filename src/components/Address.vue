<template>
  <v-container>
    <v-row class="text-center">

      <v-col class="mb-4">
        <p>We need a few  
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
            You can give it a name, if you want <code>getnewaddress addr_name</code>
            <br/>
            And send some coin to the address that will be used for "Fee Address"
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Owner Address"
          outlined
          v-model="v.addrOwner"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Voting Address"
          outlined
          v-model="v.addrVoting"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Payout Address"
          outlined
          v-model="v.addrPayout"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Fee Address"
          outlined
          v-model="v.addrFee"
          hint="This is optional. If this is empty, 'Payout Address' will be used."
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
          <v-btn
          :disabled="v.addrOwner.length === 0 || v.addrVoting.length === 0 || v.addrPayout.length === 0 "
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

    data: () => ({
      v: {
        addrOwner:'',
        addrVoting:'',
        addrPayout:'',
        addrFee:''
      }
    }),

    methods: {
      next(){
        this.nextf(this.v)
      }
    }
  }
</script>
