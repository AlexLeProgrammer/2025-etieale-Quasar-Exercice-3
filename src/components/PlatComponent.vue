<template>
<q-card
  class="card">
  <q-img
    :src="plat.image"
    basic
    contain
  >
    <div class="absolute-bottom text-h6">
      {{ plat.nom }}
    </div>
  </q-img>

  <q-card-section>
    <q-rating
      readonly
      :model-value="plat.note"
      size="2em"
      color="orange"
      class="q-mt-sm"
    />
  </q-card-section>

  <q-card-section v-if="plat.description" class="description">
    {{ plat.description }}
  </q-card-section>

  <q-card-section v-else class="description text-italic">
    Aucune description fournie
  </q-card-section>

  <q-card-actions
    class="absolute-bottom"
    align="right">
    <q-btn
      @click="afficherFormPlat = true"
      icon="edit"
      color="blue"
      flat>Modifier</q-btn>
    <q-btn
      @click.stop="confirmerSuppression"
      icon="delete"
      color="red"
      flat>Supprimer</q-btn>
  </q-card-actions>

  <q-dialog
    v-model="afficherFormPlat">
    <FormPlat
      @close="afficherFormPlat = false"
      action="modifier"
      :plat-a-modifier="plat"
    />
  </q-dialog>
</q-card>
</template>

<script setup>
import { ref } from 'vue'
import FormPlat from 'components/FormPlat.vue'
import { usePlatsStore } from 'stores/store-plats.js'
import { Dialog } from 'quasar'

const confirmerSuppression = (id) => {
  Dialog.create({
    title: 'Suppression',
    message: 'Êtes-vous sûr de vouloir supprimer ce plat ?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    store.supprimerPlat(plat.id)
  })
}
const afficherFormPlat = ref(false)
const { plat } = defineProps(['plat'])
const store = usePlatsStore()
</script>

<style lang="scss">
.card {
  min-height: 400px;
  max-width: 250px;
  width: 250px;
  transition: background 0.3s;

  .q-img {
    max-height: 180px;
  }

  .q-img__image {
    background-size: cover !important;
  }

  .q-rating__icon {
    opacity: 0.2;
  }

  .q-rating__icon--active {
    opacity: 1;
  }

  .description {
    padding: 5px 16px;
  }
}

.card-clickable {
  cursor: pointer;

  &:hover {
    background: #bdbdbd !important;
  }
}
</style>
