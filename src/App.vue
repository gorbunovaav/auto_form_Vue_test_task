<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema } from './types/form'
import FormGenerator from './components/FormGenerator.vue'

const formSchema: FormSchema = {
  fields: [
    {
      type: 'text',
      label: 'Имя',
      model: 'name',
      required: true,
    },
    {
      type: 'email',
      label: 'Email',
      model: 'email',
      required: true,
    },
    {
      type: 'password',
      label: 'Пароль',
      model: 'password',
      required: true,
      minLength: 6,
    },
    {
      type: 'select',
      label: 'Роль',
      model: 'role',
      options: ['Админ', 'Пользователь'],
      required: true,
    },
    {
      type: 'checkbox',
      label: 'Согласен с условиями',
      model: 'terms',
      required: true,
    },
  ],
}

const formData = ref({
  name: '',
  email: '',
  password: '',
  role: '',
  terms: false,
})
</script>

<template>
  <main class="page">
    <section class="page__content">
      <div class="page__header">

        <h1 class="page__title">
          Создание аккаунта
        </h1>

        <p class="page__description">
          Заполните форму, чтобы продолжить
        </p>
      </div>

      <FormGenerator
        :schema="formSchema"
        v-model="formData"
      />

      <!-- <pre class="debug">
        {{ formData }}
      </pre> -->
    </section>
  </main>
</template>