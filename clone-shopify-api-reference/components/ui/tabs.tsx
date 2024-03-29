"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List ref={ref} className={cn("", className)} {...props} />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref} className={cn("", className)} {...props} />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn("", className)} {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export const LocalStoredTabs = ({
  localStorageKey,
  ...props
}: { localStorageKey: string } & React.ComponentProps<typeof Tabs>) => {
  const [value, setValue] = React.useState(
    typeof localStorage !== "undefined"
      ? localStorage?.getItem(localStorageKey) || props.defaultValue
      : props.defaultValue,
  )

  React.useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === localStorageKey) {
        setValue(e.newValue || props.defaultValue)
      }
    }
    window.addEventListener("storage", handler)
    return () => {
      window.removeEventListener("storage", handler)
    }
  }, [localStorageKey])

  return (
    <Tabs
      {...props}
      onValueChange={(value) => {
        localStorage.setItem(localStorageKey, value)
        window.dispatchEvent(
          new StorageEvent("storage", {
            key: localStorageKey,
            newValue: value,
          }),
        )
      }}
      value={value}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
