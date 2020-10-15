<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/kyanlogo.svg')"
          class="my-3"
          contain
          height="100"
        />
      </v-col>

      <v-col class="mb-4">
        <h2>
          Welcome to Kyanite MasterNode Installation
        </h2> 
        <p>Please send collateral and get 
            <v-chip
              class="ma-2"
              color="indigo"
              text-color="white"
              small
            >
              <v-avatar left>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-avatar>
              MasterNode Outputs
            </v-chip>  
            with <code>masternode outputs</code> 
            <v-btn icon color="indigo" v-if="!d.manuel" @click="masternodeOutputs()">
              <v-icon>mdi-arrow-right-drop-circle</v-icon>
            </v-btn>
        </p>

      </v-col>
    </v-row>

    <v-row v-if="message">
      <v-col cols="12">
          {{message}}
      </v-col>
    </v-row>

    <v-simple-table v-if="mouts.length">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Collateral Hash
            </th>
            <th class="text-left">
              Collateral Index
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in mouts"
            :key="item.hash"
            @click="v.collateralHash = item.hash; v.collateralIndex = item.index; "
          >
            <td>{{ item.hash }}</td>
            <td>{{ item.index }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-row>
      <v-col cols="9">
        <v-text-field
          label="Collateral Hash"
          outlined
          hint="For example, a138b262dc3e3....."
          v-model="v.collateralHash"
        ></v-text-field>
      </v-col>

      <v-col cols="3">
        <v-text-field
          label="Collateral Index"
          outlined
          hint="Number, like 0, 1, 2 ..."
          v-model="v.collateralIndex"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
          <v-btn
          :disabled="v.collateralHash.length === 0 || v.collateralIndex.length === 0 "
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
        collateralHash:'',
        collateralIndex:''
      },
      message: '',
      mouts: []
    }),

    methods: {
      next(){
        this.nextf(this.v)
      },
      masternodeOutputs() {
        window.ipcRenderer.invoke('rpc', 
          {
            'jsonrpc': '2.0', 
            'id': 'kmg' + parseInt(Math.random() * 100000), 
            'method': 'masternode',
            'params': ['outputs'] 
          }
          )
          .then((result) => {
            if(result.success){
              if(!result.result.error){
                let outs =  result.result.result
                      /*{
                        "f6c83fd96bfaa47887c4587cceadeb9af6238a2c86fe36b883c4d7a6867eab0f": "1",
                        "adsdasdadbfaa47887c4587cceadeb9af6238a2c86fe36b883c4d7a6867eab0f": "2"
                      }*/
                if(Object.keys(outs).length == 0){
                  this.message = "There is no masternode output"
                } else {
                  for (const key in outs) {
                      const ind = outs[key];
                      this.mouts.push({'hash': key, 'index': ind})
                  }
                }
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
