import api from '@/api/api';

// جلب كل التصنيفات
export async function getCategories() {
  const { data } = await api.get('/api/categories');
  return data.data;
}

// إنشاء تصنيف
export async function createCategory(categoryData) {
  const { data } = await api.post('/api/categories', categoryData);
  return data.data;
}

// تعديل تصنيف
export async function updateCategory(id, categoryData) {
  const { data } = await api.put(`/api/categories/${id}`, categoryData);
  return data.data;
}

// حذف تصنيف
export async function deleteCategory(id) {
  const { data } = await api.delete(`/api/categories/${id}`);
  return data;
}
