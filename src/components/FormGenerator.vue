<script setup lang="ts">
import type { FormSchema } from '../types/form'
import { reactive } from 'vue'
import { validateField } from '../utils/validation'

const props = defineProps<{
  schema: FormSchema
  modelValue: Record<string, unknown>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, unknown>): void
}>()

const errors = reactive<Record<string, string>>({})
const touched = reactive<Record<string, boolean>>({})

function updateField(model: string, value: unknown) {
    emit('update:modelValue', {
        ...props.modelValue,
        [model]: value,
    })

    if (!touched[model]) {
        return
    }

    const field = props.schema.fields.find(
        (field) => field.model === model,
    )

    if (!field) {
        return
    }

    const error = validateField(field, value)

    if (error) {
        errors[model] = error
    } else {
        delete errors[model]
    }
}

function validateForm() {
    let isValid = true

    for (const field of props.schema.fields) {
        const value = props.modelValue[field.model]

        touched[field.model] = true

        const error = validateField(field, value)

        if (error) {
        errors[field.model] = error
        isValid = false
        } else {
        delete errors[field.model]
        }
    }

    return isValid
}


function handleSubmit() {
    const isValid = validateForm()

    if (!isValid) {
        return
    }

    console.log('Форма отправлена:', props.modelValue)
    }

    function handleBlur(model: string) {
    touched[model] = true

    const field = props.schema.fields.find(
        (field) => field.model === model,
    )

    if (!field) {
        return
    }

    const value = props.modelValue[model]
    const error = validateField(field, value)

    if (error) {
        errors[model] = error
    } else {
        delete errors[model]
    }
}


</script>

<template>
    <form class="form" @submit.prevent="handleSubmit">
        <div
        v-for="field in schema.fields"
        :key="field.model"
        class="form__field"
        >
        <label
            v-if="field.type !== 'checkbox'"
            class="form__label"
            :for="field.model"
        >
            {{ field.label }}
        </label>

        <input
            v-if="['text', 'email', 'password'].includes(field.type)"
            :id="field.model"
            class="form__input"
            :class="{ 'form__input--error': errors[field.model] }"
            :type="field.type"
            :value="modelValue[field.model]"
            :aria-invalid="!!errors[field.model]"
            :aria-describedby="
            errors[field.model]
                ? `${field.model}-error`
                : undefined
            "
            @input="
            updateField(
                field.model,
                ($event.target as HTMLInputElement).value
            )
            "
            @blur="handleBlur(field.model)"
        />

        <select
            v-else-if="field.type === 'select'"
            :id="field.model"
            class="form__input form__select"
            :class="{ 'form__input--error': errors[field.model] }"
            :value="modelValue[field.model]"
            :aria-invalid="!!errors[field.model]"
            :aria-describedby="
            errors[field.model]
                ? `${field.model}-error`
                : undefined
            "
            @change="
            updateField(
                field.model,
                ($event.target as HTMLSelectElement).value
            )
            "
            @blur="handleBlur(field.model)"
        >
            <option value="" disabled>
            Выберите вариант
            </option>

            <option
            v-for="option in field.options"
            :key="option"
            :value="option"
            >
            {{ option }}
            </option>
        </select>

        <label
            v-else-if="field.type === 'checkbox'"
            class="form__checkbox"
        >
            <input
            :id="field.model"
            type="checkbox"
            class="form__checkbox-input"
            :checked="modelValue[field.model]"
            @change="
                updateField(
                field.model,
                ($event.target as HTMLInputElement).checked
                )
            "
            @blur="handleBlur(field.model)"
            />

            <span class="form__checkbox-text">
            {{ field.label }}
            </span>
        </label>

        <p
            class="form__error"
            :class="{ 'form__error--visible': errors[field.model] }"
            :id="`${field.model}-error`"
            role="alert"
        >
            {{ errors[field.model] || ' ' }}
        </p>
        </div>

        <button
        class="form__button"
        type="submit"
        >
        Отправить
        </button>
    </form>
</template>