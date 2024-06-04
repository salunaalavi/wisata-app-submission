<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { CalendarCellTrigger, type CalendarCellTriggerProps, useForwardProps } from 'radix-vue'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarCellTrigger
    :class="cn(
      buttonVariants({ variant: 'ghost' }),
      'h-9 w-9 p-0 font-normal',
      '[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground dark',
      // Selected
      'data-[selected]:[var(--primary)] data-[selected]:[var(--accent)] data-[selected]:opacity-100 data-[selected]:hover:[var(--accent)] data-[selected]:hover:[var(--accent)] data-[selected]:focus:bg-primary data-[selected]:focus:[var(--accent)]',
      // Disabled
      'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
      // Unavailable
      'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',
      // Outside months
      'data-[outside-month]:pointer-events-none data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:bg-accent/50 [&[data-outside-month][data-selected]]:text-muted-foreground [&[data-outside-month][data-selected]]:opacity-30',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCellTrigger>
</template>
