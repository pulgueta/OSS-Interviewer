'use client';

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
import { registerSchema, type Register } from '@/schemas/registerSchema';
import { default as translations } from '@/i18n/en.json';

export const RegisterForm = () => {
	const {
		register: { form: translationsForm, schema },
	} = translations;

	const form = useForm<Register>({
		defaultValues: {
			username: '',
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			confirmPassword: '',
		},
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = form.handleSubmit(async (data) => {
		const query = await fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify(data),
		});

		const res = await query.json();

		if (!query.ok) {
			return toast.error('Error', { description: res.message });
		}

		return toast.success('Success', { description: res.message });
	});

	return (
		<Form {...form}>
			<form
				style={{ viewTransitionName: 'auth' }}
				onSubmit={onSubmit}
				className='w-full space-y-6 rounded-xl border bg-background p-4 md:max-w-xl'
			>
				<header>
					<h2 className='text-2xl font-bold tracking-tighter lg:text-3xl lg:font-extrabold'>
						{translationsForm.title}
					</h2>
					<p className='text-pretty text-sm text-muted-foreground'>
						{translationsForm.description}
					</p>
				</header>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>
									{translationsForm.labels.username.label}
								</FormLabel>
								<FormControl>
									<Input
										placeholder={
											translationsForm.labels.username
												.placeholder
										}
										autoComplete='username'
										max={schema.username.maxLength}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
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
						name='firstName'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>
									{translationsForm.labels.firstName.label}
								</FormLabel>
								<FormControl>
									<Input
										placeholder={
											translationsForm.labels.firstName
												.placeholder
										}
										autoComplete='firstName'
										max={schema.firstName.maxLength}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='lastName'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>
									{translationsForm.labels.lastName.label}
								</FormLabel>
								<FormControl>
									<Input
										placeholder={
											translationsForm.labels.lastName
												.placeholder
										}
										autoComplete='lastName'
										max={schema.lastName.maxLength}
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
							<FormItem className='flex flex-col'>
								<FormLabel>
									{translationsForm.labels.password.label}
								</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder={
											translationsForm.labels.password
												.placeholder
										}
										autoComplete='password'
										max={schema.password.maxLength}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>
									{
										translationsForm.labels.confirmPassword
											.label
									}
								</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder={
											translationsForm.labels
												.confirmPassword.placeholder
										}
										autoComplete='confirmPassword'
										max={schema.confirmPassword.maxLength}
										{...field}
									/>
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
						style={{ viewTransitionName: 'auth' }}
						href='/login'
						className={buttonVariants({
							variant: 'link',
							className: 'mt-2 w-full text-center',
						})}
					>
						{translationsForm.login}
					</Link>
				</footer>
			</form>
		</Form>
	);
};
