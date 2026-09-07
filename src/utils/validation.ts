import type { FormField } from '../types/form'

export function validateField(
    field: FormField,
    value: unknown,
    ): string | null {

    if (field.required) {
        if (field.type === 'checkbox' && value !== true) {
        return 'Необходимо согласиться с условиями'
        }

        if (typeof value === 'string' && value.trim() === '') {
        return 'Поле обязательно для заполнения'
        }

        if (value === null || value === undefined) {
        return 'Поле обязательно для заполнения'
        }
    }

    if (
        field.minLength &&
        typeof value === 'string' &&
        value.length < field.minLength
    ) {
        return `Минимальная длина — ${field.minLength} символов`
    }

    if (
        field.pattern &&
        typeof value === 'string' &&
        value !== '' &&
        !new RegExp(field.pattern).test(value)
    ) {
        return 'Некорректный формат'
    }

    return null
}