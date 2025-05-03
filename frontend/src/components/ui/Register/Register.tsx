// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom'; // Import useNavigate
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Button } from '@/components/ui/button';
// // import pornhub from '@/assets/pornhub.svg';
// import { DatePickerDemo } from './Datepicker';
// // import { Text } from '@/components/ui/typography';
// // import { FormEvent, ChangeEvent } from 'react';

// // interface FormData {
// //   fullName: string;
// //   email: string;
// //   password: string;
// //   confirmPassword: string;
// //   dateOfBirth: Date | null;
// // }

// // const RegisterForm = () => {
// //   const [formData, setFormData] = useState<FormData>({
// //     fullName: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: '',
// //     dateOfBirth: null,
// //   });
// //   const [error, setError] = useState<string | null>(null);
// //   const navigate = useNavigate(); // Hook để điều hướng

// //   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
// //     const { id, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [id]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setError(null);

// //     if (formData.password !== formData.confirmPassword) {
// //       setError("Passwords do not match!");
// //       return;
// //     }

// //     const payload = {
// //       fullName: formData.fullName,
// //       email: formData.email,
// //       password: formData.password,
// //       dateOfBirth: formData.dateOfBirth?.toISOString() || null,
// //     };

// //     try {
// //       const response = await fetch('/api/register', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(payload),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to send data to server');
// //       }

// //       // Reset form
// //       setFormData({
// //         fullName: '',
// //         email: '',
// //         password: '',
// //         confirmPassword: '',
// //         dateOfBirth: null,
// //       });

// //       // Điều hướng về trang login
// //       navigate('/login');
// //     } catch (err) {
// //       if (err instanceof Error) {
// //         setError(err.message || 'Something went wrong');
// //       } else {
// //         setError('Something went wrong');
// //       }
// //     }
// //   };
// export function RegisterForm(){
//   return (
//   //   <div className='flex min-h-screen flex-row items-center justify-center bg-black'>
//   //     <div className='hidden lg:block w-full lg:w-1/2 h-screen relative'>
//   //       <img
//   //         src={pornhub}
//   //         alt='Hot Air Balloon'
//   //         className='w-full h-full object-contain'
//   //       />
//   //       <div className='absolute inset-0 bg-yellow-400 opacity-50 rounded-r-[50px]'></div>
//   //     </div>

//   //     <div className='w-full lg:w-1/2 h-screen flex items-center justify-center p-4 sm:p-8'>
//   //       <div className='w-full max-w-sm sm:max-w-md space-y-6'>
//   //         <h2 className='text-xl sm:text-2xl font-bold text-center text-white'>Register Your Account</h2>

//   //         {error && (
//   //           <Text className='text-red-500 text-center'>{error}</Text>
//   //         )}

//   //         <form onSubmit={handleSubmit} >
//   //         <div className='space-y-4'>
//   //           <div className='space-y-2'>
//   //             <Label htmlFor='fullName' className='text-white'>
//   //               Full Name
//   //             </Label>
//   //             <Input
//   //               id='fullName'
//   //               placeholder='Enter your full name'
//   //               className='w-full bg-gray-800 text-white placeholder-gray-400'
//   //               value={formData.fullName}
//   //               onChange={handleInputChange}
//   //               required
//   //             />
//   //           </div>

//   //           <div className='space-y-2'>
//   //             <Label htmlFor='email' className='text-white'>
//   //               Email
//   //             </Label>
//   //             <Input
//   //               id='email'
//   //               type='email'
//   //               placeholder='Enter your email'
//   //               className='w-full bg-gray-800 text-white placeholder-gray-400'
//   //               value={formData.email}
//   //               onChange={handleInputChange}
//   //               required
//   //             />
//   //           </div>

//   //           <div className='space-y-2'>
//   //             <Label htmlFor='password' className='text-white'>
//   //               Password
//   //             </Label>
//   //             <Input
//   //               id='password'
//   //               type='password'
//   //               placeholder='Enter your password'
//   //               className='w-full bg-gray-800 text-white placeholder-gray-400'
//   //               value={formData.password}
//   //               onChange={handleInputChange}
//   //               required
//   //             />
//   //           </div>

//   //           <div className='space-y-2'>
//   //             <Label htmlFor='confirmPassword' className='text-white'>
//   //               Confirm Password
//   //             </Label>
//   //             <Input
//   //               id='confirmPassword'
//   //               type='password'
//   //               placeholder='Confirm your password'
//   //               className='w-full bg-gray-800 text-white placeholder-gray-400'
//   //               value={formData.confirmPassword}
//   //               onChange={handleInputChange}
//   //               required
//   //             />
//   //           </div>

//   //           <div className='space-y-2'>
//   //              <Label htmlFor='dateOfBirth' className='text-white'>
//   //                Date of Birth
//   //              </Label>
//   //              <DatePickerDemo />
//   //            </div>
//   //            </div>
//   //           <Button
//   //             type='submit'
//   //             className='w-full bg-yellow-400 hover:bg-yellow-500 text-black'
//   //           >
//   //             Register New Account
//   //           </Button>
//   //         </form>

//   //         <Text className='text-center py-4'>
//   //           Already have an account?{' '}
//   //           <a href='/login' className='text-blue-300 hover:text-blue-200'>
//   //             Log in
//   //           </a>
//   //         </Text>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
//   <DatePickerDemo />
// )}

// export default RegisterForm;
