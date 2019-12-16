import {
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Tabs,
    TabPane,
    Breadcrumb,
    BreadcrumbItem,
} from 'element-ui';

const element = {
    install: (Vue) => {
        Vue.use(Button);
        Vue.use(Dropdown);
        Vue.use(DropdownMenu);
        Vue.use(DropdownItem);
        Vue.use(Tabs);
        Vue.use(TabPane);
        Vue.use(Breadcrumb);
        Vue.use(BreadcrumbItem);
    }
}

export default element