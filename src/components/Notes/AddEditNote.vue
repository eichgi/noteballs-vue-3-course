<template>
  <div class="card p-4 mb-5" :class="`has-background-${bgColor}-dark`">
    <label class="label has-text-white"
           v-if="label">{{ label }}</label>
    <div class="field">
      <div class="control">
          <textarea class="textarea"
                    :value="modelValue"
                    @input="$emit('update:modelValue', $event.target.value)"
                    :placeholder="placeholder"
                    ref="textareaRef"
                    maxlength="100"
                    v-autofocus/>
      </div>
    </div>
    <slot name="uploads"/>
    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {vAutofocus} from "../../directives/vAutofocus";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: 'success',
  },
  placeholder: {
    type: String,
    default: "Type something...",
  },
  label: {
    type: String,
  }
});

const emit = defineEmits(['update:modelValue']);

const textareaRef = ref(null);

const focusTextArea = () => {
  textareaRef.value.focus();
};

defineExpose({
  focusTextArea,
});
</script>

<style scoped>

</style>