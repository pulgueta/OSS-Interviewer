import { Link } from 'next-view-transitions';

import { BaseForm } from '../base-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';

export const RegisterForm = () => {
	return (
		<BaseForm
			header='Create an account'
			description='Get access to the best interview preparation program.'
		>
			<form>
				<section className='mb-8 grid w-full grid-cols-1 items-center gap-4 md:grid-cols-2'>
					<div>
						<Label htmlFor='firstName'>First name</Label>
						<Input placeholder='Sam' />
					</div>
					<div>
						<Label htmlFor='lastName'>Last name</Label>
						<Input placeholder='Altman' />
					</div>
					<div>
						<Label htmlFor='email'>Email</Label>
						<Input placeholder='example@email.com' type='email' />
					</div>
					<div>
						<Label htmlFor='password'>Password</Label>
						<Input type='password' placeholder='*********' />
					</div>
				</section>

				<footer>
					<Button className='w-full'>Register</Button>
					<Link
						href='/login'
						className={buttonVariants({
							variant: 'link',
							className: 'mt-2 w-full text-center',
						})}
					>
						Already have an account? Login
					</Link>
				</footer>
			</form>
		</BaseForm>
	);
};
