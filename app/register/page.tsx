import { RegisterForm } from '@/components/form/auth/register-form';

const Register = () => {
	return (
		<main className='flex flex-col items-center justify-center gap-4 md:min-h-svh md:flex-row'>
			<section className='flex size-full h-[50vh] flex-col items-center justify-center p-4 md:h-svh'>
				<header className='mt-16 rounded-lg border-2 p-4 md:my-4 md:p-8'>
					<h1 className='mb-4 text-balance border-b pb-4 text-center text-3xl font-extrabold leading-9 tracking-tighter text-card-foreground md:text-4xl lg:text-5xl'>
						Best interviews!
					</h1>
					<p className='max-w-prose text-pretty text-center text-muted-foreground'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Eos sunt, repellat tempora ex exercitationem voluptatum
						cum rem pariatur quaerat dolores autem laboriosam quos.
					</p>
				</header>
			</section>
			<section className='flex size-full min-h-[50vh] flex-col items-center justify-center bg-card-foreground p-4 md:min-h-svh'>
				<RegisterForm />
			</section>
		</main>
	);
};
export default Register;
