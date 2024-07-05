<script setup>
import { VueTable } from "@harv46/vue-table";
import "@harv46/vue-table/dist/style.css";

const headers = ["id", "name", "amount", "status", "Created By"];
const keyValue = [
  "id",
  "name",
  "amount",
  "status",
  ["createdUser", "user", "name"],
];

const getData = () => {
  return [
    {
      id: 1,
      name: "John Doe",
      amount: 100,
      status: "Paid",
      createdUser: { user: { name: "Admin" } },
    },
    {
      id: 2,
      name: "Jane Smith",
      amount: 200,
      status: "Pending",
      createdUser: { user: { name: "Admin" } },
    },
    {
      id: 3,
      name: "Alice Johnson",
      amount: 150,
      status: "Paid",
      createdUser: { user: { name: "Admin" } },
    },
    {
      id: 4,
      name: "Robert Brown",
      amount: 300,
      status: "Failed",
      createdUser: { user: { name: "Admin" } },
    },
  ];
};

const tableData = getData();

const deleteItem = (id) => {
  console.log("Delete item with id:", id);
};

const edit = (item) => {
  console.log("Edit item:", item);
};
</script>

<template>
  <VueTable :headers="headers" :keys="keyValue" :data="tableData">
    <template #th>
      <th>Actions</th>
    </template>
    <template #td="{ item }">
      <td class="flex">
        <DeleteIcon @click="deleteItem(item.id)" />
        <EditIcon @click="edit(item)" />
      </td>
    </template>
  </VueTable>
</template>

<style scoped>
.flex {
  display: flex;
  gap: 10px;
}
</style>