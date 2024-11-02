import { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import '../styles/global.css';
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>
        <html lang="en">
            <body>
                <Header/>
                {children}
                <Toaster/>
            </body>
        </html>
    </> 
  }