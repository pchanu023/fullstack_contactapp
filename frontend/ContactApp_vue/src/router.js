import { createRouter, createMemoryHistory, createWebHistory} from 'vue-router'
import ContactList from './components/Contact.list.vue';
import AddContact from './components/AddContact.vue';
import EditContact from './components/EditContact.vue';


const routes = [
    {
        name: 'ContactList',
        path: '/',
        component: ContactList
    },
    {
        name: 'AddContact',
        path: '/create-contact',
        component: AddContact
    },
    {
        name: 'EditContact',
        path: '/contact/:id?',
        component: EditContact
    }
];

    const router = createRouter ({
        history: createWebHistory(),
        routes
    });

    export default router;
