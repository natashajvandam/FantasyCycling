import './App.css';
import { useEffect } from 'react';
import { getTopics } from './Services/apiService';

function App() {
  useEffect(() => {
    getTopics();
  }, []);
  return (
    <div>

    </div>
  );
}

export default App;
