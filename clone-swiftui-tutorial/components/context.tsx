"use client"

import { createContext, useContext } from "react"

const AssetContext = createContext<{ assets: React.ReactNode[] }>({
  assets: [],
})

export function AssetProvider({
  assets,
  children,
}: {
  assets: React.ReactNode[]
  children: React.ReactNode
}) {
  return (
    <AssetContext.Provider value={{ assets }}>{children}</AssetContext.Provider>
  )
}

export function useAsset(i: number) {
  const { assets } = useContext(AssetContext)
  return assets[i]
}

export function Asset({ i }: { i: number }) {
  return useAsset(i)
}
