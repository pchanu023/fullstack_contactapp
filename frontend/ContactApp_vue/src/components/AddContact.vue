<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="saveContact">
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

                    <button type="submit" class="btn btn-dark btn-sm mt-4">submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const contact = ref({
    name: '',
    email: '',
    phone: '',
    designation: '',
});
const toast = useToast();

    const saveContact = async () => {
        console.log("Contact values are:", contact.value);


        if(!contact.value.name || !contact.value.email || !contact.value.phone || !contact.value.designation) {
            toast.error("All field are are required!")
        } 

        try {
            const url = 'http://localhost:8000/api/contacts';
            const response = await axios.post(url,contact.value);
            console.log(response);
            if (response.status === 201) {
                toast.success('Contact Added Successfully ');
                contact.value.name ='';
                contact.value.email ='';
                contact.value.phone ='';
                contact.value.designation ='';
            }
        } catch (error) {
            console.log(error)
        }
    }
</script>