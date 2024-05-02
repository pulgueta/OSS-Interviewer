import { LoginForm } from '@/components/form/auth/login-form';

const Register = () => {
	return (
		<main className='container relative flex size-full min-h-svh flex-col items-center justify-center overflow-x-hidden p-2 md:p-4'>
			<div
				// eslint-disable-next-line tailwindcss/no-contradicting-classname
				className='fixed inset-0 -z-20 h-screen w-screen animate-move-background bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_48px]'
				aria-hidden
			/>
			<LoginForm />
		</main>
	);
};
export default Register;
