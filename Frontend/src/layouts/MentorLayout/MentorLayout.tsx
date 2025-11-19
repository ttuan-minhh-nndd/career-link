import Footer from '../../components/Footer'
import Header from '../../components/MentorHeader'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
