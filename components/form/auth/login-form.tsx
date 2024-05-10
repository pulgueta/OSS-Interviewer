'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Link } from 'next-view-transitions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { LoaderCircleIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { type Login, loginSchema } from '@/schemas/loginSchema';
import { default as translations } from '@/i18n/en.json';

export const LoginForm = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const { push } = useRouter();

	const {
		login: { form: translationsForm, schema },
	} = translations;

	const form = useForm<Login>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = form.handleSubmit(async (data) => {
		const query = await fetch('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify(data),
		});

		const res = await query.json();

		if (!query.ok) {
			return toast.error('Error', { description: res.message });
		} else {
			toast.success('Success', { description: res.message });
		}

		form.clearErrors();
		form.reset();

		return push('/dashboard');
	});

	return (
		<Form {...form}>
			<form
				style={{ viewTransitionName: 'login-form' }}
				onSubmit={onSubmit}
				className='w-full space-y-6 rounded-xl border bg-background p-6 shadow md:max-w-lg'
			>
				<header>
					<h2 className='text-2xl font-bold tracking-tighter lg:text-3xl lg:font-extrabold'>
						{translationsForm.title}
					</h2>
					<p className='text-pretty text-sm text-muted-foreground'>
						{translationsForm.description}
					</p>
				</header>
				<div className='flex flex-col items-center gap-4'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='flex w-full flex-col'>
								<FormLabel>
									{translationsForm.labels.email.label}
								</FormLabel>
								<FormControl>
									<Input
										type='email'
										placeholder={
											translationsForm.labels.email
												.placeholder
										}
										max={schema.email.maxLength}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className='flex w-full flex-col'>
								<FormLabel>
									{translationsForm.labels.password.label}
								</FormLabel>
								<FormControl>
									<>
										<Input
											type={
												showPassword
													? 'text'
													: 'password'
											}
											placeholder={
												translationsForm.labels.password
													.placeholder
											}
											autoComplete='password'
											max={schema.password.maxLength}
											{...field}
										/>
										<div className='flex items-center gap-x-2 pt-2'>
											<Checkbox
												id='showPassword'
												checked={showPassword}
												onCheckedChange={() =>
													setShowPassword(
														(prev) => !prev,
													)
												}
											/>
											<Label htmlFor='showPassword'>
												Show password
											</Label>
										</div>
									</>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<footer>
					<Button
						className='w-full'
						type='submit'
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting ? (
							<LoaderCircleIcon className='animate-spin' />
						) : (
							'Submit'
						)}
					</Button>
					<Link
						style={{ viewTransitionName: 'register-form' }}
						href='/register'
						className={buttonVariants({
							variant: 'link',
							className: 'mt-2 w-full text-center',
						})}
					>
						{translationsForm.register}
					</Link>
				</footer>
			</form>
		</Form>
	);
};
