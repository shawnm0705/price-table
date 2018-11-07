var va = new Vue({
  el: '#vue-app',
  data() {
    return {
      suppliers: [],
      medicines: []
    }
  },
  created: () => {
    prepareData();
  },
  methods: {
    intialiseData() {
      this.suppliers = getSuppliers();
      this.medicines = getMedicines();
    }
  },
  mounted() {
    this.intialiseData();
  }
});