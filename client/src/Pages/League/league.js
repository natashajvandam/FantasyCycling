import './league.css';
//import List from '../List/list';
//import Form from '../Form/form';
import { useEffect, useState } from 'react';
import { getTopics } from '../../Services/apiService';

function League () {
  const [allRiders, setRiders] = useState([]);
  useEffect(() => {
    getTopics().then(result => setRiders(result));
  }, []);
  return (
    <div>
    hello
    </div>
  )
}

export default League;