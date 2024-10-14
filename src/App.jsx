import { Link } from 'react-router-dom';
import './App.css'
import { BookOpen, Heart } from 'lucide-react';
import Books from './components/Books';
function App() {
  return (
    <>
      <div className='flex justify-between'>
        <Link to="/" className="flex gap-3">
          <BookOpen size={24} />
          <span>Gutenberg Library</span>
        </Link>
        <div className="flex gap-12">
          <Link to="/">Home</Link>
          <Link to="/wishlist" className='flex gap-1 items-center'>
            <Heart size={18} />
            Wishlist
          </Link>
        </div>
      </div>
      <Books />

    </>
  )
}

export default App
