import { Route, Routes } from 'react-router-dom';
import { ErrorPage } from './components/content/ErrorPage';
import { Home } from './components/content/home/Home';
import { Search } from './components/content/search/Search';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';

function App() {
    return (
        <div className="app">
            <Header></Header>
            <main className="pageContent">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="search" element={<Search />} />
                    <Route path='*' element={<ErrorPage message="404: Requested page does not exist" />}/>
                </Routes>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default App;
