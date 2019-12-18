import {
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Tabs,
    TabPane,
    Breadcrumb,
    BreadcrumbItem,
    Upload,
    Dialog,
    Steps,
    Step,
} from 'element-ui';

export default {
    install: (Vue) => {
        Vue.use(Button);
        Vue.use(Dropdown);
        Vue.use(DropdownMenu);
        Vue.use(DropdownItem);
        Vue.use(Tabs);
        Vue.use(TabPane);
        Vue.use(Breadcrumb);
        Vue.use(BreadcrumbItem);
        Vue.use(Upload);
        Vue.use(Dialog);
        Vue.use(Steps);
        Vue.use(Step);
    }
}