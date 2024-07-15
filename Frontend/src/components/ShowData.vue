<template>
  <VueTable :headers="headers" :keys="keyValue" :data="tableData">
    <template #th>
    </template>
    <template #td="{ item }">
      <td class="flex">
      </td>
    </template>
  </VueTable>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {VueTable} from "@harv46/vue-table";
import "@harv46/vue-table/dist/style.css";

const headers = ["fname", "mname", "lname", "nationality", "prefecture", "city",
  "phone_no", "email", "national_id", "height", "weight", "postal_code", "address", "emergency_contact_number", "allergies",
  "medical_conditions", "blood_related_diseases", "blood_type", "slider_value"];
const keyValue = ["fname", "mname", "lname", "nationality", "prefecture", "city",
  "phone_no", "email", "national_id", "height", "weight", "postal_code", "address",
  "emergency_contact_number", "allergies", "medical_conditions", "blood_related_diseases",
  "blood_type", "slider_value"];

const tableData = ref([]);

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/donors');
    const data = await response.json();
    tableData.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});

const deleteItem = (id) => {
  console.log("Delete item with id:", id);
};

const edit = (item) => {
  console.log("Edit item:", item);
};
</script>

<style scoped>
.flex {
  display: flex;
  gap: 10px;
}
</style>
