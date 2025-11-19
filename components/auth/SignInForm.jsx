'use client';

import Checkbox from '@/components/form/input/Checkbox';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/methods/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.data));

        // تحديث Zustand
        useAuthStore.getState().setAuth(data.data, data.token);

        // تخزين الكوكيز (في حال SSR)
        document.cookie = `token=${data.token}; path=/; SameSite=Lax`;

        toast.success(data.message || 'تم تسجيل الدخول بنجاح');
        router.push('/');
      } else {
        toast.error(data.message || 'فشل تسجيل الدخول');
      }
    },
    onError: (err) => {
      const message = err?.response?.data?.message || 'فشل تسجيل الدخول';
      toast.error(message);
    },
  });

  const onSubmit = (formData) => {
    loginMutation.mutate(formData);
  };

  return (
    <div className="flex w-full flex-1 flex-col lg:w-1/2">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div className="mb-5 sm:mb-8">
          <h1 className="text-title-sm sm:text-title-md mb-2 font-semibold text-gray-800 dark:text-white/90">
            تسجيل الدخول
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            أدخل بياناتك لتسجيل الدخول
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* البريد الإلكتروني */}
            <div>
              <Label>
                البريد الإلكتروني <span className="text-error-500">*</span>
              </Label>
              <Input
                {...register('email', { required: 'البريد الإلكتروني مطلوب' })}
                placeholder="أدخل البريد الإلكتروني"
                type="email"
              />
              {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
            </div>

            {/* كلمة المرور */}
            <div>
              <Label>
                كلمة المرور <span className="text-error-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  {...register('password', { required: 'كلمة المرور مطلوبة' })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="أدخل كلمة المرور"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <FiEye className="fill-gray-500 dark:fill-gray-400" />
                  ) : (
                    <FiEyeOff className="fill-gray-500 dark:fill-gray-400" />
                  )}
                </span>
              </div>
              {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
            </div>

            {/* تذكرني ونسيت كلمة المرور */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <span className="text-theme-sm block font-normal text-gray-700 dark:text-gray-400">
                  تذكرني
                </span>
              </div>
              <Link
                href="/reset-password"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400 text-sm"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>

            {/* زر تسجيل الدخول */}
            <div>
              <Button className="w-full" size="sm" disabled={loginMutation.isLoading}>
                {loginMutation.isLoading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-5">
          <p className="text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
            ليس لديك حساب؟{' '}
            <Link
              href="/signup"
              className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              سجل الآن
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
