import { redirect } from 'next/navigation';
import AuthApi from '../services/auth';

export default function Home() {
  redirect('/login')
}
