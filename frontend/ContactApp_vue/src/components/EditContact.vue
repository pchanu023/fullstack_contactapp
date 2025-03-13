<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="updateContact">
                    <div class="form-group">
                        <input type="text" v-model="contact.name"  class="form-control" placeholder="Enter Name">
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="email" v-model="contact.email"  class="form-control" placeholder="Enter Email">
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="text"  v-model="contact.phone" class="form-control" placeholder="Enter Phone">
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="text" v-model="contact.designation"  class="form-control" placeholder="Enter Designation">
                    </div>

                    <button type="submit" class="btn btn-dark btn-sm mt-4">Update</button>
                </form>
            </div>
        </div>
    </div>
</template>

    <script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter,useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const contact = ref({
    name: '',
    email: '',
    phone: '',
    designation: '',
});

const getContactsById = async () => {
    try{
        const url =`http://localhost:8000/api/contacts/${route.params.id}`;
        const response = await axios.get(url);
        contact.value = response.data;
    }catch (error) {
        console.log(error);
    }
}
const updateContact = async () => {
    if(!contact.value.name || !contact.value.email || !contact.value.phone || !contact.value.designation) {
            toast.error("All field are are required!")
        }
    try {
        const url = `http://localhost:8000/api/contacts/${route.params.id}`;
        const response = await axios.put(url,contact.value);
        console.log(response.data);
        
        if(response.status === 200 ){
            toast.success('Contact Update Successfully');
            router.push({name:'ContactList'});
        } 
        }  catch (error) {
        console.log(error)
    }
}
    
onMounted(() => {
    getContactsById();
})

</script>
