Vue.component('stocks', {
  template: `
    <div class="mx-5">
      <nav>
        <div class="nav nav-tabs" role="tablist">
          <a 
            v-for="(supplier, index) in suppliers" 
            :class="(index == 0) ? 'nav-item nav-link active' : 'nav-item nav-link'" 
            :id="'nav-tab-supplier-' + supplier.id" 
            data-toggle="tab" 
            :href="'#nav-supplier-' + supplier.id" 
            role="tab" 
            :aria-controls="'nav-supplier-' + supplier.id" 
            aria-selected="true">
            {{ supplier.name }}
          </a>
        </div>
      </nav>
      <div class="tab-content">
        <div
          v-for="(supplier, index) in suppliers" 
          :class="(index == 0) ? 'tab-pane fade show active' : 'tab-pane fade show'" 
          :id="'nav-supplier-' + supplier.id" 
          role="tabpanel" 
          :aria-labelledby="'nav-tab-supplier-' + supplier.id">
          <stock-table
            :supplierId="supplier.id"
            :medicines="medicines"
          >
          </stock-table>
        </div>
      </div>
    </div>
  `,
  props: {
    medicines: {
      type: Array,
      default: () => {
        return [];
      }
    },
    suppliers: {
      type: Array,
      default: () => {
        return [];
      }
    }

  },
  methods: {
  }
});
