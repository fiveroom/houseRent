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
    DatePicker,
    Switch,
    Loading,
    Backtop,
    Notification,
    Icon,
    Table,
    TableColumn,
    MessageBox,
    Tooltip,
    Link,
    Image,
    Radio,
    RadioGroup,
    Input
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
        Vue.use(DatePicker);
        Vue.use(Switch);
        Vue.use(Loading);
        Vue.use(Backtop);
        Vue.use(Icon);
        Vue.use(Table);
        Vue.use(TableColumn);
        Vue.use(Tooltip);
        Vue.use(Link);
        Vue.use(Image);
        Vue.use(Radio);
        Vue.use(RadioGroup);
        Vue.use(Input);
        

        Vue.prototype.$notify = Notification;
        Vue.prototype.$msgBox = MessageBox;
    }
}