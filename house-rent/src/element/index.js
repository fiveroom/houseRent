import {
    Button, Dropdown, DropdownMenu,
    DropdownItem, Tabs, TabPane 
} from 'element-ui';

const element = {
    install: (Vue) => {
        Vue.use(Button);
        Vue.use(Dropdown);
        Vue.use(DropdownMenu);
        Vue.use(DropdownItem);
        Vue.use(Tabs);
        Vue.use(TabPane);
    }
}

export default element