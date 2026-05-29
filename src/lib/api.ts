import { supabase } from './supabase'
import type { Category, Product } from './types'

// ---- Public reads (only active / non-deleted products) ----

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('tiandy_il_categories')
    .select('*')
    .order('sort', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  let query = supabase
    .from('tiandy_il_products')
    .select('*, category:tiandy_il_categories!inner(slug)')
    .is('deleted_at', null)
    .order('sort', { ascending: true })

  if (categorySlug) {
    query = query.eq('category.slug', categorySlug)
  }
  const { data, error } = await query
  if (error) throw error
  return (data ?? []) as unknown as Product[]
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('tiandy_il_products')
    .select('*')
    .is('deleted_at', null)
    .eq('is_featured', true)
    .order('sort', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('tiandy_il_products')
    .select('*')
    .eq('slug', slug)
    .is('deleted_at', null)
    .maybeSingle()
  if (error) throw error
  return data
}

// ---- Admin (requires authenticated session) ----

export async function getAllProductsAdmin(includeDeleted = true): Promise<Product[]> {
  let query = supabase
    .from('tiandy_il_products')
    .select('*')
    .order('sort', { ascending: true })
  if (!includeDeleted) query = query.is('deleted_at', null)
  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export type ProductInput = Omit<
  Product,
  'id' | 'created_at' | 'updated_at' | 'deleted_at'
>

export async function createProduct(input: ProductInput): Promise<Product> {
  const { data, error } = await supabase
    .from('tiandy_il_products')
    .insert(input)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateProduct(
  id: string,
  patch: Partial<ProductInput>,
): Promise<Product> {
  const { data, error } = await supabase
    .from('tiandy_il_products')
    .update(patch)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// Soft delete (removable + restorable)
export async function removeProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from('tiandy_il_products')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

export async function restoreProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from('tiandy_il_products')
    .update({ deleted_at: null })
    .eq('id', id)
  if (error) throw error
}

// Permanent delete
export async function destroyProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from('tiandy_il_products')
    .delete()
    .eq('id', id)
  if (error) throw error
}
