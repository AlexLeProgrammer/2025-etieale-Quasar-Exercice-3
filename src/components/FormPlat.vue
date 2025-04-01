<template>
<q-card class="form-card">
  <q-form
    @submit="formSubmit"
  >
  <q-card-section>
    <div class="text-h6 heading">{{ action }} Plat</div>
  </q-card-section>
  <q-card-section>

    <div class="row q-mb-md">
      <q-input
        filled
        maxlength="20"
        v-model="plat.nom"
        label="Nom (Burger)"
        class="col" />
    </div>

    <div class="row q-mb-md">
      <q-input
        filled
        maxlength="155"
        v-model="plat.description"
        label="Description"
        type="textarea"
        class="col" />
    </div>

    <div class="row q-mb-md">
      <q-input
        filled
        v-model="plat.image"
        label="URL de l'image"
        class="col" />
      <q-img
        :src="plat.image ? plat.image : 'statics/image-placeholder.png'"
        class="q-ml-sm"
        contain />
    </div>

    <div class="q-mb-md">
      <div class="row">
        <p class="q-mb-none">Note:</p>
      </div>
      <div class="row">
        <q-rating
          v-model="plat.note"
          size="2em"
          color="orange" />
      </div>
    </div>

  </q-card-section>

  <q-card-actions align="right">
    <q-btn
      label="Annuler"
      color="grey"
      v-close-popup />
    <q-btn
      label="Sauver"
      color="primary"
      type="submit" />
  </q-card-actions>
  </q-form>
</q-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { usePlatsStore } from 'stores/store-plats'

const store = usePlatsStore()

const { action, platAModifier } = defineProps({
  action: {
    type: String
  },
  platAModifier: {
    type: Object
  }
})

const plat = ref({
  name: '',
  description: '',
  note: 1,
  image: ''
})

const emit = defineEmits(['close'])

const formSubmit = () => {
  if (plat.value.id) {
    const { value: payload } = plat // destructuration de la tache
    store.modifierPlat(plat.value.id, payload)
  } else {
    store.ajouterPlat(plat.value)
  }
  emit('close')
}

onMounted(() => {
  if (platAModifier) {
    Object.assign(plat.value, platAModifier)
  }
})

</script>

<style>
.form-card {
  min-width: 400px;
}
.form-card .heading {
  text-transform: capitalize;
}
.form-card .q-card-section {
  width: 100%;
}
.thumbnail {
  max-width: 50px;
  max-height: 50px;
}
.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}
.form-card .q-img__image {
  background-size: cover !important;
}
.form-card .q-rating__icon {
  opacity: 0.2;
}
.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>
