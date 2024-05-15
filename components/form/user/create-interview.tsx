'use client';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { LoaderCircleIcon } from 'lucide-react';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	type Interview,
	interviewSchema,
} from '@/schemas/createInterviewSchema';
import { default as translations } from '@/i18n/en.json';

export const CreateInterviewForm = () => {
	const { push } = useRouter();

	const { form: translationsForm, schema } =
		translations.dashboard.createInterview;

	const form = useForm<Interview>({
		defaultValues: {
			jobDescription: '',
			jobTitle: '',
			title: '',
			yearsOfExperience: 0,
		},
		resolver: zodResolver(interviewSchema),
	});

	const onSubmit = form.handleSubmit(async (data) => {
		const query = await fetch('/api/interview', {
			method: 'POST',
			body: JSON.stringify(data),
		});

		const res = await query.json();

		if (!query.ok) {
			return toast.error('Error', { description: res.message });
		} else {
			toast.success('Success', { description: res.message });
		}

		form.reset();
		form.clearErrors();

		return push('/login');
	});

	return (
		<Form {...form}>
			<form
				style={{ viewTransitionName: 'register-form' }}
				onSubmit={onSubmit}
				className='w-full'
			>
				<div className='mb-4 grid grid-cols-1 gap-4'>
					<div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>
										{translationsForm.labels.title.label}
									</FormLabel>
									<FormControl>
										<Input
											placeholder={
												translationsForm.labels.title
													.placeholder
											}
											autoComplete=''
											max={schema.title.maxLength}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='jobTitle'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>
										{translationsForm.labels.jobTitle.label}
									</FormLabel>
									<FormControl>
										<Input
											placeholder={
												translationsForm.labels.jobTitle
													.placeholder
											}
											max={schema.jobTitle.maxLength}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='yearsOfExperience'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>
										{
											translationsForm.labels
												.yearsOfExperience.label
										}
									</FormLabel>
									<FormControl>
										<Input
											placeholder={
												translationsForm.labels
													.yearsOfExperience
													.placeholder
											}
											autoComplete='.yearsOfExperience'
											max={
												schema.yearsOfExperience
													.maxLength
											}
											type='number'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='jobDescription'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>
									{
										translationsForm.labels.jobDescription
											.label
									}
								</FormLabel>
								<FormControl>
									<Textarea
										className='h-32'
										placeholder={
											translationsForm.labels
												.jobDescription.placeholder
										}
										autoComplete='jobDescription'
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
							translationsForm.button
						)}
					</Button>
				</footer>
			</form>
		</Form>
	);
};
