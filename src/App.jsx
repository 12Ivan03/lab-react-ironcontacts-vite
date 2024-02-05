
import { useState } from 'react';
import contactsData from './contacts.json'
import "./App.css";

function App() {
  let showContact = contactsData.slice(0,5)
  const [contact , setContact] = useState(showContact);
  const [trackRandomNumbers, setTrackRandomNumbers] = useState([])
  // console.log("contact" , contact);

  // iretation 3
  const selectRandomNumber = () => {
    const min = 5;
    const max = contactsData.length;
    let randomSelectedNumber;

    do {
      randomSelectedNumber = Math.floor(Math.random() * (max - min)) + min
    } while (trackRandomNumbers.includes(randomSelectedNumber))

    setTrackRandomNumbers(prevTrackRandomNumbers => [...prevTrackRandomNumbers, randomSelectedNumber])
    return randomSelectedNumber
  }

  const choseRandomContact = () => {
      let randomNumber =  selectRandomNumber();
      let randomContact = contactsData[randomNumber];
      setContact(prevContacts => [randomContact, ...prevContacts]);
  }

  // iretation 4
  const sortContactByName = () => {
      const sortedContacts = [...contact].sort((a, b) => {
        if(a.name < b.name){
          return -1;
        } else if (a.name > b.name){
          return 1;
        } else {
          return 0;
        }
      });
      setContact(sortedContacts);
  }

  const sortContactByPopularity = () => {
    const sortPopularity = [...contact].sort((a, b) => a.popularity - b.popularity);
    setContact(sortPopularity.reverse());
  } 

  // iretation 5
  const deleteContact = contactId => {
    const filterOutContact = contact.filter(contact => {
      return contact.id !== contactId;
    });

    setContact(filterOutContact);
  }

  return (
    <div className="App">

      <h1>IronContacts</h1>

      <button onClick={choseRandomContact} >Add Random Contact</button>
      <button onClick={sortContactByName}>Sort By Name</button>
      <button onClick={sortContactByPopularity}>Sort By Popularity</button>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {contact.map((contct) => {
              return (
                <tr key={contct.id}>
                  <td><img className='ImageContact' src={contct.pictureUrl}/></td>
                  <td>{contct.name}</td>
                  <td>{contct.popularity.toFixed(2)}</td>
                  {contct.wonOscar ? <td>🏆</td> : <td> </td>}
                  {contct.wonEmmy ? <td>&#x2B50;</td> : <td> </td>}
                  <td><button onClick={() => deleteContact(contct.id)}>Remove</button></td>
                  {/* {contct.wonOscar && <td>&#127942;</td>}
                  {!contct.wonOscar && <td>	</td>} */}
                  {/* &#127942;=>  🏆 , &#x2B50; => 🌟 */}
                </tr>
              )
          })}
        </tbody>

      </table>
    </div>
  );
}

export default App;
