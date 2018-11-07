Vue.component('stock-table', {
  template: `
    <div class="my-5">
      <table class="table table-striped table-responsive">
        <thead>
          <tr>
            <th scope="col">药名</th>
            <th scope="col">数量</th>
            <th scope="col">进价</th>
            <th scope="col">合计价</th>
            <th scope="col">批号</th>
            <th scope="col">产地</th>
            <th scope="col">规格</th>
            <th scope="col">有效期至</th>
            <th scope="col">入库时间</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(medicine, index) in medicines">
            <td>
              <template v-if="!isEditing[index]">
                {{ medicine.name }}
              </template>
              <template v-else>
                <input type="text" v-model="editingData.name">
              </template>
            </td>
            <template v-if="!stocks.hasOwnProperty(medicine.id)">
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </template>
            <template v-else>
              <td>
                <template v-if="!isEditing[index]">
                  {{ (stocks[medicine.id].quantity) ? stocks[medicine.id].quantity : 0 }}
                </template>
                <template v-else>
                  <input type="text" v-model="editingData.quantity" class="input-number">
                </template>
              </td>
              <td>
                <template v-if="!isEditing[index]">
                  {{ (stocks[medicine.id].buying_price) ? stocks[medicine.id].buying_price : 0 }}
                </template>
                <template v-else>
                  <input type="text" v-model="editingData.buying_price" class="input-number">
                </template>
              </td>
              <td>{{ (stocks[medicine.id].buying_price && stocks[medicine.id].quantity) ? (stocks[medicine.id].buying_price * stocks[medicine.id].quantity).toFixed(2) : 0 }}</td>
              <td>
                <template v-if="!isEditing[index]">
                  {{ (stocks[medicine.id].number) ? stocks[medicine.id].number : '&nbsp;' }}
                </template>
                <template v-else>
                  <input type="text" v-model="editingData.number">
                </template>
              </td>
              <td>
                <template v-if="!isEditing[index]">
                  {{ (stocks[medicine.id].place) ? stocks[medicine.id].place : '&nbsp;' }}
                </template>
                <template v-else>
                  <input type="text" v-model="editingData.place">
                </template>
              </td>
              <td>
                <template v-if="!isEditing[index]">
                  {{ (stocks[medicine.id].size) ? stocks[medicine.id].size : '&nbsp;' }}
                </template>
                <template v-else>
                  <input type="text" v-model="editingData.size">
                </template>
              </td>
              <td>
                <template v-if="!isEditing[index]">
                  {{ (stocks[medicine.id].expire_date) ? stocks[medicine.id].expire_date : '&nbsp;' }}
                </template>
                <template v-else>
                  <input type="text" v-model="editingData.expire_date">
                </template>
              </td>
              <td>
                <template v-if="!isEditing[index]">
                  {{ (stocks[medicine.id].created_date) ? stocks[medicine.id].created_date : '&nbsp;' }}
                </template>
                <template v-else>
                  <input type="text" v-model="editingData.created_date">
                </template>
              </td>
            </template>
            <td>
              <template v-if="!isEditing[index]">
                <button @click="edit(index)" class="btn btn-primary btn-sm">修改</button>
              </template>
              <template v-else>
                <button @click="save(index)" class="btn btn-success btn-sm">保存</button>
                <button @click="close(index)" class="btn btn-danger btn-sm">取消</button>
              </template>
            </td>
          </tr>
          <tr>
            <td>总计</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>{{ total }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>
              <button @click="add()" class="btn btn-success btn-sm">添加</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  props: {
    supplierId: {
      type: Number,
      default: 0
    },
    medicines: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      stocks: {},
      isEditing: [],
      editingIndex: -1,
      editingData: {
        name: '',
        quantity: '',
        buying_price: ''
      }
    }
  },
  computed: {
    // total buying price
    total() {
      let total = 0;
      for (let key in this.stocks) {
        if (Object.prototype.hasOwnProperty.call(this.stocks, key)) {
          if (this.stocks[key].quantity && this.stocks[key].buying_price) {
            total += this.stocks[key].quantity * this.stocks[key].buying_price;
          }
        }
      }
      return total.toFixed(2);
    }
  },
  methods: {
    loadData() {
      this.stocks = getStocks(this.supplierId);
      // initailise isEditing array
      this.medicines.forEach((val, i) => {
        this.isEditing[i] = false;
      });
    },
    edit(index) {
      if (!this.medicines[index]) {
        return;
      }
      if (this.editingIndex > -1) {
        this.save(this.editingIndex);
      }
      this.editingIndex = index;
      this.editingData = JSON.parse(JSON.stringify(this.stocks[this.medicines[index].id]));
      this.editingData.name = this.medicines[index].name;
      this.isEditing.splice(index, 1, true);
    },
    save(index) {
      this.medicines[index].name = this.editingData.name;
      this.stocks[this.medicines[index].id] = JSON.parse(JSON.stringify(this.editingData));
      this.updateData();
      this.close(index);
    },
    close(index) {
      this.isEditing.splice(index, 1, false);
      this.editingIndex = -1;
    },
    updateData() {
      console.log('current stocks: ', this.stocks);
    }
  },
  mounted() {
    this.loadData();
  }
});
