import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';



const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService);


import "primevue/resources/themes/saga-blue/theme.css"       //theme
import "primevue/resources/primevue.min.css"                //core css
import "primeicons/primeicons.css"                           //icons

import ToastService from 'primevue/toastservice';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import Toast from 'primevue/toast';


app.component("pv-button",Button)
app.component("pv-toolbar",Toolbar)
app.component("pv-card",Card)
app.component("pv-data-table",DataTable)
app.component("pv-column",Column)
app.component("pv-column-group",ColumnGroup)
app.component("pv-row",Row)
app.component("pv-input-text",InputText)
app.component("pv-tag",Tag)
app.component("pv-dialog",Dialog)
app.component("pv-dropdown",Dropdown)
app.component("pv-toast",Toast)


app.mount('#app')
